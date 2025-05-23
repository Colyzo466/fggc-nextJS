import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Contribution from '@/models/Contribution';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { userId, amount } = await req.json();
  if (!userId || !amount) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const contribution = await Contribution.create({ user: userId, amount, status: 'pending' });
  await User.findByIdAndUpdate(userId, { $push: { contributions: contribution._id } });
  return NextResponse.json({ message: 'Contribution created', contribution });
}

export async function GET() {
  await connectToDatabase();
  const contributions = await Contribution.find().populate('user', 'name email');
  return NextResponse.json({ contributions });
}
