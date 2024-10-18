import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    throw new Error(`error while sign up: ${error.message}`);
  }
}
