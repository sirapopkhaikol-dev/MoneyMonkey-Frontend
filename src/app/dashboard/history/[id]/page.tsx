"use client"

import { useAuth } from "@/components/contexts/authContext";
import { useApi } from "@/hooks/useApi";
import { server_State_2 } from "@/types/history";
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";

import { format } from "date-fns"
import ChartPrediction from "@/components/prediction/chartPrediction";

export default function ResultHistory () {

    const params = useParams();
    const id = params.id;
    
    const { isLoading } = useAuth();
    const { get } = useApi();

    const [clientState, setClientState] = useState({
        resultHistoryLoading: false,
        isError: false
    })

    const [serverState, setServerState] = useState<server_State_2>({
        predictions : {
            created_at : '',
            initial_amount : 0,
            n_years : 0,
            prediction_id : 0,
            results : []
        },
        rowCount : 0
    })

    const requestId = useRef(0)

    useEffect(() => {

        if (isLoading) return;

        const controller = new AbortController()

        // Create a unique ID for THIS request
        requestId.current += 1;
        const currentRequestId = requestId.current

        const fetchResultHistory = async() => {
            try {
                setClientState(prev =>({
                    ...prev,
                    isError: false,
                    resultHistoryLoading: true
                }))
                
                const res = await get(
                    `/api/predictions/find/resultHistory/${id}`,
                    controller.signal
                )

                if (!res) { return; }

                // Only the latest request can update the data
                if (currentRequestId !== requestId.current) { return; }
                
                const predictions = res.data.predictions;
                const rowCount = res.data.rowCount;

                setServerState(() => ({
                    predictions : predictions,
                    rowCount: rowCount
                }))

            } 
            catch (error) {
                // Ignore errors from old requests
                if (currentRequestId !== requestId.current) return;

                setClientState(prev =>({
                    ...prev,
                    isError: true,
                }))
                console.log('error ->>>>',error);
            }
            finally {
                // Only the latest request can turn loading OFF
                if (currentRequestId !== requestId.current) return;
                
                setClientState(prev =>({
                    ...prev,
                    resultHistoryLoading: false
                }))
            }
        }

        fetchResultHistory();

        return () => {
            controller.abort()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading, id])

    // ---------------------

    // for render in ui
    const renderStatus = () => {
        if (clientState.resultHistoryLoading || isLoading) { 
            return <p>Loading...</p>
            
        }
        if (clientState.isError) {
            return <p>Get Predictions Data Fail !. Please try again later.</p>
        }
        if (serverState.predictions.results.length > 0) {
            return <p>Get Data Successfully !</p>
        }
        return <p>No data found.</p>
    }

    const renderResHistoryResult = () => {

        if (serverState.predictions.results.length <= 0) return null

        return (
            <div className="flex flex-col gap-2">
                <p className="">Initial Amount : {serverState.predictions.initial_amount}</p>
                <p className="">Total Years : {serverState.predictions.n_years}</p>
                <p className="">Create At : { format(serverState.predictions.created_at, "PPpp") }</p>
                <p className="text-end">Total Rows : {serverState.rowCount}</p>
                <div className="flex justify-between border-b-2 border-dashed border-black/60">
                    <div className="">Amount</div>
                    <div className="">Inflation Rate</div>
                    <div className="">Year</div>
                </div>
                { serverState.predictions.results.map( item  => (
                    <div
                        key={item.year} 
                        className="flex justify-between"
                    >
                        <p>{item.amount}</p>
                        <p>{(item.inflation_rate * 100).toFixed(2)}%</p>
                        <p>{item.year}</p>
                    </div>
                ))}
                <ChartPrediction  predictionResult={serverState.predictions.results}/>
            </div>
        )
    }

    return(
        <main className="min-h-screen bg-white text-black">
            <div className="p-6 gap-4">
                { renderStatus() }
                { renderResHistoryResult() }
            </div>
        </main>
    )
}