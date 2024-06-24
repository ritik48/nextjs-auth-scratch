import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { cookies } from "next/headers";
import { connectDb } from "./db";

async function generateToken(id: string) {
    const token = await jwt.sign({ userId: id }, "secret");

    return token;
}

async function verifyToken() {
    await connectDb();

    const cookie = cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
        return { success: false, message: "Not authenticated" };
    }

    let decoded_token;
    try {
        decoded_token = (await jwt.verify(token, "secret")) as {
            userId: string;
        } & JwtPayload;
    } catch (error) {
        return { success: false, message: "Token verification failed" };
    }

    const user = await User.findById(decoded_token.userId);
    if (!user) {
        return { success: false, message: "Invalid credential" };
    }

    return { success: true, user };
}

export { generateToken, verifyToken };

// import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(req: NextRequest) {
//     const token = req.cookies.get("token")?.value;

//     if (!token) {
//         return NextResponse.redirect(
//             new URL(`/signin?error=Not Authenticated`, req.url)
//         );
//     }
// }

// export const config = {
//     matcher: "/",
// };
