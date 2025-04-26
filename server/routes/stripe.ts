import { Request, Response } from "express";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

// @ts-ignore - Stripe API version might be different
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handleCreatePaymentIntent(req: Request, res: Response) {
  try {
    const { amount, description } = req.body;
    
    if (!amount || amount < 5) {
      return res.status(400).json({ 
        success: false,
        message: "Bağış miktarı en az 5 TL olmalıdır." 
      });
    }
    
    // Stripe amount should be in the smallest currency unit (kuruş)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "try", // Turkish Lira
      description: description || "Cumhuriyet Güncellenme Platformu Bağışı",
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    res.json({ 
      success: true,
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error: any) {
    console.error("Stripe payment intent error:", error);
    res.status(500).json({ 
      success: false,
      message: `Ödeme işlemi başlatılırken bir hata oluştu: ${error.message}` 
    });
  }
}

export async function handleCreateSubscription(req: Request, res: Response) {
  try {
    const { email, name, priceId } = req.body;
    
    if (!email || !priceId) {
      return res.status(400).json({ 
        success: false,
        message: "E-posta ve abonelik türü zorunludur." 
      });
    }
    
    // Create a new customer
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        source: "Cumhuriyet Güncellenme Platformu"
      }
    });
    
    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    
    // @ts-ignore - Stripe types are not perfectly accurate for expanded fields
    const clientSecret = subscription.latest_invoice?.payment_intent?.client_secret;
    
    res.json({ 
      success: true,
      subscriptionId: subscription.id,
      clientSecret,
      customerId: customer.id
    });
  } catch (error: any) {
    console.error("Stripe subscription error:", error);
    res.status(500).json({ 
      success: false,
      message: `Abonelik oluşturulurken bir hata oluştu: ${error.message}` 
    });
  }
}

export async function handleWebhook(req: Request, res: Response) {
  let event: Stripe.Event;

  try {
    // Verify the event came from Stripe
    const signature = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      return res.status(400).send('Webhook secret is not configured');
    }
    
    event = stripe.webhooks.constructEvent(
      req.body, 
      signature, 
      webhookSecret
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent was successful: ${paymentIntent.id}`);
      // TODO: Update payment status in database
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment failed: ${failedPayment.id}, ${failedPayment.last_payment_error?.message}`);
      // TODO: Update payment status in database
      break;
    case 'subscription_schedule.created':
    case 'subscription_schedule.updated':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`Subscription status: ${subscription.status}`);
      // TODO: Update subscription status in database
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
}

export async function getPaymentPrices(req: Request, res: Response) {
  try {
    const prices = await stripe.prices.list({
      active: true,
      limit: 10,
      expand: ['data.product']
    });
    
    res.json({ success: true, prices: prices.data });
  } catch (error: any) {
    console.error("Error fetching Stripe prices:", error);
    res.status(500).json({ 
      success: false,
      message: `Ücret bilgileri alınırken bir hata oluştu: ${error.message}` 
    });
  }
}