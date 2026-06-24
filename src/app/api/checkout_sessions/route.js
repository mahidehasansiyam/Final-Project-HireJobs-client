import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { PLANE_PRICE_ID, stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/session';



export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const user = await getUserSession();

    // Get the plan ID from the form data
    const formData = await request.formData();
    const planId = formData.get('plan_id');
    const priceId = PLANE_PRICE_ID[planId];

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      // Set customer email
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {planId},
      success_url: `${origin}/planes/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
