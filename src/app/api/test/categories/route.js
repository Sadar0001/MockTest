// app/api/tests/categories/route.js
import dbConnect from '../../../../lib/dbConnect';
import Test from '../../../../models/Test';

export async function GET() {
  try {
    await dbConnect();
    
    const categories = await Test.aggregate([
      { 
        $match: { 
          isActive: true 
        } 
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    return Response.json(categories);
  } catch  {
    return Response.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}