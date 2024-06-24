import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/auth";
import { revalidatePath } from "next/cache";

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(
            new URL(`/signin?error=Not Authenticated`, req.url)
        );
    }
}

export const config = {
    matcher: "/",
};
