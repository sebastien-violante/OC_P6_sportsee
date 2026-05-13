import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useState } from 'react';

export default function GraphChart({data}) {
    const hasMin = data[0]?.min !== undefined;
    const hasMax = data[0]?.max !== undefined;
    const hasAvg = data[0]?.avg !== undefined;
    const hasDist = data[0]?.distance !== undefined;
    const [hovered, setHovered] = useState(false);

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
            {hasDist && <Tooltip 
                labelFormatter={(label, payload) => {
                    return payload?.[0]?.payload?.tooltipLabel || label;
                }}
                formatter={(value) => [value ? `${value} km` : '', null]}
                contentStyle={{
                    backgroundColor: '#000',
                    borderRadius: '10px',
                }}
                labelStyle={{
                    color: '#ffffff',
                    fontWeight: 600,
                    marginBottom: '4px'
                }}
                itemStyle={{
                    color: '#FFFFFF'
                }}
            />}
            
            <Legend 
                verticalAlign="bottom"
                align="left"
                wrapperStyle={{ bottom: -20 , paddingLeft: 40, fontSize: "14px"}} 
                iconType="circle"
                iconSize={8}
            />
            {hasDist && <Bar 
                dataKey="distance" 
                name="Km"
                fill= {hovered ? '#0B23F4' : '#B6BDFC'} 
                radius={[30, 30, 30, 30]} 
                barSize={14}
                 isAnimationActive={false}

            />}
            {hasAvg && <Line 
                type="monotone" 
                dataKey="avg" 
                stroke={hovered ? '#0B23F4' : '#F2F3FF'} 
                dot={{fill: '#0B23F4', r:4}}
                strokeWidth={2}
                connectNulls
                isAnimationActive={false}

            />}
            {hasMin && <Bar 
                dataKey="min" 
                barSize={14} 
                radius={[30, 30, 30, 30]} 
                fill="#FCC1B6" 
                isAnimationActive={false}

            />}
            {hasMax && <Bar 
                dataKey="max" 
                barSize={14} 
                radius={[30, 30, 30, 30]} 
                fill="#F4320B" 
                isAnimationActive={false}

            />}
            
        </ComposedChart>
        </ResponsiveContainer>
    )

    
}