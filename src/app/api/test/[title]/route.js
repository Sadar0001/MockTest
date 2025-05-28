// src/app/api/test/[title]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import Test from '../../../../../models/Test';

export async function GET(request, { params }) {
  await dbConnect();
  
  try {
    const test = await Test.findOne({ title: params.title })
      .populate('questions')
      .lean();

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json({ test });
  } catch (error) {
    console.error('Error fetching test:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}