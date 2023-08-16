import React from "react";
import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ dataIn, dataKeyX, dataKeyY }) {
  return (
    <div className="chart">
      <h3 className="chartTitle">Revenue Analytic</h3>
      <ResponsiveContainer width="100%" aspect={4}>
        <LineChart data={dataIn}>
          <XAxis dataKey={dataKeyX} stroke="#5550bd" />
          <YAxis dataKey={dataKeyY} stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKeyY} stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
