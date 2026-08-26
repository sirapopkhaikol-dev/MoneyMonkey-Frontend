"use client"

import { useAuth } from "@/components/contexts/authContext";
import { useApi } from "@/hooks/useApi";
import { IdHistoryResult } from "@/types/history";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

import { format } from "date-fns"
import ChartPrediction from "@/components/prediction/chartPrediction";

export default function ResultHistory () {

    const params = useParams();
    const id = params.id;
    
    const { isLoading } = useAuth();
    const { get } = useApi();

    const [resultHistoryLoading, setResultHistoryLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [resultHistoryResult, setResultHistoryResult] = useState<IdHistoryResult>({
        predictions : {
            created_at : '',
            initial_amount : 0,
            n_years : 0,
            prediction_id : 0,
            results : []
        },
        rowCount : 0
        
    })

    useEffect(() => {

        if (isLoading) return;

        const fetchResultHistory = async() => {
            try {
                setIsError(false)
                setResultHistoryLoading(true)
                
                const res = await get(`/api/predictions/find/resultHistory/${id}`)
                
                const predictions = res.data.predictions;
                const rowCount = res.data.rowCount;

                setResultHistoryResult(prev => ({
                    ...prev,
                    predictions : {
                        created_at : predictions.created_at,
                        initial_amount : predictions.initial_amount,
                        n_years : predictions.n_years,
                        prediction_id : predictions.prediction_id,
                        results : predictions.results
                    },
                    rowCount: rowCount
                }))

            } 
            catch (error) {
                setIsError(true)
                console.log('error ->>>>',error);
            }
            finally {
                setResultHistoryLoading(false)
            }
        }

        fetchResultHistory();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading, id])

    // ---------------------

    // for render in ui
    const renderStatus = () => {
        if (resultHistoryLoading || isLoading) { 
            return <p>Loading...</p>
            
        }
        else if (isError) {
            return <p>Get Predictions Data Fail !. Please try again later.</p>
        }
        else if (resultHistoryResult.predictions.results.length > 0) {
            return <p>Get Data Successfully !</p>
        }
        else {
            return <p>No data found</p>
        }
    }

    const renderResHistoryResult = () => {

        if (resultHistoryResult.predictions.results.length <= 0) return null

        return (
            <div className="flex flex-col gap-2">
                <p className="">Initial Amount : {resultHistoryResult.predictions.initial_amount}</p>
                <p className="">Total Years : {resultHistoryResult.predictions.n_years}</p>
                <p className="">Create At : { format(resultHistoryResult.predictions.created_at, "PPpp") }</p>
                <p className="text-end">Total Rows : {resultHistoryResult.rowCount}</p>
                <div className="flex justify-between border-b-2 border-dashed border-black/60">
                    <div className="">Amount</div>
                    <div className="">Inflation Rate</div>
                    <div className="">Year</div>
                </div>
                { resultHistoryResult.predictions.results.map( item  => (
                    <div
                        key={item.year} 
                        className="flex justify-between"
                    >
                        <p>{item.amount}</p>
                        <p>{(item.inflation_rate * 100).toFixed(2)}%</p>
                        <p>{item.year}</p>
                    </div>
                ))}
                <ChartPrediction  predictionResult={resultHistoryResult.predictions.results}/>
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