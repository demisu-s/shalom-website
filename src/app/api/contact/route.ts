import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();
    
    // Here you can:
    // 1. Send email using nodemailer
    // 2. Send to a CRM
    // 3. Store in database
    
    console.log('Contact form submission:', { name, email, phone, message });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}