"use client"

import { useApi } from "@/hooks/useApi";
import React, { useState } from "react";

import { PredictionResult } from "@/types/prediction";
import ChartPrediction from "@/components/prediction/chartPrediction";

export default function Prediction() {

    const { post } = useApi();

    const [predictionResult, setPredictionResult] = useState<PredictionResult[]>([])

    const [predictionFormValue, setPredictionFormValue] = useState({
        n_years: '',
        initial_amount: ''
    })

    // independent from isLoading in useAuth() , this will make sure that local use after send api
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isError, setIsError] = useState<boolean>(false)

    const PredictionFormValueChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPredictionFormValue(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const PredictionFormSubmit = async ( e : React.FormEvent<HTMLFormElement> ) => {

        e.preventDefault()
        setIsLoading(true)
        setIsError(false)

        // if this form error , so UI will be Loading forever !
        try {
            const n_years = predictionFormValue.n_years
            const initial_amount = predictionFormValue.initial_amount

            const body = {n_years, initial_amount}
            const prediction = await post('/api/predictions/create', body)

            const data = prediction.data.predictions;

            setPredictionResult(data)

            // will toast here
        
        } 
        catch (error) {
            // prediction === undefined for some reason in await fetch
            // will toast here
            setIsError(true)
            console.log('prediction have an error', error);
        }
        finally {
           setIsLoading(false) 
        }
    }

    // for render in ui logic
    const renderStatus = () => {
        if (isLoading) {
            return <p>Loading...</p>
        }
        else if (isError) {
            return <p>Prediction failed. Please try again later</p>
        }
        else if (predictionResult.length > 0) {
            return <p>Prediction Successfully!</p>
        }
        else {
            return <p>Ready to prediction</p>
        }

    }

    const renderPredictionResult = () => {
        if (predictionResult.length <= 0) { return null }

        return (
            <div className="flex flex-col p-6 gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between border-b-2 border-dashed border-black/60">
                        <div className="">Amount</div>
                        <div className="">Inflation Rate</div>
                        <div className=""> Year</div>
                    </div>
                    { predictionResult.map( item  => (
                        <div key={item.year} className="flex justify-between">
                            <p>{item.amount}</p>
                            <p>{((item.inflation_rate) * 100 ).toFixed(2)} %</p>
                            <p>{item.year}</p>
                        </div>
                    ))}

                    {/* ChartPrediction component */}
                    <ChartPrediction 
                        predictionResult={predictionResult} 
                    />
                </div>
            </div>
        )
    }


    return(
        <main className="min-h-screen bg-white text-black">
            <form onSubmit={PredictionFormSubmit} className="p-4 space-y-2">
                <div className="gap-2 flex">
                    <label htmlFor="">Enter Year Here : (1 - 150) years</label>
                    <input 
                        type="number" 
                        name="n_years" 
                        value={predictionFormValue.n_years}
                        onChange={PredictionFormValueChange}
                        id="n_years" 
                        className="border"
                        required
                        min={1}
                        max={150}
                    />
                </div>
                <div className="gap-2 flex">
                    <label htmlFor="">Enter Initial Amount</label>
                    <input 
                        type="number" 
                        name="initial_amount"
                        value={predictionFormValue.initial_amount}
                        onChange={PredictionFormValueChange} 
                        id="initial_amount" 
                        className="border" 
                        required
                        min={1}
                    />

                </div>

                <button type="submit" className="border rounded-md">Get Preduction</button>
                { renderStatus() }

            </form>
            { renderPredictionResult()}   
                     
        </main>
    );
}