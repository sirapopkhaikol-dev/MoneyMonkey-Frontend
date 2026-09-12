
import { server_State } from '@/types/prediction'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type ChartPredictionProps = {
    predictionResult: server_State['predictionResult']
}


export default function ChartPrediction({
    predictionResult,
}: ChartPredictionProps) {

    return (
        <div className="h-80 min-w-140 w-full">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <LineChart
                    data={predictionResult}
                    margin={{
                        top: 10,
                        right: 20,
                        bottom: 10,
                        left: 10,
                    }}
                >

                    <CartesianGrid
                        stroke="rgba(0,0,0,0.08)"
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="year"
                        tick={{
                            fontSize: 12,
                        }}
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tick={{
                            fontSize: 12,
                        }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                            `฿${Number(value).toLocaleString()}`
                        }
                        width={75}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `฿${Number(value).toLocaleString()}`,
                            "Future value",
                        ]}
                        labelFormatter={(label) =>
                            `Year ${label}`
                        }
                    />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#FEB729"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{
                            r: 5,
                        }}
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}