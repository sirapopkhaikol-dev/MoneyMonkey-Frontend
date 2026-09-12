// ======================================================
// Auth / Page Skeleton
// ======================================================


export default function HistoryPageSkeleton() {
    return (
        <main className="min-h-screen bg-white text-black">
            <div className="border-b border-black/10 bg-brand-50">
                <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="shimmer-light h-3 w-32 rounded" />

                    <div className="shimmer-light mt-4 h-10 w-80 max-w-full rounded" />

                    <div className="shimmer-light mt-4 h-4 w-lg max-w-full rounded" />
                </div>
            </div>

            <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="space-y-8">

                    {/* Summary */}

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
                        <div className="shimmer-light h-3 w-32 rounded" />
                        <div className="shimmer-light mt-3 h-9 w-20 rounded" />
                        <div className="shimmer-light mt-3 h-3 w-56 rounded" />
                    </div>

                    {/* Table */}

                    <div className="space-y-5">

                        <div>
                            <div className="shimmer-light h-3 w-24 rounded" />
                            <div className="shimmer-light mt-3 h-7 w-48 rounded" />
                        </div>

                        <div
                            className="
                                hidden
                                overflow-hidden
                                rounded-xl
                                border
                                border-black/10
                                md:block
                            "
                        >
                            <div className="grid grid-cols-4 gap-4 border-b border-black/10 p-5">
                                <div className="shimmer-light h-3 w-16 rounded" />
                                <div className="shimmer-light h-3 w-20 rounded" />
                                <div className="shimmer-light h-3 w-20 rounded" />
                                <div />
                            </div>

                            {Array.from({ length: 6 }).map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        className="
                                            grid
                                            grid-cols-4
                                            gap-4
                                            border-b
                                            border-black/10
                                            p-6
                                            last:border-b-0
                                        "
                                    >
                                        <div className="shimmer-light h-4 w-28 rounded" />
                                        <div className="shimmer-light h-4 w-24 rounded" />
                                        <div className="shimmer-light h-4 w-20 rounded" />
                                        <div className="ml-auto shimmer-light h-4 w-5 rounded" />
                                    </div>
                                )
                            )}
                        </div>

                        <div className="space-y-3 md:hidden">
                            {Array.from({ length: 6 }).map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        className="
                                            rounded-xl
                                            border
                                            border-black/10
                                            p-5
                                        "
                                    >
                                        <div className="flex justify-between">
                                            <div className="shimmer-light h-4 w-28 rounded" />
                                            <div className="shimmer-light h-4 w-4 rounded" />
                                        </div>

                                        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/10 pt-4">
                                            <div>
                                                <div className="shimmer-light h-3 w-16 rounded" />
                                                <div className="shimmer-light mt-2 h-5 w-24 rounded" />
                                            </div>

                                            <div>
                                                <div className="shimmer-light h-3 w-16 rounded" />
                                                <div className="shimmer-light mt-2 h-5 w-20 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}