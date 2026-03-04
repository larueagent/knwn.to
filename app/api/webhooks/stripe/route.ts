import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function tagBuyerInKit(email: string) {
  const KIT_API_KEY = process.env.KIT_API_KEY;
  const KIT_TAG_ID = process.env.KIT_BOOK_BUYER_TAG_ID;

  if (!KIT_API_KEY || !KIT_TAG_ID) {
    console.error("Kit env vars missing: KIT_API_KEY or KIT_BOOK_BUYER_TAG_ID");
    return;
  }

  const res = await fetch(
    `https://api.kit.com/v4/tags/${KIT_TAG_ID}/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": KIT_API_KEY,
      },
      body: JSON.stringify({ email_address: email }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("Kit tag error:", res.status, body);
  } else {
    console.log("Kit: tagged buyer", email, "with tag", KIT_TAG_ID);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (email) {
      await tagBuyerInKit(email);
    } else {
      console.warn("checkout.session.completed: no email found on session", session.id);
    }
  }

  return NextResponse.json({ received: true });
}
