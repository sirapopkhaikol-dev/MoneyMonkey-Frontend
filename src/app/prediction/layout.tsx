"use client";

import { useAuth } from "@/components/contexts/authContext";
import { useToast } from "@/components/contexts/toastContext";
import PredictionPageSkeleton from "@/components/prediction/authSkeletonPredictionPage";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

// protection dashboard router

export default  function DashboardLayout( {children} : { children: React.ReactNode } ) {
    const { user, isLoading } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    useEffect(() => {

        if (isLoading) return;

        if (!user) {
            showToast({
                type: "error",
                title: `Session Invalid`,
                message: `Please Login and continue`
            })
            router.replace("/");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, user, router]);

    if (isLoading) {
        return <PredictionPageSkeleton />;
    }

    if (!user) {
        return null;
    }

    return children;
}