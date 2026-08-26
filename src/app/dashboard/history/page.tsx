"use client"


import { useAuth } from "@/components/contexts/authContext";
import { FilterHistory } from "@/components/reqHistory/filterHistory";
import { Pagination } from "@/components/reqHistory/pagination";
import { ResultHistory } from "@/components/reqHistory/resultHistory";
import { useApi } from "@/hooks/useApi"
import { client_State, server_State } from "@/types/history";
import { buildHistoryParams } from "@/utils/reqHistory";
import React, { useEffect, useState } from "react"

export default function History() {

    const { get } = useApi();

    const { isLoading } = useAuth();

    const [clientState, setClientState] = useState<client_State>({
        filter: {
            min_amount: undefined,
            max_amount: undefined,
            min_years: undefined,
            max_years: undefined
        },
        appliedFilter : {
            min_amount: undefined,
            max_amount: undefined,
            min_years: undefined,
            max_years: undefined 
        },
        pagination : {
            page: 1,
            limit: 10
        },
        isHistoryLoading : false,
        isError : false
    })

    const [serverState, setServerState] = useState<server_State>({
        reqHistory: [],
        pagination: {
            lastPage : 0,
            totalFilteredRows : 0
        },
        range:{
            amount :{
                max_amount : 0,
                min_amount : 0
            },
            years : {
                max_years : 0,
                min_years : 0
            }
        },
        summary: {
            entriesRows : 0
        }
    })

    // ---------------------------------- 

    // filter state change
    const filterStateChange = (
        e : React.ChangeEvent< HTMLInputElement>
    ) => {
        const {name , value} = e.target

        setClientState(prev => ({
            ...prev,
            filter : {
                ...prev.filter,
                [name] : Number(value)
            }
        }))
    }

    const filterFormSubmit = (
        e : React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        setClientState(prev => ({
            ...prev,
            appliedFilter : {
                ...prev.appliedFilter,
                min_amount: prev.filter.min_amount,
                max_amount: prev.filter.max_amount,
                min_years: prev.filter.min_years,
                max_years: prev.filter.max_years
            },
            // when change min-max amout | years before send to api, we will reset page to 1
            pagination : {
                ...prev.pagination,
                page : 1
            } 

        }))

    }
    
    // for start when visit page , we will set page and limit to default
    useEffect(() => {

        if (isLoading) { return; }

        const fetchReqHistory = async() => {
            setClientState(prev => ({
                ...prev,
                isError: false,
                isHistoryLoading : true
            }))

            try {
                const query = buildHistoryParams(clientState.pagination, clientState.appliedFilter)
 
                const result = await get(
                    `/api/predictions/find/reqHistory?${query}`
                )

                const data = result.data.predictions;
                const pagination = result.pagination;
                const range = result.range;
                const summary = result.summary;

                setServerState(() => ({
                    reqHistory : data,
                    pagination: {
                        lastPage : pagination.lastPage,
                        totalFilteredRows : pagination.totalFilteredRows
                    },
                    range : range,
                    summary : summary
                }));       
            } 
            catch (error) {
                setClientState(prev => ({
                    ...prev,
                    isError : true
                }))
                console.log('error ->>>>',error);
            }
            finally {
                setClientState(prev => ({
                    ...prev,
                    isHistoryLoading : false
                }))
            }
        }
        fetchReqHistory();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isLoading, 
        clientState.pagination.page,
        clientState.pagination.limit,
        clientState.appliedFilter.min_amount,
        clientState.appliedFilter.max_amount,
        clientState.appliedFilter.min_years,
        clientState.appliedFilter.max_years
    ])

    // ----------------------------------

    // for render in ui logic
    const renderStatus = () => {
        if (clientState.isHistoryLoading || isLoading) {
            return <p>Loading...</p>
        }

        if (clientState.isError) {
            return <p>Search history failed! Please try again later.</p>
        }

        if (serverState.reqHistory.length > 0) {
            return <p>Search Successfully!</p>
        }

        return <p>No data found.</p>
    }

    return (
        <main className="min-h-screen bg-white text-black">
            <div 
                className="border p-4 space-y-2"
            >
                <FilterHistory
                    // before send api use filter
                    // after that call filterFormSubmit that will setAppliedFilter
                    filter={clientState.filter}
                    range={serverState.range}
                    onFilterChange={filterStateChange}
                    onSubmit={filterFormSubmit}
                />

                <div className="space-x-2 flex">
                    <div className="flex gap-2">
                        <label>limit</label>
                        <select 
                            name="limit" id="limit" className="border"
                            // because select when change we need to call api, just use appliedFilter
                            value={clientState.pagination.limit}
                            onChange={(e : React.ChangeEvent<HTMLSelectElement>) => 
                                {
                                    // i will refactor later
                                    setClientState(prev => ({
                                        ...prev,
                                        pagination : {
                                            ...prev.pagination,
                                            page: 1,
                                            limit : Number(e.target.value)
                                        }
                                        
                                    }))
                                }
                            }
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>

                    <button 
                        className="rounded-lg border hover:cursor-pointer px-2"
                        type="button"
                        // because Previous button when change we need to call api, just use appliedFilter
                        disabled={clientState.pagination.page <= 1}
                        onClick={() => setClientState(prev => ({
                            ...prev,
                            pagination: {
                                ...prev.pagination,
                                page : prev.pagination.page - 1
                            }
                        }))}
                    >
                        Previous
                    </button>

                    <Pagination
                        lastPage={serverState.pagination.lastPage}
                        // because Previous button when change we need to call api, just use appliedFilter
                        currentPage={clientState.pagination.page}
                        onPageChange={(currentPage) => {
                            setClientState(prev => ({
                                ...prev,
                                pagination : {
                                    ...prev.pagination,
                                    page : currentPage
                                }
                            }))
                        }}
                    />

                    <button
                        className="rounded-lg border hover:cursor-pointer px-2"
                        type="button"
                        // because Previous button when change we need to call api, just use appliedFilter
                        disabled={clientState.pagination.page >= serverState.pagination.lastPage }
                        onClick={() => setClientState(prev => ({
                            ...prev,
                            pagination : {
                                ...prev.pagination,
                                page: prev.pagination.page + 1
                            }
                        }))}
                    >
                        Next
                    </button>

                </div>


                { renderStatus() }


            </div>

            <ResultHistory
                clientState={clientState}
                serverState={serverState}
            />

        </main>
    )
} 