import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: { json: () => PromiseLike<{ name: any; username: any; email: any; password: any; }> | { name: any; username: any; email: any; password: any; }; }) {
  try {
    const { name, username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({ name, username, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
