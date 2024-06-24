import { generateToken } from "@/app/lib/auth";
import { connectDb } from "@/app/lib/db";
import { User } from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDb();
    const { email, password } = await req.json();

    const emailExist = await User.findOne({ email });

    if (emailExist) {
        return NextResponse.json(
            {
                success: false,
                message: "User already exists",
            },
            { status: 401 }
        );
    }

    const user = new User({ email, password });
    await user.save();

    const token = await generateToken(user._id);
    const response = NextResponse.json(
        { success: true, message: "User created" },
        { status: 201 }
    );

    response.cookies.set("token", token);

    return response;
}
