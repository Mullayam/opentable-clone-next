import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

export default async function name(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email  is invalid",
      },
      {
        valid: validator.isLength(password),
        errorMessage: "Password is not valid",
      },
    ];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }

      if (errors.length) {
        return res.status(200).json({ message: errors[0], success: false });
      }
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "No User Assocaited with this email",
        success: false,
      });
    }
    const CheckUserPassword = await bcrypt.compare(password, user.password);
    if (!CheckUserPassword) {
      return res.status(401).json({
        message: "Not Authorised",
        success: false,
      });
    }
    let alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    const AuthToken = await new jose.SignJWT({
      email: user.email,
      id: user.id,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("1d")
      .sign(secret);
    setCookie("jwt", AuthToken, { req, res, maxAge: 60 * 60 * 24 });
  
    res.status(200).json({
      message: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        city: user.city,
        phone: user.phone,
        email: user.email,
      },
      success: true,
    });
  } else {
    res.status(404).json({ message: "Not Authorised", success: false });
  }
}
