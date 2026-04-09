import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log('Login API called with:', data);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token: 'mock-token-' + Date.now(),
      data: {
        user: {
          id: 1,
          email: data.email,
          first_name: 'Test',
          last_name: 'User',
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}