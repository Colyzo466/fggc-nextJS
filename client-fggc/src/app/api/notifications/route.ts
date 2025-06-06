import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Notification from '@/models/Notification';
import { z } from 'zod';

const notificationSchema = z.object({
  user: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(['success', 'error', 'info']),
  read: z.boolean().optional(),
});

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
  const { userId, message, type, read } = await req.json();
  const parsed = notificationSchema.safeParse({ user: userId, message, type, read });
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  const notification = await Notification.create({ user: userId, message, type, read });
  return NextResponse.json({ notification });
}
