"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserContextType {
    isAuthenticated: boolean;
    user: string;
    logout: () => Promise<void>;
}

const initialUser = {
    isAuthenticated: false,
    user: "",
    logout: async () => {},
};

const UserContext = createContext<UserContextType>(initialUser);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/user/me");
            const data = await res.json();

            if (!res.ok) {
                return;
            }
            setIsAuthenticated(true);
            setUser(data.user.email);
        };

        fetchUser();
    }, []);

    const logout = async () => {
        const res = await fetch("/api/user/logout", { method: "POST" });
        const data = await res.json();

        if (!res.ok) {
            toast.error("Cannot logout");
            return;
        }
        setIsAuthenticated(false);
        setUser("");

        toast.success("User logged out");
        router.push("/signin");
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("User Provider was used outside of its context");
    }
    return context;
}
