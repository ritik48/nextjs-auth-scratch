"use client";

import { useUser } from "./context/userContext";
import { verifyToken } from "./lib/auth";
import { redirect } from "next/navigation";

export default function Home() {
    const { user, isLoading, isAuthenticated } = useUser();

    if (isLoading) return null;

    if (!isLoading && !isAuthenticated) {
        return redirect("/signin?error=You are not logged in");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-3xl font-bold">
                    Hi,
                    <span className="bg-orange-800 px-3 py-1 rounded-md text-orange-100">
                        {user}
                    </span>
                </h1>
            </div>
        </main>
    );
}
