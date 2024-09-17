import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
connectToDB();

const s3 = new S3Client({
  region: "ap-south-1", // e.g., 'us-west-2'
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const imageBucketName = "podcastr-images";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.formData();
    const username = reqBody.get("username");
    const email = reqBody.get("email");
    const password = reqBody.get("password");
    const bio = reqBody.get("bio") || "";
    const image = reqBody.get("image");
    //check if user already exists
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    const uuid=uuidv4();
    const arrayBuffer = await image.arrayBuffer(); // Converts file to ArrayBuffer
    const buffer = Buffer.from(arrayBuffer);
    const imageUploadParams = {
      Bucket: imageBucketName,
      Key: `${uuid}_${image.name}`,
      ContentType: image?.type,
      Body: buffer,
    };
    await s3.send(new PutObjectCommand(imageUploadParams));

    // Store the URLs in the database (assuming you have a Podcast model)
    const imageUrl = `https://${imageUploadParams.Bucket}.s3.amazonaws.com/${imageUploadParams.Key}`;
    // //hash password
    const salt = await bcryptjs.genSalt(10);
    //@ts-ignore
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      imageUrl,
      bio,
    });

    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
