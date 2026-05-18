import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#1E2BE6", "#AAB0E8"];
const RADIAN = Math.PI / 180;

// Défini les paramètres personnalisés de rendu
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name, value, fill }) => {
  
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* point coloré */}
      <circle
        cx={x > cx ? 0 : 0}
        cy={-4}
        r={4}
        fill={fill}
      />

      {/* texte */}
      <text
        x={x > cx ? 10 : -10}
        y={0}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: 12 }}
      >
        {value} {name}
      </text>
    </g>
  );
};

/**
 * Renvoie un composant graphique Donut 
 * @param {Object} data - données utilisateur
 * @returns {JSX.Element} - composant Donut
 */
export default function DonutChart({data}) {
  return (
    <PieChart width={400} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40} 
        outerRadius={81}
        paddingAngle={0}
        dataKey="value"
        startAngle={0}
        endAngle={-360}
        cornerRadius={2.5}
        stroke={0}
        labelLine={false}
        label={renderCustomLabel}
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={COLORS[index]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
