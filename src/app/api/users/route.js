// app/api/users/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

// GET all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find().select('-password');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST create new user
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const user = await User.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}