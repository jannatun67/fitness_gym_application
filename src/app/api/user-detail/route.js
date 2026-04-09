import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    console.log('User Detail API called');

    return NextResponse.json({
      success: true,
      data: {
        id: 1,
        email: 'user@example.com',
        first_name: 'Test',
        last_name: 'User',
      },
    });
  } catch (error) {
    console.error('User Detail error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get user details' },
      { status: 500 }
    );
  }
}