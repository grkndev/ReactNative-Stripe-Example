import { stripe } from "@/utils/stripe-server"

export async function POST(req: Request) {
    console.log("POST received")
    const { amount } = await req.json();
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2025-02-24.acacia' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount ? Math.floor(amount * 100) : 1000,
        currency: 'usd',
        customer: customer.id,
        automatic_payment_methods: {
            enabled: false,
        },

        payment_method_types: ["card"]
        
    });
    // console.log({
    //     paymentIntent: paymentIntent.client_secret,
    //     ephemeralKey: ephemeralKey.secret,
    //     customer: customer.id,
    //     publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
    // })
    return Response.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
    })
}