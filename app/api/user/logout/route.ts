import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const response = NextResponse.json({
        success: true,
        message: " user logged out",
    });
    response.cookies.set("token", "");

    return response;
}
