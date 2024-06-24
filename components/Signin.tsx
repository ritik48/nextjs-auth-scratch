"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    async function handleSignup() {
        const res = await fetch("http://localhost:3000/api/user/signin", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            toast.error(data.message);
            return;
        }
        toast.success(data.message);
        router.push("/");
    }

    return (
        <section className="mb-auto h-full flex justify-center mt-44">
            <div className="max-w-5xl gap-5 mx-auto flex flex-col items-center">
                <h1 className="text-3xl font-bold">Log in</h1>
                <div className="flex flex-col gap-2">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-xl px-5 focus:outline focus:border-2 focus:border-gray-400 py-2 rounded-md outline-none border"
                        placeholder="Email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-xl px-5 focus:outline focus:border-2 focus:border-gray-400 py-2 rounded-md outline-none border"
                        placeholder="Password"
                    />
                    <button
                        onClick={handleSignup}
                        className="border bg-gray-800 text-gray-100 px-5 py-2 rounded-md"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </section>
    );
}
