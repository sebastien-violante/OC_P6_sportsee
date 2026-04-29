import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

export default function Bpm ({bpm}) {
  return (
    <ComposedChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={bpm}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" scale="band" />
      <YAxis width="auto" niceTicks="snap125" />
      <Tooltip />
      <Legend />
      <Bar dataKey="min" barSize={20} fill="#FCC1B6" />
      <Bar dataKey="max" barSize={20} fill="#F4320B" />
      <Line type="monotone" dataKey="avg" stroke="#F2F3FF" />
      <RechartsDevtools />
    </ComposedChart>
  );
};