import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Question from '../../../models/Question';
import Test from '../../../models/Test';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const testId = searchParams.get('testId');

    const query = testId ? { test: testId } : {};
    const questions = await Question.find(query).populate('test', 'title');

    return NextResponse.json({ success: true, questions });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    const { test, questionText, options, correctAnswer } = data;
    if (!test || !questionText || !options || !correctAnswer) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const question = await Question.create(data);
    await Test.findByIdAndUpdate(
      test,
      { $addToSet: { questions: question._id } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Question added successfully',
      question
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const { _id, ...data } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    const updatedQuestion = await Question.findByIdAndUpdate(_id, data, {
      new: true,
      runValidators: true
    });

    return NextResponse.json({
      success: true,
      message: 'Question updated successfully',
      question: updatedQuestion
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { _id } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    const question = await Question.findById(_id);
    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      );
    }

    await Test.findByIdAndUpdate(question.test, {
      $pull: { questions: _id }
    });

    await Question.findByIdAndDelete(_id);

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
