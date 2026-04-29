import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

export default function GraphChart({data}) {
    const hasMin = data[0]?.min !== undefined;
    const hasMax = data[0]?.max !== undefined;
    const hasAvg = data[0]?.avg !== undefined;
    const hasDist = data[0]?.distance !== undefined;
    
    return (
        <ResponsiveContainer height="100%" width="100%">
            <ComposedChart
            //style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            data={data}
            margin={{
                top: 20,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band"/>
            {hasAvg && <YAxis type="number" domain={[130, 'auto']}/>}
            {!hasAvg && <YAxis/>}
            <Tooltip />
            <Legend />
            {hasDist && <Bar 
                dataKey="distance" 
                name="Km"
                fill="#B6BDFC" 
                activeBar={{ fill: '#0B23F4' }} 
                radius={[30, 30, 30, 30]} 
                barSize={14} />}
            {hasMin && <Bar 
                dataKey="min" 
                barSize={14} 
                radius={[30, 30, 30, 30]} 
                fill="#FCC1B6" />}
            {hasMax && <Bar 
                dataKey="max" 
                barSize={14} 
                radius={[30, 30, 30, 30]} 
                fill="#F4320B" />}
            {hasAvg && <Line type="monotone" dataKey="avg" stroke="#F2F3FF" />}
        </ComposedChart>
        </ResponsiveContainer>
    )

    
}