import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  let json: Record<string, unknown>;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const { to, subject, text, html } = json as { to?: string; subject?: string; text?: string; html?: string };
  if (!to || !subject || !text) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  // Configure your SMTP transport (use environment variables in production)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  try {
    const info = await transporter.sendMail({ from: process.env.SMTP_FROM, to, subject, text, html });
    console.log('Email sent:', info);
    return NextResponse.json({ message: 'Email sent', info });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
