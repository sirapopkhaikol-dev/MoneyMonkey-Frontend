import { client_State, server_State } from "@/types/history"
import React from "react"
import { RangeFilter } from "./rangeFilter"

type FilterHistoryProps = {
    filter : client_State['filter'],
    range : server_State["range"]
    onFilterChange : (e : React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit : (e : React.FormEvent<HTMLFormElement>) => void
}

export function FilterHistory( {
    filter,
    range,
    onFilterChange,
    onSubmit
    
} : FilterHistoryProps ) {
    return (
        <div className="hidden">
            <form onSubmit={onSubmit} className="space-y-5">
                <RangeFilter
                    label="Amount"
                    // min={10000000000000}
                    // max={2000000000000000}
                    min={range.amount.min_amount}
                    max={range.amount.max_amount}

                    minValue={filter.min_amount}
                    maxValue={filter.max_amount}
                    // minValue={10000000000000}
                    // maxValue={2000000000000000}

                    minName="min_amount"
                    maxName="max_amount"

                    onChange={onFilterChange}
                />

                {/* <RangeFilter
                    label="Years"
                    min={range.years.min_years}
                    max={range.years.max_years}

                    minValue={filter.min_years}
                    maxValue={filter.max_years}

                    minName="min_years"
                    maxName="max_years"

                    onChange={onFilterChange}
                /> */}

                <button
                    type="submit"
                    className="border"
                >
                    Let Filter
                </button>

            </form>
        </div>
    )
}
