import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const fetchToken = (): string => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token) {
      throw new Error("JWT token not found in cookies.");
    }
    const decodedToken: any = jwt.verify(token.value, process.env.JWT_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    return "";
  }
};
