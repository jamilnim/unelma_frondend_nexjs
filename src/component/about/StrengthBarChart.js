"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import styles from "./StrengthBarChart.module.css";

export default function StrengthBarChart({ data }) {
  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer>
        <BarChart
          className={styles.barChart}
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="label" width={150} />
          <Tooltip />
          <Bar
            dataKey="percentage"
            radius={[10, 10, 10, 10]}
            background={{ fill: "#eee" }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className={
                  index % 2 === 0 ? styles.barBlue : styles.barLightBlue
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
