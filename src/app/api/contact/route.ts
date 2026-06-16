import { NextResponse } from 'next/server';
import { COMPANY_INFO } from '@/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, service } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you can:
    // 1. Send email using nodemailer, SendGrid, Resend, etc.
    // 2. Save to database
    // 3. Send to CRM (HubSpot, Salesforce)
    // 4. Send to Slack/Discord notification
    // 5. Store in Google Sheets

    // Log the submission (for now)
    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      subject,
      message,
      service,
      timestamp: new Date().toISOString(),
    });

    // Example: Send email using Resend (if you have it set up)
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: [COMPANY_INFO.email],
    //   subject: `New Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //     <p><strong>Service:</strong> ${service || 'Not specified'}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // Send acknowledgment email to the user (optional)
    // await resend.emails.send({
    //   from: 'Shalom Team <hello@shalomevents.et>',
    //   to: [email],
    //   subject: 'Thank you for contacting Shalom',
    //   html: `
    //     <h2>Thank you for reaching out, ${name}!</h2>
    //     <p>We've received your message and will get back to you within 24 hours.</p>
    //     <p>If this is urgent, please call us at ${COMPANY_INFO.phone}.</p>
    //     <br />
    //     <p>Best regards,</p>
    //     <p>The Shalom Team</p>
    //   `,
    // });

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}