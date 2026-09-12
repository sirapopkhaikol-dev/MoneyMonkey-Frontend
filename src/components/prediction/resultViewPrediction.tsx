import ChartPrediction from "./chartPrediction";


export type PredictionResult = {
    year: number;
    inflation_rate: number;
    amount: number;
};

export default function PredictionResultView({
    predictionResult,
    firstPrediction,
    lastPrediction,
}: {
    predictionResult: PredictionResult[];
    firstPrediction: PredictionResult;
    lastPrediction: PredictionResult;
}) {

    const startAmount = firstPrediction.amount;

    const finalAmount = lastPrediction.amount;

    const totalChange =
        ((finalAmount - startAmount) / startAmount) * 100;


    return (
        <div className="space-y-6">

            {/* =========================
                SUMMARY
            ========================== */}

            <div
                className="
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    p-6
                    shadow-sm
                "
            >

                <div
                    className="
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
                                text-caption
                                font-medium
                                uppercase
                                tracking-[0.15em]
                                text-black/50
                            "
                        >
                            Forecast result
                        </p>

                        <h2
                            className="
                                mt-2
                                text-h3
                                font-semibold
                            "
                        >
                            Your money over time
                        </h2>

                    </div>

                    <p
                        className="
                            text-body-sm
                            text-muted
                        "
                    >
                        {predictionResult.length} years forecast
                    </p>

                </div>


                <div
                    className="
                        mt-7
                        grid
                        gap-6
                        sm:grid-cols-2
                    "
                >

                    {/* Starting value */}
                    <div>

                        <p
                            className="
                                text-body-sm
                                text-muted
                            "
                        >
                            Starting value
                        </p>

                        <p
                            className="
                                mt-1
                                truncate
                                text-2xl
                                font-semibold
                                tracking-tight
                                flex items-center gap-0.5
                            "
                        >
                            <span className="font-medium">฿</span>{startAmount.toLocaleString()}
                        </p>

                    </div>


                    {/* Final value */}
                    <div>

                        <p
                            className="
                                text-body-sm
                                text-muted
                            "
                        >
                            Forecast value
                        </p>

                        <p
                            className="
                                mt-1
                                truncate
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-brand-600
                                flex items-center gap-0.5
                            "
                        >
                            <span className="font-medium">฿</span>{finalAmount.toLocaleString()}
                        </p>

                    </div>

                </div>


                <div
                    className="
                        mt-6
                        border-t
                        border-black/10
                        pt-5
                    "
                >

                    <p className="text-body-sm text-muted">
                        Change over forecast period
                    </p>

                    <p
                        className="
                            mt-1
                            text-body-sm
                            font-semibold
                        "
                    >
                        {totalChange.toFixed(2)}%
                    </p>

                </div>

            </div>


            {/* =========================
                CHART
            ========================== */}

            <div
                className="
                    min-w-0
                    overflow-hidden
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    p-4
                    shadow-sm
                    sm:p-6
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
                        Forecast
                    </p>

                    <h3
                        className="
                            mt-2
                            text-h3
                            font-semibold
                        "
                    >
                        Future value
                    </h3>

                </div>

                <div
                    className="
                        mt-6
                        min-w-0
                        overflow-x-auto
                    "
                >
                    <ChartPrediction
                        predictionResult={predictionResult}
                    />
                </div>

            </div>


            {/* =========================
                TABLE
            ========================== */}

            <div
                className="
                    min-w-0
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
                        p-6
                    "
                >

                    <p
                        className="
                            text-caption
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-black/50
                        "
                    >
                        Forecast details
                    </p>

                    <h3
                        className="
                            mt-2
                            text-h3
                            font-semibold
                        "
                    >
                        Year-by-year projection
                    </h3>

                </div>


                {/* Table scroll container */}
                <div className="overflow-x-auto">

                    <div className="min-w-140">

                        {/* Header */}
                        <div
                            className="
                                grid
                                grid-cols-3
                                border-b
                                border-black/10
                                bg-black/2
                                px-6
                                py-3
                                text-body-sm
                                font-medium
                                text-black/50
                            "
                        >
                            <span>Year</span>
                            <span>Inflation</span>
                            <span>Value</span>
                        </div>


                        {/* Rows */}
                        {predictionResult.map(item => (

                            <div
                                key={item.year}
                                className="
                                    grid
                                    grid-cols-3
                                    border-b
                                    border-black/5
                                    px-6
                                    py-4
                                    text-body-sm
                                    last:border-b-0
                                "
                            >

                                <span className="font-medium">
                                    {item.year}
                                </span>

                                <span>
                                    {(item.inflation_rate * 100).toFixed(2)}%
                                </span>

                                <span className="font-medium">
                                    <span className="font-light">฿</span>{item.amount.toLocaleString()}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}