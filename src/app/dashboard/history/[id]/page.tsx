"use client";

import { useAuth } from "@/components/contexts/authContext";
import { useToast } from "@/components/contexts/toastContext";
import ChartPrediction from "@/components/prediction/chartPrediction";
import { useApi } from "@/hooks/useApi";
import { server_State_2 } from "@/types/history";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ResultHistory() {
    const params = useParams();
    const id = params.id;

    const { isLoading } = useAuth();
    const { get } = useApi();
    const { showToast } = useToast();

    const [clientState, setClientState] = useState({
        resultHistoryLoading: true,
        isError: false,
    });

    const [serverState, setServerState] = useState<server_State_2>({
            predictions: {
                created_at: "",
                initial_amount: 0,
                n_years: 0,
                prediction_id: 0,
                results: [],
            },
            rowCount: 0,
    });

    const requestId = useRef(0);

    // --------------------------------------------------
    // Fetch prediction history
    // --------------------------------------------------

    useEffect(() => {
        if (isLoading) return;

        const controller = new AbortController();

        requestId.current += 1;

        const currentRequestId =
            requestId.current;

        const fetchResultHistory = async () => {
            try {
                setClientState((prev) => ({
                    ...prev,
                    isError: false,
                    resultHistoryLoading: true,
                }));

                const res = await get(
                    `/api/predictions/find/resultHistory/${id}`,
                    controller.signal
                );

                if (!res) {
                    return;
                }

                // Only the latest request can update data
                if (
                    currentRequestId !==
                    requestId.current
                ) {
                    return;
                }

                const predictions =
                    res.data.predictions;

                const rowCount =
                    res.data.rowCount;

                setServerState({
                    predictions,
                    rowCount,
                });
            } catch (error) {
                showToast({
                    type: "error",
                    title: "History retrieve fail",
                    message: `${error}`
                })
                // Ignore old requests
                if (
                    currentRequestId !==
                    requestId.current
                ) {
                    return;
                }

                // Ignore aborted requests
                if (controller.signal.aborted) {
                    return;
                }

                setClientState((prev) => ({
                    ...prev,
                    isError: true,
                }));

                showToast({
                    type: "error",
                    title: `History Id ${id} retrieve fail`,
                    message: `${error}`
                })

            } finally {
                // Only latest request can stop loading
                if (
                    currentRequestId !==
                    requestId.current
                ) {
                    return;
                }

                setClientState((prev) => ({
                    ...prev,
                    resultHistoryLoading: false,
                }));
            }
        };

        fetchResultHistory();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, id]);

    // --------------------------------------------------
    // Loading
    // --------------------------------------------------

    if (clientState.resultHistoryLoading || isLoading) {
        return (
            <main className="min-h-screen bg-white text-black">
                <HistoryDetailSkeleton />
            </main>
        );
    }

    // --------------------------------------------------
    // Error
    // --------------------------------------------------

    if (clientState.isError) {
        return (
            <main className="min-h-screen bg-white text-black">
                <HistoryDetailError />
            </main>
        );
    }

    // --------------------------------------------------
    // Empty
    // --------------------------------------------------

    if (serverState.predictions.results.length <= 0) {
        return (
            <main className="min-h-screen bg-white text-black">
                <HistoryDetailEmpty />
            </main>
        );
    }

    // --------------------------------------------------
    // Data
    // --------------------------------------------------

    const prediction = serverState.predictions;

    const results = prediction.results;

    // const firstPrediction = results[0];

    const lastPrediction = results[results.length - 1];

    const startAmount = prediction.initial_amount;

    const finalAmount = lastPrediction.amount;

    const totalChange = ((finalAmount - startAmount) / startAmount) * 100;

    const isValueDown = totalChange < 0;

    return (
        <main className="min-h-screen bg-white text-black">

            {/* ========================================== */}
            {/* Header */}
            {/* ========================================== */}

            <section className="border-b border-black/10 bg-brand-50">
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-7xl
                        px-4
                        py-14
                        sm:px-6
                        lg:px-8
                    "
                >
                    {/* <Link
                        href="/dashboard/history"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-body-sm
                            font-medium
                            text-black/50
                            transition
                            hover:text-black
                        "
                    >
                        <span>←</span>
                        <span>
                            Prediction History
                        </span>
                    </Link> */}

                    <div className="max-w-2xl">
                        <p
                            className="
                                text-body-sm
                                font-medium
                                uppercase
                                tracking-[0.2em]
                                text-brand-700
                            "
                        >
                            Forecast result
                        </p>

                        <h1
                            className="
                                mt-3
                                text-h1
                                font-bold
                                leading-tight
                                tracking-tight
                            "
                        >
                            Your inflation forecast.
                        </h1>

                        <p
                            className="
                                mt-4
                                text-body
                                text-black/60
                            "
                        >
                            Created{" "}
                            {format(
                                prediction.created_at,
                                "MMM d, yyyy"
                            )}{" "}
                            at{" "}
                            {format(
                                prediction.created_at,
                                "h:mm a"
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* ========================================== */}
            {/* Main */}
            {/* ========================================== */}

            <section>
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-7xl
                        px-4
                        py-10
                        sm:px-6
                        lg:px-8
                    "
                >
                    <div className="space-y-8">

                        {/* ---------------------------------- */}
                        {/* Summary */}
                        {/* ---------------------------------- */}

                        <section
                            className="
                                overflow-hidden
                                rounded-xl
                                border
                                border-black/10
                                bg-white
                                shadow-sm
                            "
                        >
                            <div
                                className="
                                    border-b
                                    border-black/10
                                    px-6
                                    py-5
                                "
                            >
                                <p
                                    className="
                                        text-body-sm
                                        font-medium
                                        uppercase
                                        tracking-[0.15em]
                                        text-black/40
                                    "
                                >
                                    Forecast summary
                                </p>

                                <h2
                                    className="
                                        mt-1
                                        text-h3
                                        font-semibold
                                        tracking-tight
                                    "
                                >
                                    Your money over time
                                </h2>
                            </div>

                            <div
                                className="
                                    grid
                                    divide-y
                                    divide-black/10
                                    sm:grid-cols-3
                                    sm:divide-x
                                    sm:divide-y-0
                                "
                            >
                                {/* Starting value */}

                                <div className="p-6">
                                    <p
                                        className="
                                            text-body-sm
                                            text-black/45
                                        "
                                    >
                                        Starting value
                                    </p>

                                    <p
                                        className="
                                            mt-2
                                            truncate
                                            text-2xl
                                            font-semibold
                                            tracking-tight
                                            flex items-center gap-0.5
                                        "
                                    >
                                        <span className="font-medium">฿</span>
                                        {Number(
                                            startAmount
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                {/* Forecast value */}

                                <div className="p-6">
                                    <p
                                        className="
                                            text-body-sm
                                            text-black/45
                                        "
                                    >
                                        Forecast value
                                    </p>

                                    <p
                                        className="
                                            mt-2
                                            truncate
                                            text-2xl
                                            font-semibold
                                            tracking-tight
                                            flex items-center gap-0.5
                                            text-brand
                                        "
                                    >
                                        <span className="font-medium">฿</span>
                                        {Number(
                                            finalAmount
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                {/* Change */}

                                <div className="p-6">
                                    <p
                                        className="
                                            text-body-sm
                                            text-black/45
                                        "
                                    >
                                        Change
                                    </p>

                                    <p
                                        className={`
                                            mt-2
                                            text-2xl
                                            font-semibold
                                            tracking-tight
                                            ${
                                                isValueDown
                                                    ? "text-error"
                                                    : "text-success"
                                            }
                                        `}
                                    >
                                        {totalChange >=
                                        0
                                            ? "+"
                                            : ""}
                                        {totalChange.toFixed(
                                            2
                                        )}
                                        %
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-caption
                                            text-black/40
                                        "
                                    >
                                        over{" "}
                                        {
                                            prediction.n_years
                                        }{" "}
                                        {prediction.n_years ===
                                        1
                                            ? "year"
                                            : "years"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* ---------------------------------- */}
                        {/* Chart */}
                        {/* ---------------------------------- */}

                        <section
                            className="
                                overflow-hidden
                                rounded-xl
                                border
                                border-black/10
                                bg-white
                                shadow-sm
                            "
                        >
                            <div
                                className="
                                    border-b
                                    border-black/10
                                    px-6
                                    py-5
                                "
                            >
                                <p
                                    className="
                                        text-body-sm
                                        font-medium
                                        uppercase
                                        tracking-[0.15em]
                                        text-black/40
                                    "
                                >
                                    Value projection
                                </p>

                                <h2
                                    className="
                                        mt-1
                                        text-h3
                                        font-semibold
                                        tracking-tight
                                    "
                                >
                                    How your money changes
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        max-w-xl
                                        text-body-sm
                                        leading-6
                                        text-black/50
                                    "
                                >
                                    Explore how the estimated
                                    value changes throughout
                                    the forecast period.
                                </p>
                            </div>

                            <div className="overflow-x-auto p-4 sm:p-6">
                                <ChartPrediction
                                    predictionResult={
                                        results
                                    }
                                />
                            </div>
                        </section>

                        {/* ---------------------------------- */}
                        {/* Forecast details */}
                        {/* ---------------------------------- */}

                        <section>
                            <div
                                className="
                                    mb-5
                                    flex
                                    flex-col
                                    gap-2
                                    sm:flex-row
                                    sm:items-end
                                    sm:justify-between
                                "
                            >
                                <div>
                                    <p
                                        className="
                                            text-body-sm
                                            font-medium
                                            uppercase
                                            tracking-[0.15em]
                                            text-black/40
                                        "
                                    >
                                        Year-by-year
                                    </p>

                                    <h2
                                        className="
                                            mt-1
                                            text-h3
                                            font-semibold
                                            tracking-tight
                                        "
                                    >
                                        Forecast details
                                    </h2>
                                </div>

                                <p
                                    className="
                                        text-body-sm
                                        text-black/40
                                    "
                                >
                                    {serverState.rowCount}{" "}
                                    {serverState.rowCount ===
                                    1
                                        ? "year"
                                        : "years"}{" "}
                                    forecasted
                                </p>
                            </div>

                            {/* Desktop table */}

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
                                <div
                                    className="
                                        grid
                                        grid-cols-3
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
                                        Year
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
                                        Inflation
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
                                        Forecast value
                                    </p>
                                </div>

                                {results.map(
                                    (item) => (
                                        <div
                                            key={
                                                item.year
                                            }
                                            className="
                                                grid
                                                grid-cols-3
                                                gap-4
                                                border-b
                                                border-black/10
                                                px-6
                                                py-4
                                                last:border-b-0
                                            "
                                        >
                                            <p
                                                className="
                                                    text-body-sm
                                                    font-medium
                                                "
                                            >
                                                {
                                                    item.year
                                                }
                                            </p>

                                            <p
                                                className="
                                                    text-body-sm
                                                    text-black/60
                                                "
                                            >
                                                {(
                                                    item.inflation_rate *
                                                    100
                                                ).toFixed(
                                                    2
                                                )}
                                                %
                                            </p>

                                            <p
                                                className="
                                                    text-body-sm
                                                    font-semibold
                                                    flex gap-0.5 items-center
                                                "
                                            >
                                                <span className="font-medium">฿</span>
                                                {Number(
                                                    item.amount
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Mobile cards */}

                            <div className="space-y-3 md:hidden">
                                {results.map(
                                    (item) => (
                                        <div
                                            key={
                                                item.year
                                            }
                                            className="
                                                rounded-xl
                                                border
                                                border-black/10
                                                bg-white
                                                p-5
                                                shadow-sm
                                            "
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <p
                                                    className="
                                                        text-body
                                                        font-semibold
                                                    "
                                                >
                                                    {
                                                        item.year
                                                    }
                                                </p>

                                                <p
                                                    className="
                                                        text-body-sm
                                                        text-black/50
                                                    "
                                                >
                                                    {(
                                                        item.inflation_rate *
                                                        100
                                                    ).toFixed(
                                                        2
                                                    )}
                                                    %
                                                </p>
                                            </div>

                                            <div
                                                className="
                                                    mt-4
                                                    border-t
                                                    border-black/10
                                                    pt-4
                                                "
                                            >
                                                <p
                                                    className="
                                                        text-caption
                                                        uppercase
                                                        tracking-[0.12em]
                                                        text-black/40
                                                    "
                                                >
                                                    Forecast value
                                                </p>

                                                <p
                                                    className="
                                                        mt-1
                                                        text-xl
                                                        font-bold
                                                        tracking-tight
                                                    "
                                                >
                                                    ฿
                                                    {Number(
                                                        item.amount
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* ---------------------------------- */}
                        {/* Back */}
                        {/* ---------------------------------- */}

                        <div className="border-t border-black/10 pt-6">
                            <Link
                                href="/dashboard/history"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-body-sm
                                    text-black
                                    transition
                                    hover:text-brand-700
                                "
                            >
                                <span>←</span>
                                <span>
                                    Back to Prediction History
                                </span>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}


// ======================================================
// Loading Skeleton
// ======================================================

function HistoryDetailSkeleton() {
    return (
        <div>

            {/* Header */}

            <section className="border-b border-black/10 bg-brand-50">
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-7xl
                        px-4
                        py-10
                        sm:px-6
                        lg:px-8
                    "
                >
                    <div className="shimmer-light h-4 w-36 rounded" />

                    <div className="shimmer-light mt-8 h-3 w-28 rounded" />

                    <div className="shimmer-light mt-4 h-10 w-80 max-w-full rounded" />

                    <div className="shimmer-light mt-4 h-4 w-64 max-w-full rounded" />
                </div>
            </section>

            {/* Main */}

            <section>
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-7xl
                        space-y-8
                        px-4
                        py-10
                        sm:px-6
                        lg:px-8
                    "
                >

                    {/* Summary */}

                    <div
                        className="
                            overflow-hidden
                            rounded-xl
                            border
                            border-black/10
                            bg-white
                        "
                    >
                        <div className="border-b border-black/10 p-6">
                            <div className="shimmer-light h-3 w-32 rounded" />
                            <div className="shimmer-light mt-3 h-7 w-48 rounded" />
                        </div>

                        <div className="grid sm:grid-cols-3">
                            {Array.from({
                                length: 3,
                            }).map((_, index) => (
                                <div
                                    key={index}
                                    className="
                                        border-b
                                        border-black/10
                                        p-6
                                        last:border-b-0
                                        sm:border-b-0
                                        sm:border-r
                                        sm:last:border-r-0
                                    "
                                >
                                    <div className="shimmer-light h-3 w-24 rounded" />
                                    <div className="shimmer-light mt-3 h-8 w-32 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chart */}

                    <div
                        className="
                            rounded-xl
                            border
                            border-black/10
                            bg-white
                            p-6
                        "
                    >
                        <div className="shimmer-light h-3 w-32 rounded" />
                        <div className="shimmer-light mt-3 h-7 w-52 rounded" />
                        <div className="shimmer-light mt-6 h-80 w-full rounded" />
                    </div>

                    {/* Table */}

                    <div>
                        <div className="shimmer-light h-3 w-24 rounded" />
                        <div className="shimmer-light mt-3 h-7 w-48 rounded" />

                        <div
                            className="
                                mt-5
                                overflow-hidden
                                rounded-xl
                                border
                                border-black/10
                            "
                        >
                            <div className="space-y-5 p-6">
                                {Array.from({
                                    length: 6,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="
                                            grid
                                            grid-cols-3
                                            gap-4
                                        "
                                    >
                                        <div className="shimmer-light h-4 w-16 rounded" />
                                        <div className="shimmer-light h-4 w-20 rounded" />
                                        <div className="shimmer-light h-4 w-28 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}


// ======================================================
// Error
// ======================================================

function HistoryDetailError() {
    return (
        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <div className="max-w-sm text-center">
                <div
                    className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-error/10
                        text-xl
                        font-bold
                        text-error
                    "
                >
                    !
                </div>

                <h1
                    className="
                        mt-5
                        text-h2
                        font-bold
                        tracking-tight
                    "
                >
                    We couldn&apos;t load this forecast.
                </h1>

                <p
                    className="
                        mt-3
                        text-body-sm
                        leading-6
                        text-black/50
                    "
                >
                    Something went wrong while retrieving
                    this prediction.
                </p>

                <Link
                    href="/dashboard/history"
                    className="
                        mt-6
                        inline-flex
                        items-center
                        justify-center
                        rounded-md
                        bg-brand-500
                        px-5
                        py-2.5
                        text-body-sm
                        font-semibold
                        text-black
                        transition
                        hover:bg-brand-400
                    "
                >
                    Back to History
                </Link>
            </div>
        </section>
    );
}


// ======================================================
// Empty
// ======================================================

function HistoryDetailEmpty() {
    return (
        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <div className="max-w-sm text-center">
                <div
                    className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-brand-100
                        text-xl
                        font-bold
                        text-brand-800
                    "
                >
                    ?
                </div>

                <h1
                    className="
                        mt-5
                        text-h2
                        font-bold
                        tracking-tight
                    "
                >
                    No forecast data found.
                </h1>

                <p
                    className="
                        mt-3
                        text-body-sm
                        leading-6
                        text-black/50
                    "
                >
                    This prediction doesn&apos;t contain
                    any forecast results.
                </p>

                <Link
                    href="/dashboard/history"
                    className="
                        mt-6
                        inline-flex
                        items-center
                        justify-center
                        rounded-md
                        bg-brand-500
                        px-5
                        py-2.5
                        text-body-sm
                        font-semibold
                        text-black
                        transition
                        hover:bg-brand-400
                    "
                >
                    Back to History
                </Link>
            </div>
        </section>
    );
}