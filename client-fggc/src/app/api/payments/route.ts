import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Contribution from '@/models/Contribution';
import fetch from 'node-fetch';

// Simulate payment gateway integration (e.g., Paystack, Stripe)
export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { userId, amount, paymentRef } = await req.json();
  if (!userId || !amount || !paymentRef) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  // Here you would verify paymentRef with the real payment gateway API
  // For demo, assume payment is successful
  const contribution = await Contribution.create({ user: userId, amount, status: 'completed' });

  // Send payment confirmation email
  try {
    // Fetch user email (you may want to populate user in Contribution model for real use)
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/users`);
    const usersData = await userRes.json();
    const user = usersData.users.find((u: { _id: string }) => u._id === userId);
    if (user) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: user.email,
          subject: 'Payment Received',
          text: `Hello ${user.name},\n\nYour payment of ₦${amount} was received successfully.`,
          html: `<p>Hello <b>${user.name}</b>,</p><p>Your payment of <b>₦${amount}</b> was received successfully.</p>`
        })
      });
    }
  } catch {
    // Optionally log error
  }

  // Send email to admin when a new contribution is made
  try {
    // Find all admins
    const usersRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/users`);
    const usersData = await usersRes.json();
    const admins = usersData.users.filter((u: { isAdmin: boolean }) => u.isAdmin);
    for (const admin of admins) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: admin.email,
          subject: 'New Contribution Made',
          text: `A new contribution of ₦${amount} was made by user ID: ${userId}.`,
          html: `<p>A new contribution of <b>₦${amount}</b> was made by user ID: <b>${userId}</b>.</p>`
        })
      });
    }
  } catch {
    // Optionally log error
  }

  return NextResponse.json({ message: 'Payment successful', contribution });
}
