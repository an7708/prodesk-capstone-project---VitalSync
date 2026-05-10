    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const logger = require('../utils/logger');
    
    // POST /api/payments/create-checkout-session
    const createCheckoutSession = async (req, res) => {
    try {
        const { plan } = req.body;
        const plans = {
        pro_monthly: {
            name: 'VitalSync Pro — Monthly',
            description: 'Unlimited appointment bookings, priority doctor access, prescription history export',
            amount: 999,   // Amount in the smallest currency unit — 999 paise = ₹9.99 or 999 cents = $9.99
            currency: 'usd',
        },
        pro_yearly: {
            name: 'VitalSync Pro — Yearly',
            description: 'Everything in monthly, plus full medical history export and family accounts',
            amount: 7999,
            currency: 'usd',
        },
        };

        const selectedPlan = plans[plan] || plans.pro_monthly;

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
            price_data: {
                currency: selectedPlan.currency,
                product_data: {
                name: selectedPlan.name,
                description: selectedPlan.description,
                },
                unit_amount: selectedPlan.amount,
            },
            quantity: 1,
            },
        ],
        // These are the pages Stripe redirects to after payment
        success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
        // Pass the user's email so Stripe pre-fills the checkout form
        customer_email: req.user.email,
        metadata: {
            userId: req.user.id,
            plan: plan || 'pro_monthly',
        },
        });

        res.status(200).json({
        success: true,
        sessionId: session.id,
        url: session.url,
        });
    // } catch (error) {
    //     console.error('Stripe error:', error);
    //     res.status(500).json({ success: false, message: error.message });
    // }
    } catch (error) {
    logger.error('Stripe error', { message: error.message });
    res.status(500).json({ success: false, message: error.message });
}
    };

    // GET /api/payments/verify/:sessionId
    // Called from the success page to confirm payment went through
    const verifyPayment = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

        if (session.payment_status === 'paid') {
        res.status(200).json({
            success: true,
            paid: true,
            customerEmail: session.customer_email,
            amount: session.amount_total,
            plan: session.metadata.plan,
        });
        } else {
        res.status(200).json({ success: true, paid: false });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    };

    module.exports = { createCheckoutSession, verifyPayment };