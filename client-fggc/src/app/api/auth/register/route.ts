import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      // User already exists, return a flag for the frontend to show login button
      return NextResponse.json({ 
        error: 'User already exists', 
        showLogin: true, 
        message: 'User already exists. Please login.'
      }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    // Send welcome email
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: 'Welcome to GGPC',
          text: `Hello ${name},\n\nWelcome to Golden Growth Peer Connection! Your registration was successful.`,
          html: `<p>Hello <b>${name}</b>,</p><p>Welcome to <b>Golden Growth Peer Connection</b>! Your registration was successful.</p>`
        })
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error('Email API error:', errText);
      }
    } catch (emailErr) {
      console.error('Email sending error:', emailErr);
    }

    return NextResponse.json({ success: true, message: 'User registered successfully', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ success: false, error: 'Failed to register user', details: err instanceof Error ? err.message : err }, { status: 500 });
  }
}
