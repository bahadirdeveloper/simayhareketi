import { Request, Response } from "express";
import Stripe from "stripe";

let stripe: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  // @ts-ignore - Stripe API version might be different
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn('STRIPE_SECRET_KEY not provided - Stripe functionality will be disabled');
}

// In-memory cache for rate limiting
const paymentRequestsMap = new Map<string, number[]>();
const subscriptionRequestsMap = new Map<string, number[]>();

export async function handleCreatePaymentIntent(req: Request, res: Response) {
  try {
    if (!stripe) {
      return res.status(503).json({
        success: false,
        message: "Ödeme servisi şu anda kullanılamıyor."
      });
    }

    // Rate limiting: Check IP to prevent abuse
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipString = typeof ip === 'string' ? ip : Array.isArray(ip) ? ip[0] : 'unknown';
    
    // In a production environment, you would use Redis or a similar service for rate limiting
    // For now, we'll use a simple in-memory implementation
    const now = Date.now();
    const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
    const MAX_REQUESTS = 5; // 5 requests per minute
    
    // This should be stored in a persistent store in production
    const ipRequests = paymentRequestsMap.get(ipString) || [];
    const recentRequests = ipRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Çok fazla ödeme isteği gönderildi. Lütfen daha sonra tekrar deneyin."
      });
    }
    
    // Update request tracking
    recentRequests.push(now);
    paymentRequestsMap.set(ipString, recentRequests);
    
    const { amount, description, isRegistrationFee } = req.body;
    
    if (!amount || (isRegistrationFee ? amount < 1 : amount < 5)) {
      return res.status(400).json({ 
        success: false,
        message: isRegistrationFee ? "Kayıt ücreti en az 1 TL olmalıdır." : "Bağış miktarı en az 5 TL olmalıdır." 
      });
    }
    
    // Stripe amount should be in the smallest currency unit (kuruş)
    const paymentIntent = await stripe!.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "try", // Turkish Lira
      description: description || (isRegistrationFee ? "Cumhuriyet Güncellenme Platformu Kayıt Ücreti" : "Cumhuriyet Güncellenme Platformu Bağışı"),
      metadata: {
        integration_check: 'accept_a_payment',
        payment_type: isRegistrationFee ? 'registration_fee' : 'donation',
        ip: ipString.substr(0, 15) // Store partial IP for fraud detection
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
    if (!stripe) {
      return res.status(503).json({
        success: false,
        message: "Abonelik servisi şu anda kullanılamıyor."
      });
    }

    // Rate limiting: Check IP to prevent abuse
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipString = typeof ip === 'string' ? ip : Array.isArray(ip) ? ip[0] : 'unknown';
    
    // In a production environment, you would use Redis or a similar service for rate limiting
    // For now, we'll use a simple in-memory implementation
    const now = Date.now();
    const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
    const MAX_REQUESTS = 3; // 3 requests per minute for subscriptions (more restrictive)
    
    // This should be stored in a persistent store in production
    const ipRequests = subscriptionRequestsMap.get(ipString) || [];
    const recentRequests = ipRequests.filter((time: number) => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Çok fazla abonelik isteği gönderildi. Lütfen daha sonra tekrar deneyin."
      });
    }
    
    // Update request tracking
    recentRequests.push(now);
    subscriptionRequestsMap.set(ipString, recentRequests);
    
    const { email, name, priceId } = req.body;
    
    if (!email || !priceId) {
      return res.status(400).json({ 
        success: false,
        message: "E-posta ve abonelik türü zorunludur." 
      });
    }
    
    // Create a new customer
    const customer = await stripe!.customers.create({
      email,
      name,
      metadata: {
        source: "Cumhuriyet Güncellenme Platformu",
        ip: ipString.substr(0, 15) // Store partial IP for fraud detection
      }
    });
    
    // Create the subscription
    const subscription = await stripe!.subscriptions.create({
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
  if (!stripe) {
    return res.status(503).send('Stripe service unavailable');
  }

  let event: Stripe.Event;

  try {
    // Verify the event came from Stripe
    const signature = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      return res.status(400).send('Webhook secret is not configured');
    }
    
    event = stripe!.webhooks.constructEvent(
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

// Price cache to reduce Stripe API calls
let cachedPrices: any = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getPaymentPrices(req: Request, res: Response) {
  try {
    if (!stripe) {
      return res.status(503).json({
        success: false,
        message: "Ücret servisi şu anda kullanılamıyor."
      });
    }

    const now = Date.now();
    
    // Use cached prices if available and not expired
    if (cachedPrices && (now - lastCacheTime < CACHE_DURATION)) {
      return res.json({ success: true, prices: cachedPrices, cached: true });
    }
    
    const prices = await stripe!.prices.list({
      active: true,
      limit: 10,
      expand: ['data.product']
    });
    
    // Update cache
    cachedPrices = prices.data;
    lastCacheTime = now;
    
    res.json({ success: true, prices: prices.data, cached: false });
  } catch (error: any) {
    console.error("Error fetching Stripe prices:", error);
    res.status(500).json({ 
      success: false,
      message: `Ücret bilgileri alınırken bir hata oluştu: ${error.message}` 
    });
  }
}