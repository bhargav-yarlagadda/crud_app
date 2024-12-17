import connectToDB from '@/libs/mongodb';
import Topic from '@/models/topic';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;  // Await the params

  if (!id || id === 'undefined') {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const { newTitle, newDescription } = await req.json();

  try {
    // Update the document
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title: newTitle, description: newDescription },
      { new: true } // Returns the updated document
    );

    if (!updatedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTopic);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to update topic' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Extract the ID from params
    const { id } = params;

    // Connect to the database
    await connectToDB();

    // Find the topic by ID
    const topic = await Topic.findOne({ _id: id });

    // Handle case where the topic was not found
    if (!topic) {
      return NextResponse.json(
        { success: false, message: 'Topic not found' },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { success: true, topic },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching topic:', error);

    // Return error response
    return NextResponse.json(
      { success: false, message: 'Failed to fetch topic' },
      { status: 500 }
    );
  }
}
