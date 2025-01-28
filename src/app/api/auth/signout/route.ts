import { logOut } from '@/utils/firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await logOut();
    return NextResponse.json({ message: 'Sign out successful' }, { status: 200 });
  } catch (error) {
    console.log('Error signing out:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
