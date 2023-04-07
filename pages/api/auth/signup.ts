import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

export default async function name(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, city, phone } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email  is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not  strong",
      },
      {
        valid: validator.isLength(city),
        errorMessage: "City is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone  is invalid",
      },
    ];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }

      if (errors.length) {
        return res.status(200).json({ errorMessage: errors[0] });
      }
    });

    const userWithEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (userWithEmail) {
      return res.status(404).json({ errorMessage: "Email Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        email,
        phone,
        city,
      },
    });
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    let alg = "HS256";
    const AuthToken = await new jose.SignJWT({
      email: user.email,
      id: user.id,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("1d")
      .sign(secret);

    res.status(200).json({ errorMessage: AuthToken });
  } else {
    res.status(200).json({ error: "Get Method is not supported" });
  }
}
