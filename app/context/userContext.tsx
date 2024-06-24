"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: string;
    logout: () => Promise<void>;
    setUserData: (authenticated: boolean, email: string) => void;
}

const initialUser = {
    isAuthenticated: false,
    isLoading: true,
    user: "",
    logout: async () => {},
    setUserData: () => {},
};

const UserContext = createContext<UserContextType>(initialUser);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(true);

    const router = useRouter();

    function setUserData(authenticated: boolean, email: string) {
        setIsAuthenticated(authenticated);
        setUser(email);
    }

    useEffect(() => {
        const fetchUser = async () => {
            setIsloading(true);
            const res = await fetch("/api/user/me");
            const data = await res.json();

            if (!res.ok) {
                setIsloading(false);
                return;
            }
            setIsloading(false);
            setUserData(true, data.user.email);
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
    };

    return (
        <UserContext.Provider
            value={{ user, isAuthenticated, logout, setUserData, isLoading }}
        >
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
