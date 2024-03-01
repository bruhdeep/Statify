import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const {name, email} = await request.json();
    await connect();
    await User.create({name, email});
    return NextResponse.json({message: "user is registered"}, {status: 201});
}