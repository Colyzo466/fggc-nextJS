import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import fetch from 'node-fetch';

// Get all users (admin only)
export async function GET() {
  await connectToDatabase();
  const users = await User.find({}, '-password').lean();
  return NextResponse.json({ users });
}

// Update user (admin only)
export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const { id, ...update } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  const user = await User.findByIdAndUpdate(id, update, { new: true, select: '-password' });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Send admin action email if admin status changed
  if (typeof update.isAdmin !== 'undefined') {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: user.email,
          subject: 'Account Role Updated',
          text: `Hello ${user.name},\n\nYour admin status has been updated to: ${update.isAdmin ? 'Admin' : 'User'}.`,
          html: `<p>Hello <b>${user.name}</b>,</p><p>Your admin status has been updated to: <b>${update.isAdmin ? 'Admin' : 'User'}</b>.</p>`
        })
      });
    } catch {
      // Optionally log error
    }
  }

  return NextResponse.json({ user });
}

// Delete user (admin only)
export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  const user = await User.findById(id);
  await User.findByIdAndDelete(id);
  if (user) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: user.email,
          subject: 'Account Deleted',
          text: `Hello ${user.name},\n\nYour account has been deleted by the admin. If you have questions, contact support.`,
          html: `<p>Hello <b>${user.name}</b>,</p><p>Your account has been deleted by the admin. If you have questions, contact support.</p>`
        })
      });
    } catch {
      // Optionally log error
    }
  }
  return NextResponse.json({ message: 'User deleted' });
}
