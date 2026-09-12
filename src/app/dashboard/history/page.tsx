"use client";

import { useAuth } from "@/components/contexts/authContext";
import { useToast } from "@/components/contexts/toastContext";
import HistoryPageSkeleton from "@/components/reqHistory/authSkeletonHistoryPage";
import HistoryEmptyState from "@/components/reqHistory/emptyState";
import HistoryErrorState from "@/components/reqHistory/errorState";
import HistorySummary from "@/components/reqHistory/historySummary";
import HistoryTableSkeleton from "@/components/reqHistory/historyTableSkeleton";
import Pagination from "@/components/reqHistory/pagination";
import ResultHistory from "@/components/reqHistory/resultHistory";
import { useApi } from "@/hooks/useApi";
import { client_State, server_State } from "@/types/history";
import { buildHistoryParams } from "@/utils/reqHistory";
import React, { useEffect, useRef, useState } from "react";

export default function History() {
    const { get } = useApi();
    const { isLoading } = useAuth();
    const { showToast } = useToast();

    const [clientState, setClientState] = useState<client_State>({
        filter: {
            min_amount: undefined,
            max_amount: undefined,
            min_years: undefined,
            max_years: undefined,
        },
        appliedFilter: {
            min_amount: undefined,
            max_amount: undefined,
            min_years: undefined,
            max_years: undefined,
        },
        pagination: {
            page: 1,
            limit: 10,
        },
        isHistoryLoading: true,
        isError: false,
    });

    const [serverState, setServerState] = useState<server_State>({
        reqHistory: [],
        pagination: {
            lastPage: 0,
            totalFilteredRows: 0,
        },
        range: {
            amount: {
                max_amount: 0,
                min_amount: 0,
            },
            years: {
                max_years: 0,
                min_years: 0,
            },
        },
        summary: {
            entriesRows: 0,
        },
    });

    const requestId = useRef(0);

    // --------------------------------------------------
    // Fetch history
    // --------------------------------------------------

    useEffect(() => {
        if (isLoading) return;

        const controller = new AbortController();

        requestId.current += 1;
        const currentRequestId = requestId.current;

        const fetchReqHistory = async () => {
            setClientState((prev) => ({
                ...prev,
                isError: false,
                isHistoryLoading: true,
            }));

            try {
                const query = buildHistoryParams(
                    clientState.pagination,
                    clientState.appliedFilter
                );

                const result = await get(
                    `/api/predictions/find/reqHistory?${query}`,
                    controller.signal
                );

                if (!result) {
                    return;
                }

                // Only the latest request can update the data
                if (currentRequestId !== requestId.current) {
                    return;
                }

                const data = result.data.predictions;
                const pagination = result.pagination;
                const range = result.range;
                const summary = result.summary;

                setServerState({
                    reqHistory: data,
                    pagination: {
                        lastPage: pagination.lastPage,
                        totalFilteredRows:
                            pagination.totalFilteredRows,
                    },
                    range,
                    summary,
                });

            } catch (error) {
                showToast({
                    type: "error",
                    title: "History retrieve fail",
                    message: `${error}`
                })
                // Ignore errors from old requests
                if (currentRequestId !== requestId.current) {
                    return;
                }

                // Ignore AbortController errors
                if (controller.signal.aborted) {
                    return;
                }

                setClientState((prev) => ({
                    ...prev,
                    isError: true,
                }));


            } finally {
                // Only the latest request can turn loading OFF
                if (currentRequestId !== requestId.current) {
                    return;
                }

                setClientState((prev) => ({
                    ...prev,
                    isHistoryLoading: false,
                }));
            }
        };

        fetchReqHistory();

        return () => {
            controller.abort();
        };

        // Pagination changes should trigger a new request.
        // Filter dependencies are intentionally disabled for now.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isLoading,
        clientState.pagination.page,
        clientState.pagination.limit,
    ]);

    // --------------------------------------------------
    // Retry
    // --------------------------------------------------

    const retryHistory = () => {
        setClientState((prev) => ({
            ...prev,
            isError: false,
        }));

        // Changing the page away and back is not ideal,
        // so simply incrementing requestId is not enough.
        // The current fetch lifecycle will handle normal retries.
        // For now, reload the current page through a small
        // state update using the same page value.
        setClientState((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: prev.pagination.page,
            },
        }));
    };

    // --------------------------------------------------
    // Pagination
    // --------------------------------------------------

    const changePage = (page: number) => {
        setClientState((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page,
            },
        }));
    };

    const changeLimit = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setClientState((prev) => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: 1,
                limit: Number(e.target.value),
            },
        }));
    };

    // --------------------------------------------------
    // Render
    // --------------------------------------------------

    return (
        <main className="min-h-screen bg-white text-black">

            {/* ------------------------------------------ */}
            {/* Header */}
            {/* ------------------------------------------ */}

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
                            Prediction History
                        </p>

                        <h1
                            className="
                                mt-4
                                text-h1
                                font-bold
                                leading-tight
                                tracking-tight
                            "
                        >
                            Review your forecasts.
                        </h1>

                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-body
                                leading-7
                                text-black/60
                            "
                        >
                            Review the predictions you&apos;ve
                            created with MoneyMonkey.
                        </p>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------ */}
            {/* Main content */}
            {/* ------------------------------------------ */}

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

                    {/* ---------------------------------- */}
                    {/* Initial auth loading */}
                    {/* ---------------------------------- */}

                    {isLoading ? (
                        <HistoryPageSkeleton />
                    ) : (

                        <div className="space-y-8">

                            {/* ------------------------------ */}
                            {/* Summary */}
                            {/* ------------------------------ */}

                            <HistorySummary
                                total={
                                    serverState.summary.entriesRows
                                }
                                isLoading={
                                    clientState.isHistoryLoading
                                }
                            />

                            {/* ------------------------------ */}
                            {/* Error */}
                            {/* ------------------------------ */}

                            {clientState.isError ? (
                                <HistoryErrorState
                                    onRetry={retryHistory}
                                />
                            ) : clientState.isHistoryLoading ? (

                                /* -------------------------- */
                                /* API loading */
                                /* -------------------------- */

                                <HistoryTableSkeleton />

                            ) : serverState.reqHistory.length === 0 ? (

                                /* -------------------------- */
                                /* Empty */
                                /* -------------------------- */

                                <HistoryEmptyState />

                            ) : (

                                /* -------------------------- */
                                /* Results */
                                /* -------------------------- */

                                <div className="space-y-5">

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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
                                                Your activity
                                            </p>

                                            <h2
                                                className="
                                                    mt-1
                                                    text-h3
                                                    font-semibold
                                                    tracking-tight
                                                "
                                            >
                                                Prediction history
                                            </h2>
                                        </div>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                text-body-sm
                                                text-black/50
                                            "
                                        >
                                            <label htmlFor="limit">
                                                Rows per page
                                            </label>

                                            <select
                                                id="limit"
                                                name="limit"
                                                title="Change Page"
                                                value={
                                                    clientState
                                                        .pagination
                                                        .limit
                                                }
                                                onChange={
                                                    changeLimit
                                                }
                                                disabled={
                                                    clientState.isHistoryLoading
                                                }
                                                className="
                                                    rounded-md
                                                    border
                                                    border-black/15
                                                    bg-white
                                                    px-3
                                                    py-2
                                                    text-body-sm
                                                    text-black
                                                    outline-none
                                                    transition
                                                    focus:border-black
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                    hover: cursor-pointer
                                                "
                                            >
                                                <option value="10">
                                                    10
                                                </option>

                                                <option value="20">
                                                    20
                                                </option>

                                                <option value="50">
                                                    50
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <ResultHistory
                                        serverState={
                                            serverState
                                        }
                                        clientState={
                                            clientState
                                        }
                                    />

                                    {/* -------------------------- */}
                                    {/* Pagination information */}
                                    {/* -------------------------- */}

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-4
                                            border-t
                                            border-black/10
                                            pt-5
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                        "
                                    >
                                        <p
                                            className="
                                                text-body-sm
                                                text-black/50
                                            "
                                        >
                                            Showing{" "}
                                            <span className="font-medium text-black">
                                                {Math.min(
                                                    (
                                                        clientState
                                                            .pagination
                                                            .page - 1
                                                    ) *
                                                        clientState
                                                            .pagination
                                                            .limit +
                                                        1,
                                                    serverState
                                                        .pagination
                                                        .totalFilteredRows
                                                )}
                                                –
                                                {Math.min(
                                                    clientState
                                                        .pagination
                                                        .page *
                                                        clientState
                                                            .pagination
                                                            .limit,
                                                    serverState
                                                        .pagination
                                                        .totalFilteredRows
                                                )}
                                            </span>{" "}
                                            of{" "}
                                            <span className="font-medium text-black">
                                                {
                                                    serverState
                                                        .pagination
                                                        .totalFilteredRows
                                                }
                                            
                                            </span>
                                            {" "}
                                            predictions
                                        </p>

                                        <div className="overflow-x-auto">
                                            <Pagination
                                                lastPage={
                                                    serverState
                                                        .pagination
                                                        .lastPage
                                                }
                                                currentPage={
                                                    clientState
                                                        .pagination
                                                        .page
                                                }
                                                onPageChange={
                                                    changePage
                                                }
                                                isHistoryLoading={
                                                    clientState
                                                        .isHistoryLoading
                                                }
                                            />
                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>
                    )}

                </div>
            </section>
        </main>
    );
}
