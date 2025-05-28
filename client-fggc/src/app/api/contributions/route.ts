import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Contribution from '@/models/Contribution';
import User from '@/models/User';
import Notification from '@/models/Notification';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { userId, amount } = await req.json();
  const allowedAmounts = [5000, 10000, 20000, 30000];
  if (!userId || !amount || !allowedAmounts.includes(Number(amount))) {
    return NextResponse.json({ error: 'Missing fields or invalid amount' }, { status: 400 });
  }
  // Find eligible recipient (not the contributor, and not suspended)
  const eligibleRecipients = await User.find({ _id: { $ne: userId } });
  if (!eligibleRecipients.length) {
    return NextResponse.json({ error: 'No eligible recipient found' }, { status: 400 });
  }
  const recipient = eligibleRecipients[Math.floor(Math.random() * eligibleRecipients.length)];
  const contribution = await Contribution.create({ user: userId, recipient: recipient._id, amount, status: 'pending' });
  await User.findByIdAndUpdate(userId, { $push: { contributions: contribution._id } });
  await User.findByIdAndUpdate(recipient._id, { $push: { contributions: contribution._id } });
  // Notify recipient
  await Notification.create({ user: recipient._id, message: `You have a new payment to approve from a member for ₣${amount}.`, read: false });
  return NextResponse.json({ message: 'Contribution created', contribution });
}

export async function GET() {
  await connectToDatabase();
  const contributions = await Contribution.find().populate('user', 'name email');
  return NextResponse.json({ contributions });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const { contributionId, action } = await req.json();
  if (!contributionId || !['approve', 'fail'].includes(action)) {
    return NextResponse.json({ error: 'Missing fields or invalid action' }, { status: 400 });
  }
  const contribution = await Contribution.findById(contributionId);
  if (!contribution) {
    return NextResponse.json({ error: 'Contribution not found' }, { status: 404 });
  }
  if (action === 'approve') {
    contribution.status = 'approved';
    contribution.approvedAt = new Date();
    // Set return date to 7 working days from now
    let days = 0;
    let date = new Date();
    while (days < 7) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) days++;
    }
    contribution.returnedAt = date;
    // Set returns (100% return)
    contribution.returns = contribution.amount * 2;
    await contribution.save();
    // Notify contributor
    await Notification.create({ user: contribution.user, message: `Your payment has been approved. You will receive ₣${contribution.returns} on ${date.toLocaleDateString()}.`, read: false });
    return NextResponse.json({ message: 'Payment approved', contribution });
  } else if (action === 'fail') {
    contribution.status = 'failed';
    // Suspend contributor for 48 hours
    const now = new Date();
    contribution.suspendedUntil = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    await contribution.save();
    // Notify contributor
    await Notification.create({ user: contribution.user, message: `Your payment was not approved. Your account is suspended for 48 hours.`, read: false });
    return NextResponse.json({ message: 'Payment failed and user suspended', contribution });
  }
}
