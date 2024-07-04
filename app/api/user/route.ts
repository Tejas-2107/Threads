import connectMongoDB from "@/app/lib/mongoDBConnection"
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import User from "@/app/lib/models/User";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { username, email, password, phone, isAdmin, isActive, address } = await req.json();
    try {
        await connectMongoDB();
        const newData = await User.create({
            username,
            email,
            password,
            phone,
            isAdmin,
            isActive,
            address
        });
        const data = await newData.save();
        return NextResponse.json({ "mess": "data added in DB..", data });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const users = await User.find({}, '_id isAdmin email username date');
        console.log("get is calling")
        console.log(users)
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}