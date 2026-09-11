type PaginationProps = {
    currentPage : number,
    lastPage : number,
    onPageChange : (currentPage : number) => void,
    isHistoryLoading : boolean
}

// this component may be can reuse !
export function Pagination( { currentPage, lastPage, onPageChange, isHistoryLoading } : PaginationProps ) {
    if (lastPage < 1 || !lastPage ) return null

    const pages = Array.from(
        { length: lastPage },
        (_, index) => index + 1
    )

    return (
        <div className="flex gap-2">
            { pages.map(page => (
                <button
                    key={page} 
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`border px-2 rounded-full hover:cursor-pointer
                        ${page === currentPage ? 'bg-black/60 text-white' : ''}
                    `}
                    disabled={isHistoryLoading}
                >
                    {page}
                </button>
            ))}
        </div>
    )
    
}