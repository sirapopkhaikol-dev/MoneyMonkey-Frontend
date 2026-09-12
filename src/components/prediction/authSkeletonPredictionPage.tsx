export default function PredictionPageSkeleton() {
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
                <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">

                    <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                        <div className="shimmer-light h-3 w-24 rounded" />

                        <div className="shimmer-light mt-4 h-6 w-48 rounded" />

                        <div className="shimmer-light mt-8 h-3 w-28 rounded" />
                        <div className="shimmer-light mt-3 h-11 w-full rounded-md" />

                        <div className="shimmer-light mt-6 h-3 w-28 rounded" />
                        <div className="shimmer-light mt-3 h-11 w-full rounded-md" />

                        <div className="shimmer-light mt-8 h-11 w-full rounded-md" />
                    </div>

                    <div className="space-y-6">
                        {/* <div className="rounded-xl border border-black/10 bg-white p-6">
                            <div className="shimmer-light h-4 w-36 rounded" />

                            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                <div className="shimmer-light h-20 rounded" />
                                <div className="shimmer-light h-20 rounded" />
                            </div>
                        </div> */}

                        <div className="rounded-xl border border-black/10 bg-white p-6">
                            <div className="shimmer-light h-4 w-32 rounded" />
                            <div className="shimmer-light mt-6 h-80 w-full rounded" />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}