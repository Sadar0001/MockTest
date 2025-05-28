// src/app/api/test/route.js
import dbConnect from '../../../lib/dbConnect';
import Test from '../../../models/Test';

export async function GET(request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  
  if (title) {
    const test = await Test.findOne({ title: decodeURIComponent(title) });
    return Response.json({ test });
  }
  
  const tests = await Test.find();
  return Response.json({ tests });
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const test = await Test.findOneAndUpdate(
    { title: data.title },
    data,
    { upsert: true, new: true }
  );
  return Response.json({ message: 'Test saved successfully', test });
}

export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();
  await Test.findByIdAndDelete(id);
  return Response.json({ message: 'Test deleted successfully' });
}