"use client"

import { useApi } from "@/hooks/useApi";
import React, { useState } from "react";

import { server_State } from "@/types/prediction";
import PredictionEmptyState from "@/components/prediction/emptyStatePrediction";
import PredictionResultSkeleton from "@/components/prediction/resultSkeletonPrediction";
import PredictionResultView from "@/components/prediction/resultViewPrediction";
import { useToast } from "@/components/contexts/toastContext";

export default function Prediction() {

    const { post } = useApi();

    const { showToast } = useToast();

    const [clientState, setClientState] = useState({
        predictionFormValue : {
            n_years : '',
            initial_amount : ''
        },
        // independent from isLoading in useAuth() , this will make sure that local use after send api
        isLoading : false,
        isError : false
    })

    const [serverState, setServerState] = useState<server_State>({
        predictionResult : []
    })

    const PredictionFormValueChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setClientState(prev => ({
            ...prev,
            predictionFormValue : {
                ...prev.predictionFormValue,
                [name] : value
            }
        }))
    }

    const PredictionFormSubmit = async ( e : React.FormEvent<HTMLFormElement> ) => {

        e.preventDefault()

        setClientState(prev => ({
            ...prev,
            isLoading : true,
            isError : false
        }))

        try {
            const n_years = clientState.predictionFormValue.n_years
            const initial_amount = clientState.predictionFormValue.initial_amount

            const body = {n_years, initial_amount}
            const prediction = await post('/api/predictions/create', body)

            const data = prediction.data.predictions;

            setServerState(() => ({
                predictionResult : data
            }))

            // will toast here
            showToast({
                type: "success",
                title: "Prediction created",
                message: "Your inflation forecast is ready.",
            })
        
        } 
        catch (error) {
            // prediction === undefined for some reason in await fetch
            // will toast here
            setClientState(prev => ({
                ...prev,
                isError : true
            }))
            showToast({
                type: "error",
                title: "Prediction failed",
                message: `${error}`
            })
        }
        finally {
           setClientState(prev => ({
                ...prev,
                isLoading : false
            })) 
        }
    }

    const predictionResult = serverState.predictionResult;
    const hasPrediction = predictionResult.length > 0;

    /*
     * Get useful summary values from prediction.
     *
     * First item is the starting/current amount.
     * Last item represents the final forecast.
     */

    const firstPrediction = predictionResult[0];
    const lastPrediction = predictionResult[predictionResult.length - 1];

    return (
        <main className="min-h-screen bg-white text-black">

            {/* Page Header */}
            <section className="border-b border-black/10 bg-brand-50">

                <div
                    className="mx-auto w-full
                        max-w-7xl px-4 py-14
                        sm:px-6 lg:px-8"
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
                            Inflation Forecast
                        </p>

                        <h1
                            className="
                                mt-3
                                text-h1
                                font-bold
                                leading-tight
                                tracking-tight
                                text-black
                            "
                        >
                            Forecast your money&apos;s future.
                        </h1>

                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-body
                                leading-7
                                text-muted
                            "
                        >
                            Enter an amount and a time horizon to
                            explore how inflation could affect its
                            value over time.
                        </p>

                    </div>

                </div>

            </section>


            {/* Main Content */}
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

                    <div
                        className="
                            grid
                            gap-8
                            lg:grid-cols-[320px_minmax(0,1fr)]
                            lg:items-start
                        "
                    >

                        {/* =========================
                            INPUT PANEL
                        ========================== */}

                        <aside
                            className="
                                min-w-0
                                rounded-xl
                                border
                                border-black/10
                                bg-white
                                p-6
                                shadow-sm
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-caption
                                        font-medium
                                        uppercase
                                        tracking-[0.15em]
                                        text-black/50
                                    "
                                >
                                    Your forecast
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        text-h3
                                        font-semibold
                                        tracking-tight
                                    "
                                >
                                    Tell us about your money.
                                </h2>

                            </div>


                            <form
                                onSubmit={PredictionFormSubmit}
                                className="mt-7 space-y-5"
                            >

                                {/* Amount */}
                                <div className="space-y-2">

                                    <label
                                        htmlFor="initial_amount"
                                        className="
                                            block
                                            text-body-sm
                                            font-medium
                                        "
                                    >
                                        Initial amount
                                    </label>

                                    <div className="relative">

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute
                                                left-3
                                                top-1/2
                                                -translate-y-1/2
                                                text-body-sm
                                                text-black/40
                                            "
                                        >
                                            ฿
                                        </span>

                                        <input
                                            id="initial_amount"
                                            name="initial_amount"
                                            type="number"
                                            value={
                                                clientState
                                                    .predictionFormValue
                                                    .initial_amount
                                            }
                                            onChange={
                                                PredictionFormValueChange
                                            }
                                            min={1}
                                            required
                                            disabled={
                                                clientState.isLoading
                                            }
                                            placeholder="100000"
                                            className="
                                                w-full
                                                min-w-0
                                                rounded-md
                                                border
                                                border-black/15
                                                bg-white
                                                py-3
                                                pl-8
                                                pr-3
                                                text-body
                                                outline-none
                                                transition
                                                focus:border-brand-500
                                                focus:ring-2
                                                focus:ring-brand-500/20
                                                disabled:cursor-not-allowed
                                                disabled:bg-black/5
                                            "
                                        />

                                    </div>

                                    <p
                                        className="
                                            text-caption
                                            text-muted
                                        "
                                    >
                                        Amount you want to forecast.
                                    </p>

                                </div>


                                {/* Years */}
                                <div className="space-y-2">

                                    <label
                                        htmlFor="n_years"
                                        className="
                                            block
                                            text-body-sm
                                            font-medium
                                        "
                                    >
                                        Forecast period
                                    </label>

                                    <div className="relative">

                                        <input
                                            id="n_years"
                                            name="n_years"
                                            type="number"
                                            value={
                                                clientState
                                                    .predictionFormValue
                                                    .n_years
                                            }
                                            onChange={
                                                PredictionFormValueChange
                                            }
                                            min={1}
                                            max={150}
                                            required
                                            disabled={
                                                clientState.isLoading
                                            }
                                            placeholder="10"
                                            className="
                                                w-full
                                                min-w-0
                                                rounded-md
                                                border
                                                border-black/15
                                                bg-white
                                                py-3
                                                pl-3
                                                pr-14
                                                text-body
                                                outline-none
                                                transition
                                                focus:border-brand-500
                                                focus:ring-2
                                                focus:ring-brand-500/20
                                                disabled:cursor-not-allowed
                                                disabled:bg-black/5
                                            "
                                        />

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute
                                                right-3
                                                top-1/2
                                                -translate-y-1/2
                                                text-body-sm
                                                text-black/40
                                            "
                                        >
                                            years
                                        </span>

                                    </div>

                                    <p
                                        className="
                                            text-caption
                                            text-muted
                                        "
                                    >
                                        Choose between 1 and 150 years.
                                    </p>

                                </div>


                                {/* Error */}
                                {clientState.isError && (
                                    <div
                                        className="
                                            rounded-md
                                            border
                                            border-error/20
                                            bg-error/5
                                            px-3
                                            py-2
                                            text-body-sm
                                            text-error
                                        "
                                    >
                                        Prediction failed. Please try
                                        again later.
                                    </div>
                                )}


                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={clientState.isLoading}
                                    className="
                                        inline-flex
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-md
                                        bg-brand-500
                                        px-5
                                        py-3
                                        text-body-sm
                                        font-semibold
                                        text-black
                                        transition
                                        hover:bg-brand-400
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >

                                    {clientState.isLoading ? (
                                        <span className="flex items-center gap-2">

                                            <span
                                                className="
                                                    h-4
                                                    w-4
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-black/20
                                                    border-t-black
                                                "
                                            />

                                            Predicting...

                                        </span>
                                    ) : (
                                        "Make a Prediction"
                                    )}

                                </button>

                            </form>

                        </aside>


                        {/* =========================
                            RESULT AREA
                        ========================== */}

                        <div
                            className="
                                min-w-0
                            "
                        >

                            {clientState.isLoading ? (

                                <PredictionResultSkeleton />

                            ) : hasPrediction ? (

                                <PredictionResultView
                                    predictionResult={
                                        predictionResult
                                    }
                                    firstPrediction={
                                        firstPrediction
                                    }
                                    lastPrediction={
                                        lastPrediction
                                    }
                                />

                            ) : (

                                <PredictionEmptyState />

                            )}

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}