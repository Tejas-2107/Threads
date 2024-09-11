import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(reqeust: NextRequest) {
  const id = reqeust.nextUrl.searchParams.get("id");
  try {
    const user = await User.findById(id, '-password'); 
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(reqeust:NextRequest){
  
}
