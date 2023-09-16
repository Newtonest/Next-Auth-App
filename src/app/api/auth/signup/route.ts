import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(request: Request) {
  
  try {
    await connectDB();
    const { fullname, email, password } = await request.json();
    console.log(password);

    if (password < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );

    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      fullname: savedUser.fullname
    },{ status: 201 });
  } catch (error) {
    console.log('el error esta en el register.ts');
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}