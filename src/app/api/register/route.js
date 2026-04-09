import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log('Register API called with:', data);

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please verify OTP.',
      data: {
        user: {
          id: 1,
          email: data.email,
        },
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    );
  }
}