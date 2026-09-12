// ======================================================
// Empty State
// ======================================================
import Link from "next/link";


export default function HistoryEmptyState() {
    return (
        <div
            className="
                flex
                min-h-90
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
                    ↗
                </div>

                <h2
                    className="
                        mt-5
                        text-h3
                        font-semibold
                        tracking-tight
                    "
                >
                    Your prediction history is empty.
                </h2>

                <p
                    className="
                        mt-3
                        text-body-sm
                        leading-6
                        text-black/50
                    "
                >
                    Create your first prediction and
                    your forecast will appear here.
                </p>

                <Link
                    href="/prediction"
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
                    Make a Prediction
                </Link>
            </div>
        </div>
    );
}