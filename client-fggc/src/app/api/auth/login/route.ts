import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // For demo: return user info. In production, use JWT/cookies.
  return NextResponse.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
}
