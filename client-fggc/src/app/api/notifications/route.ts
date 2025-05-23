import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Notification from '@/models/Notification';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
  return NextResponse.json({ notifications });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { userId, message } = await req.json();
  if (!userId || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const notification = await Notification.create({ user: userId, message });
  return NextResponse.json({ notification });
}
