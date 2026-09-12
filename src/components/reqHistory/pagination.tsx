// ======================================================
// Pagination
// ======================================================

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    onPageChange: (currentPage: number) => void;
    isHistoryLoading: boolean;
};

export default function Pagination({
    currentPage,
    lastPage,
    onPageChange,
    isHistoryLoading,
}: PaginationProps) {
    if (lastPage < 1) {
        return null;
    }

    const pages = getPaginationPages(
        currentPage,
        lastPage
    );

    return (
        <div className="flex min-w-max items-center gap-1">
            <button
                type="button"
                title={currentPage <= 1 || isHistoryLoading ? '' : 'Previous Page'}
                disabled={
                    currentPage <= 1 ||
                    isHistoryLoading
                }
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="
                    flex
                    h-9
                    min-w-9
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-black/10
                    px-3
                    text-body-sm
                    transition
                    hover:border-black/30
                    hover:bg-black/3
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    hover:cursor-pointer
                "
            >
                ←
            </button>

            {pages.map((page, index) => {
                if (page === "...") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className="
                                flex
                                h-9
                                min-w-9
                                items-center
                                justify-center
                                text-black/30
                            "
                        >
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        title={`page ${page}`}
                        type="button"
                        onClick={() =>
                            onPageChange(page)
                        }
                        disabled={isHistoryLoading}
                        className={`
                            flex
                            h-9
                            min-w-9
                            items-center
                            justify-center
                            rounded-md
                            px-3
                            text-body-sm
                            font-medium
                            transition
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            hover:cursor-pointer
                            ${
                                page === currentPage
                                    ? "bg-black text-white"
                                    : "border border-black/10 hover:border-black/30 hover:bg-black/3"
                            }
                        `}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                type="button"
                title={currentPage >= lastPage || isHistoryLoading ? '' : 'Next Page'}
                disabled={
                    currentPage >= lastPage ||
                    isHistoryLoading
                }
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="
                    hover:cursor-pointer
                    flex
                    h-9
                    min-w-9
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-black/10
                    px-3
                    text-body-sm
                    transition
                    hover:border-black/30
                    hover:bg-black/3
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                "
            >
                →
            </button>
        </div>
    );
}

function getPaginationPages(
    currentPage: number,
    lastPage: number
): (number | "...")[] {
    if (lastPage <= 7) {
        return Array.from(
            { length: lastPage },
            (_, index) => index + 1
        );
    }

    if (currentPage <= 3) {
        return [
            1,
            2,
            3,
            4,
            "...",
            lastPage,
        ];
    }

    if (currentPage >= lastPage - 2) {
        return [
            1,
            "...",
            lastPage - 3,
            lastPage - 2,
            lastPage - 1,
            lastPage,
        ];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        lastPage,
    ];
}