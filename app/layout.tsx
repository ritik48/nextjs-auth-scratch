import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Auth App",
    description: "Authentication in nextjs from scratch",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <UserProvider>
                    <NavBar />
                    {children}
                    <Toaster />
                </UserProvider>
            </body>
        </html>
    );
}
