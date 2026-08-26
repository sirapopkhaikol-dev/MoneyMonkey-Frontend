
import { PredictionResult } from '@/types/prediction'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis} from 'recharts'

type ChartPredictionProps = {
    predictionResult: PredictionResult[]
}


export default function ChartPrediction( { predictionResult } : ChartPredictionProps ) {
    return(
        <LineChart 
            style={ { width: '100%', aspectRatio: 1.618, maxWidth: 600,} }
            margin={ { top: 20 , right: 20, bottom: 5, left: 0} }
            responsive
            data={predictionResult}
        >
            <Line 
                dataKey='amount' type='monotone' stroke="black" strokeWidth={2} name="Amount Prediction" 
            />
            <YAxis 
                width='auto' 
                label={ { value: 'amount', position: 'insideLeft', angle: -90 } }
                domain={['auto', 'auto']}
            />

            <XAxis dataKey='year' />
            <Legend align="right"/>
            <CartesianGrid stroke="#aaa" strokeDasharray='5 5'/>

        </LineChart>
    )
}