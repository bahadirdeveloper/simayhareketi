import type { Request, Response } from "express";
import Stripe from "stripe";
import { storage } from "../storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Payment prices for different services
export const getPaymentPrices = async (req: Request, res: Response) => {
  try {
    const prices = {
      basic: { amount: 2900, currency: "try", description: "Temel Üyelik" }, // 29 TL
      premium: { amount: 4900, currency: "try", description: "Premium Üyelik" }, // 49 TL
      enterprise: { amount: 9900, currency: "try", description: "Kurumsal Üyelik" }, // 99 TL
      donation: { amount: 1000, currency: "try", description: "Bağış" }, // 10 TL minimum
    };
    
    res.json({ success: true, data: prices });
  } catch (error: any) {
    console.error("Payment prices error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve payment prices", 
      error: error.message 
    });
  }
};

// Create payment intent for one-time payments
export const handleCreatePaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = "try", description = "Ödeme" } = req.body;
    
    if (!amount || amount < 100) { // Minimum 1 TL
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount should be in kuruş for TRY
      currency: currency.toLowerCase(),
      description,
      metadata: {
        userId: req.user?.id?.toString() || "anonymous",
        timestamp: new Date().toISOString(),
      },
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error: any) {
    console.error("Payment intent creation error:", error);
    res.status(500).json({ 
      error: "Payment intent creation failed", 
      message: error.message 
    });
  }
};

// Create or get subscription for premium features
export const handleCreateSubscription = async (req: Request, res: Response) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    let user = req.user;
    const { planType = "premium" } = req.body;

    // Check if user already has an active subscription
    if (user.stripeSubscriptionId) {
      try {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        
        if (subscription.status === 'active') {
          return res.json({
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
            status: subscription.status
          });
        }
      } catch (error) {
        console.log("Existing subscription not found, creating new one");
      }
    }

    if (!user.email) {
      return res.status(400).json({ error: 'Email address required for subscription' });
    }

    // Create or retrieve Stripe customer
    let customer;
    if (user.stripeCustomerId) {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        name: user.name || user.username,
        metadata: {
          userId: user.id.toString(),
        },
      });
      
      // Update user with Stripe customer ID
      user = await storage.updateUserStripeInfo(user.id, customer.id);
    }

    // Subscription prices based on plan type
    const planPrices = {
      basic: "price_basic", // You need to create these in Stripe Dashboard
      premium: "price_premium",
      enterprise: "price_enterprise"
    };

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: planPrices[planType as keyof typeof planPrices] || planPrices.premium,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Update user with subscription info
    await storage.updateUserStripeInfo(user.id, customer.id, subscription.id);

    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
      status: subscription.status
    });
  } catch (error: any) {
    console.error("Subscription creation error:", error);
    res.status(500).json({ 
      error: "Subscription creation failed", 
      message: error.message 
    });
  }
};

// Webhook handler for Stripe events
export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig as string, 
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        
        // Record successful payment
        if (paymentIntent.metadata?.userId) {
          await storage.createOdeme({
            userId: parseInt(paymentIntent.metadata.userId),
            miktar: paymentIntent.amount,
            para_birimi: paymentIntent.currency.toUpperCase(),
            durum: 'basarili',
            odemeYontemi: 'stripe',
            stripePaymentIntentId: paymentIntent.id,
            aciklama: paymentIntent.description || 'Stripe ödeme'
          });
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        
        // Record failed payment
        if (failedPayment.metadata?.userId) {
          await storage.createOdeme({
            userId: parseInt(failedPayment.metadata.userId),
            miktar: failedPayment.amount,
            para_birimi: failedPayment.currency.toUpperCase(),
            durum: 'basarisiz',
            odemeYontemi: 'stripe',
            stripePaymentIntentId: failedPayment.id,
            aciklama: failedPayment.description || 'Başarısız ödeme'
          });
        }
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Subscription payment succeeded:', invoice.id);
        
        // Update subscription status
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          // Update user subscription status in database
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', deletedSubscription.id);
        // Handle subscription cancellation
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};