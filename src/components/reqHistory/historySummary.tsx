// ======================================================
// Summary
// ======================================================

type HistorySummaryProps = {
    total: number;
    isLoading: boolean;
};

export default function HistorySummary({
    total,
    isLoading,
}: HistorySummaryProps) {
    return (
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
            <p
                className="
                    text-body-sm
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-black/40
                "
            >
                Total predictions
            </p>

            {isLoading ? (
                <div className="shimmer-light mt-3 h-9 w-20 rounded" />
            ) : (
                <p
                    className="
                        mt-2
                        text-3xl
                        font-bold
                        tracking-tight
                    "
                >
                    {total.toLocaleString()}
                </p>
            )}

            <p
                className="
                    mt-2
                    text-body-sm
                    text-black/50
                "
            >
                Forecasts created with MoneyMonkey.
            </p>
        </div>
    );
}