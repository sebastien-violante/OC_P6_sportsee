import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useState } from 'react';

export default function GraphChart({data}) {
    const hasMin = data[0]?.min !== undefined;
    const hasMax = data[0]?.max !== undefined;
    const hasAvg = data[0]?.avg !== undefined;
    const hasDist = data[0]?.distance !== undefined;
    
    const [hovered, setHovered] = useState(false);

    console.log(data)
    return (
        <ResponsiveContainer height="100%" width="100%">
            <ComposedChart
                data={data}
                margin={{
                    top: 20,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis 
                dataKey="name" 
                scale="band"
                tickMargin={22}
                tick={{ fontSize: 12, fill: "#707070" }} 
            />
            {hasAvg && <YAxis type="number" domain={[130, 'auto']} tick={{ fontSize: 10, fill: "#707070" }} tickMargin={9} tickLine={false} />}
            {!hasAvg && <YAxis tick={{ fontSize: 10, fill: "#707070" }} tickMargin={9} tickLine={false} />}
            <Tooltip />
            <Legend 
                verticalAlign="bottom"
                wrapperStyle={{ bottom: -16 , paddingLeft: 40}} 
                iconType="circle"
                iconSize={8}
            />
            {hasDist && <Bar 
                dataKey="distance" 
                name="Km"
                fill= {hovered ? '#0B23F4' : '#B6BDFC'} 
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
            {hasAvg && <Line 
                type="monotone" 
                dataKey="avg" 
                stroke={hovered ? '#0B23F4' : '#B6BDFC'} 
                strokeWidth={2}
                connectNulls
            />}
        </ComposedChart>
        </ResponsiveContainer>
    )

    
}