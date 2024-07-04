import connectMongoDB from "@/app/lib/mongoDBConnection"
import { NextResponse } from "next/server";

export const GET = async() =>{
    try {
        await connectMongoDB();
        return NextResponse.json({"alread":"done"})
    } catch (error) {
        
    }
}