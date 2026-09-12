export default function PredictionEmptyState() {
    return (
        <div
            className="
                flex
                min-h-105
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-black/15
                bg-black/1.5
                p-8
                text-center
            "
        >
            <div className="max-w-sm">

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
                    %
                </div>

                <h2
                    className="
                        mt-5
                        text-h3
                        font-semibold
                        tracking-tight
                    "
                >
                    Your forecast will appear here.
                </h2>

                <p
                    className="
                        mt-3
                        text-body-sm
                        leading-6
                        text-muted
                    "
                >
                    Enter an amount and choose how many years
                    you want to explore.
                </p>

            </div>
        </div>
    );
}