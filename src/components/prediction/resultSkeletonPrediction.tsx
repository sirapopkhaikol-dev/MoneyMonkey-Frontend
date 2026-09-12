export default function PredictionResultSkeleton() {
    return (
        <div className="space-y-6">

            {/* Summary skeleton */}
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

                <div className="shimmer-light h-3 w-28 rounded" />

                <div
                    className="
                        mt-4
                        grid
                        gap-6
                        sm:grid-cols-2
                    "
                >

                    <div>
                        <div className="shimmer-light h-3 w-24 rounded" />
                        <div className="shimmer-light mt-3 h-8 w-40 rounded" />
                    </div>

                    <div>
                        <div className="shimmer-light h-3 w-24 rounded" />
                        <div className="shimmer-light mt-3 h-8 w-40 rounded" />
                    </div>

                </div>

            </div>


            {/* Chart skeleton */}
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

                <div className="shimmer-light h-4 w-40 rounded" />

                <div
                    className="
                        shimmer-light
                        mt-6
                        h-80
                        w-full
                        rounded-md
                    "
                />

            </div>


            {/* Table skeleton */}
            <div
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
                        p-6
                    "
                >
                    <div className="shimmer-light h-4 w-36 rounded" />
                </div>

                <div className="space-y-4 p-6">

                    {Array.from({ length: 5 }).map((_, index) => (
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
                            <div className="shimmer-light h-4 w-24 rounded" />
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}