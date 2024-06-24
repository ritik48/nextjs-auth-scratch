import { verifyToken } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, message: "Not logged in" },
            { status: 401 }
        );
    }

    const decoded_token = await verifyToken();

    return NextResponse.json(
        { success: true, user: decoded_token },
        { status: 200 }
    );
}
