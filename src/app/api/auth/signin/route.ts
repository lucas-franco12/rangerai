
import { signIn } from '@/utils/firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const userCredential = await signIn(email, password);
    return NextResponse.json({ user: userCredential.user }, { status: 200 });
  } catch (error) {
    console.log('Error signing in', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

