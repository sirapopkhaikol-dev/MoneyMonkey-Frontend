import { client_State, server_State } from "@/types/history";
import { format } from "date-fns";
import Link from "next/link";


type ResultHistoryProps = {
    serverState : server_State,
    clientState : client_State
}


export function ResultHistory( { serverState, clientState } : ResultHistoryProps ) {

    if (serverState.reqHistory.length <= 0) { return null }

    return(
        <div className="p-6 gap-4">
            <p className="text-end">
                Page : {clientState.pagination.page} of {serverState.pagination.lastPage} 
                {" . "}
                {serverState.pagination.totalFilteredRows}
            </p>
            <p className="text-end">
                Showing {serverState.pagination.totalFilteredRows} of{" "}
                {serverState.summary.entriesRows} entries
            </p>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between border-b-2 border-dashed border-black/60">
                    <div className="">Date</div>
                    <div className="">Amount</div>
                    <div className="">Years</div>
                </div>
                { serverState.reqHistory.map( item  => (
                    <Link 
                        href={`/dashboard/history/${item.id}`}
                        key={item.id} 
                        className="flex justify-between"
                    >
                        <p>{ format(item.created_at, 'PPpp')}</p>
                        <p>{item.initial_amount}</p>
                        <p>{item.n_years}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}