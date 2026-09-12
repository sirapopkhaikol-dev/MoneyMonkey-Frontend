"use client";

import { useEffect } from "react";

export type ToastType =
    | "success"
    | "error"
    | "warning"
    | "info";

export type ToastData = {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
};

type ToastProps = {
    toast: ToastData;
    onClose: (id: string) => void;
};

const toastStyles: Record<
    ToastType,
    {
        icon: string;
        iconClass: string;
        borderClass: string;
    }
> = {
    success: {
        icon: "✓",
        iconClass: "text-success",
        borderClass: "border-success/30",
    },
    error: {
        icon: "!",
        iconClass: "text-error",
        borderClass: "border-error/30",
    },
    warning: {
        icon: "!",
        iconClass: "text-warning",
        borderClass: "border-warning/30",
    },
    info: {
        icon: "i",
        iconClass: "text-info",
        borderClass: "border-info/30",
    },
};

export function Toast({
    toast,
    onClose,
}: ToastProps) {
    const {
        id,
        type,
        title,
        message,
        duration = 5000,
    } = toast;

    const style = toastStyles[type];

    useEffect(() => {
        if (duration <= 0) return;

        const timer = window.setTimeout(() => {
            onClose(id);
        }, duration);

        return () => {
            window.clearTimeout(timer);
        };
    }, [duration, id, onClose]);

    return (
        <div
            role={
                type === "error"
                    ? "alert"
                    : "status"
            }
            aria-live={
                type === "error"
                    ? "assertive"
                    : "polite"
            }
            className={`
                w-full
                max-w-sm
                overflow-hidden
                rounded-xl
                border
                bg-white
                shadow-lg
                ${style.borderClass}
            `}
        >
            <div className="flex items-start gap-3 p-4">

                {/* Icon */}

                <div
                    className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-black/5
                        text-sm
                        font-bold
                        ${style.iconClass}
                    `}
                    aria-hidden="true"
                >
                    {style.icon}
                </div>

                {/* Content */}

                <div className="min-w-0 flex-1">

                    <p className="text-body-sm font-semibold text-black">
                        {title}
                    </p>

                    {message && (
                        <p className="mt-1 text-body-sm leading-5 text-black/55 wrap-break-word">
                            {message}
                        </p>
                    )}

                </div>

                {/* Close */}

                <button
                    type="button"
                    onClick={() => onClose(id)}
                    aria-label="Close notification"
                    className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        text-black/35
                        transition
                        hover:bg-black/5
                        hover:text-black
                    "
                >
                    <span
                        aria-hidden="true"
                        className="text-lg leading-none"
                    >
                        ×
                    </span>
                </button>

            </div>
        </div>
    );
}