import { generateToken } from "@/app/lib/auth";
import { User } from "@/app/models/user";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    revalidatePath("/", "page");

    const user = await User.findOne({ email, password });
    if (!user) {
        return NextResponse.json(
            { success: false, message: "Invalid credentials" },
            { status: 401 }
        ); 
    }

    const token = await generateToken(user._id);
    const response = NextResponse.json(
        { success: true, message: "User logged in" },
        { status: 200 }
    );

    response.cookies.set("token", token);

    return response;
}
