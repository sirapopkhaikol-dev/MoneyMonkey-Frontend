import { client_State, server_State } from "@/types/history";
import { format } from "date-fns";
import Link from "next/link";


// ======================================================
// Result History
// ======================================================

type ResultHistoryProps = {
    serverState: server_State;
    clientState: client_State;
};

export default function ResultHistory({
    serverState,
    // clientState,
}: ResultHistoryProps) {
    if (serverState.reqHistory.length <= 0) {
        return null;
    }

    return (
        <>
            {/* ========================================== */}
            {/* Desktop */}
            {/* ========================================== */}

            <div
                className="
                    hidden
                    overflow-hidden
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    shadow-sm
                    md:block
                "
            >
                {/* Header */}

                <div
                    className="
                        grid
                        grid-cols-[1.5fr_1fr_1fr_80px]
                        gap-4
                        border-b
                        border-black/10
                        bg-black/2
                        px-6
                        py-4
                    "
                >
                    <p
                        className="
                            text-caption
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-black/40
                        "
                    >
                        Date
                    </p>

                    <p
                        className="
                            text-caption
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-black/40
                        "
                    >
                        Amount
                    </p>

                    <p
                        className="
                            text-caption
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-black/40
                        "
                    >
                        Forecast
                    </p>

                    <span />
                </div>

                {/* Rows */}

                {serverState.reqHistory.map((item) => (
                    <Link
                        title="Details"
                        href={`/dashboard/history/${item.id}`}
                        key={item.id}
                        className="
                            hover:cursor-pointer
                            group
                            grid
                            min-w-0
                            grid-cols-[1.5fr_1fr_1fr_80px]
                            gap-4
                            border-b
                            border-black/10
                            px-6
                            py-5
                            transition
                            last:border-b-0
                            hover:bg-brand-50
                        "
                    >
                        <div className="min-w-0">
                            <p
                                className="
                                    truncate
                                    text-body-sm
                                    font-medium
                                "
                            >
                                {format(
                                    item.created_at,
                                    "MMM d, yyyy"
                                )}
                            </p>

                            <p
                                className="
                                    mt-1
                                    truncate
                                    text-caption
                                    text-black/40
                                "
                            >
                                {format(
                                    item.created_at,
                                    "h:mm a"
                                )}
                            </p>
                        </div>

                        <p
                            className="
                                min-w-0
                                truncate
                                self-center
                                text-body-sm
                                font-semibold
                                flex
                                gap-0.5
                            "
                        >
                            <span className="font-medium">฿</span>
                            {Number(
                                item.initial_amount
                            ).toLocaleString()}
                        </p>

                        <p
                            className="
                                self-center
                                text-body-sm
                                text-black/60
                            "
                        >
                            {item.n_years}{" "}
                            {item.n_years === 1
                                ? "year"
                                : "years"}
                        </p>

                        <span
                            className="
                                self-center
                                justify-self-end
                                text-body-sm
                                font-semibold
                                text-black/40
                                transition
                                group-hover:translate-x-1
                                group-hover:text-brand-700
                            "
                        >
                            →
                        </span>
                    </Link>
                ))}
            </div>

            {/* ========================================== */}
            {/* Mobile */}
            {/* ========================================== */}

            <div className="space-y-3 md:hidden">
                {serverState.reqHistory.map((item) => (
                    <Link
                        href={`/dashboard/history/${item.id}`}
                        key={item.id}
                        className="
                            group
                            block
                            rounded-xl
                            border
                            border-black/10
                            bg-white
                            p-5
                            shadow-sm
                            transition
                            hover:border-brand-300
                            hover:bg-brand-50
                        "
                    >
                        <div className="flex min-w-0 items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p
                                    className="
                                        truncate
                                        text-body-sm
                                        font-medium
                                    "
                                >
                                    {format(
                                        item.created_at,
                                        "MMM d, yyyy"
                                    )}
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-caption
                                        text-black/40
                                    "
                                >
                                    {format(
                                        item.created_at,
                                        "h:mm a"
                                    )}
                                </p>
                            </div>

                            <span
                                className="
                                    shrink-0
                                    text-body
                                    font-semibold
                                    text-black/30
                                    transition
                                    group-hover:translate-x-1
                                    group-hover:text-brand-700
                                "
                            >
                                →
                            </span>
                        </div>

                        <div
                            className="
                                mt-5
                                grid
                                grid-cols-2
                                gap-4
                                border-t
                                border-black/10
                                pt-4
                            "
                        >
                            <div className="min-w-0">
                                <p
                                    className="
                                        text-caption
                                        uppercase
                                        tracking-[0.12em]
                                        text-black/40
                                    "
                                >
                                    Amount
                                </p>

                                <p
                                    className="
                                        mt-1
                                        truncate
                                        text-body
                                        font-semibold
                                    "
                                >
                                    <span className="font-medium">฿</span>
                                    {Number(
                                        item.initial_amount
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p
                                    className="
                                        text-caption
                                        uppercase
                                        tracking-[0.12em]
                                        text-black/40
                                    "
                                >
                                    Forecast
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-body
                                        font-semibold
                                    "
                                >
                                    {item.n_years}{" "}
                                    {item.n_years === 1
                                        ? "year"
                                        : "years"}
                                </p>
                            </div>
                        </div>

                        <div
                            className="
                                mt-5
                                text-body-sm
                                font-medium
                                text-brand-700
                            "
                        >
                            View prediction →
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}