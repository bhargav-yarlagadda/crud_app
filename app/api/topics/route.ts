import connectToDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { title, description } = await request.json();
    await connectToDB()
    await Topic.create(
            {
                title,description
            }
    )
    return NextResponse.json({message:"Topic Added to DB"})

}



export async function GET(request: NextRequest) {
    try {
      // Connect to the database
      await connectToDB();
  
      // Fetch topics from the database
      const details = await Topic.find();
  
      // Return successful response
      return NextResponse.json({ success: true, details }, { status: 200 });
    } catch (error) {
      console.error('Database Error:', error);
  
      // Return error response
      return NextResponse.json(
        { success: false, message: 'Failed to fetch topics' },
        { status: 500 }
      );
    }
  }

  


  
export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id')
    await connectToDB()
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({message:"Topic deleted"})
  }

  