// ======================================================
// Error State
// ======================================================

type HistoryErrorStateProps = {
    onRetry: () => void;
};

export default function HistoryErrorState({
    onRetry,
}: HistoryErrorStateProps) {
    return (
        <div
            className="
                flex
                min-h-90
                items-center
                justify-center
                rounded-xl
                border
                border-error/20
                bg-error/3
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
                        bg-error/10
                        text-xl
                        font-bold
                        text-error
                    "
                >
                    !
                </div>

                <h2
                    className="
                        mt-5
                        text-h3
                        font-semibold
                        tracking-tight
                    "
                >
                    We couldn&apos;t load your history.
                </h2>

                <p
                    className="
                        mt-3
                        text-body-sm
                        leading-6
                        text-black/50
                    "
                >
                    Something went wrong while retrieving
                    your prediction history.
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="
                        mt-6
                        inline-flex
                        items-center
                        justify-center
                        rounded-md
                        border
                        border-black/15
                        bg-white
                        px-5
                        py-2.5
                        text-body-sm
                        font-semibold
                        transition
                        hover:border-black/30
                        hover:bg-black/3
                    "
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}