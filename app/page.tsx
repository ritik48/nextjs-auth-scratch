import { cookies } from "next/headers";
import Image from "next/image";
import { verifyToken } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const userData = await verifyToken();

    if (!userData.success) {
        redirect(`/signin?error=${userData.message}`);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-3xl font-bold">
                    Hi,
                    <span className="bg-orange-800 px-3 py-1 rounded-md text-orange-100">
                        {userData.user.email}
                    </span>
                </h1>
            </div>
        </main>
    );
}
