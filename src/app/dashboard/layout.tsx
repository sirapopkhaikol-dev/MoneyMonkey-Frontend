"use client";

import { useAuth } from "@/components/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

// protection dashboard router

export default  function DashboardLayout( {children} : { children: React.ReactNode } ) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {

        if (isLoading) return;

        if (!user) {
            router.replace("/");
        }

    }, [isLoading, user, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return children;
}