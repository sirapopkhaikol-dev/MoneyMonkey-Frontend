"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

import {
    Toast,
    ToastData,
    ToastType,
} from "@/components/ui/toast";

type ShowToastOptions = {
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
};

type ToastContextType = {
    showToast: (
        options: ShowToastOptions
    ) => void;

    removeToast: (
        id: string
    ) => void;

    clearToasts: () => void;
};

const ToastContext =
    createContext<ToastContextType | null>(
        null
    );

export function ToastProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toasts, setToasts] =
        useState<ToastData[]>([]);

    const removeToast = useCallback(
        (id: string) => {
            setToasts((prev) =>
                prev.filter(
                    (toast) =>
                        toast.id !== id
                )
            );
        },
        []
    );

    const showToast = useCallback(
        ({
            type,
            title,
            message,
            duration = 5000,
        }: ShowToastOptions) => {
            const id = crypto.randomUUID();

            const newToast: ToastData = {
                id,
                type,
                title,
                message,
                duration,
            };

            setToasts((prev) => [
                ...prev,
                newToast,
            ]);
        },
        []
    );

    const clearToasts = useCallback(() => {
        setToasts([]);
    }, []);

    const value = useMemo(
        () => ({
            showToast,
            removeToast,
            clearToasts,
        }),
        [
            showToast,
            removeToast,
            clearToasts,
        ]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}

            {/* Toast container */}

            <div
                className="
                    pointer-events-none
                    fixed
                    inset-x-4
                    top-20
                    z-100
                    flex
                    flex-col
                    items-end
                    gap-3
                    sm:left-auto
                    sm:right-6
                    sm:w-full
                    sm:max-w-sm
                "
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="
                            pointer-events-auto
                            w-full
                        "
                    >
                        <Toast
                            toast={toast}
                            onClose={
                                removeToast
                            }
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context =
        useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used inside ToastProvider"
        );
    }

    return context;
}

