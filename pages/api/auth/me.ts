import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;

  const token = bearerToken.split(" ")[1];
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    res.status(401).json({ message: "Not Authorised", success: false });
  }
  const { email } = jwt.decode(token) as { email: string };
  if (!email) {
    res.status(401).json({ message: "Not Authorised", success: false });
  }
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  return res.status(200).json({ user });
}
