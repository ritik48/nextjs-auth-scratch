"use client";

import { useUser } from "@/app/context/userContext";
import { verifyToken } from "@/app/lib/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NavBar() {
    const { isAuthenticated, logout } = useUser();

    async function handleLogout() {
        await logout();
    }

    return (
        <nav className="py-2 border border-x-0 border-b border-t-0">
            <div className="flex items-center justify-between mx-auto max-w-5xl">
                <Link className="text-lg" href={"/"}>
                    Home
                </Link>

                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="text-lg border px-3 py-1 rounded-md border-gray-800"
                    >
                        Log out
                    </button>
                ) : (
                    <div className="flex gap-10 items-center">
                        <Link
                            href={"/signin"}
                            className="text-lg bg-gray-800 text-gray-100 px-3 py-1 rounded-md"
                        >
                            Login
                        </Link>
                        <Link
                            className="text-lg border px-3 py-1 rounded-md border-gray-800"
                            href={"/signup"}
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
