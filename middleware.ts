import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;
  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({
        error: "UnAuthorised Request",
        statusCode: 401,
      })
    );
  }
  const token: string = bearerToken.split(" ")[1];
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "UnAuthorised Request", statusCode: 401 })
    );
  }
}
export const config = {
  matcher: ["/api/auth/me/"],
};
