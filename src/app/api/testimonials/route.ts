import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Here you can:
    // 1. Save to a database
    // 2. Send email notification
    // 3. Store in a file
    
    console.log('New testimonial:', data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit testimonial' 
    }, { status: 500 });
  }
}