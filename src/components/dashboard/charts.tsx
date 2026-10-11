"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { date, money, percent, type Currency, type Locale } from "@/lib/format";
import { getAllocation, getRangePerformance } from "@/lib/portfolio";
import type { Range } from "@/data/financial";

type Props = { locale: Locale; currency: Currency; range: Range };
const tooltipStyle = {
  background: "#152027",
  border: "1px solid #53645b",
  borderRadius: 8,
  color: "#edf4ee",
};

export default function Charts({ locale, currency, range }: Props) {
  const performance = getRangePerformance(range);
  const allocation = getAllocation();
  const formatMoney = (value: number) => money(value, locale, currency);
  return (
    <div className="chart-grid">
      <section
        className="panel chart-panel"
        aria-labelledby="performance-title"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">The bigger picture</p>
            <h2 id="performance-title">Basket performance</h2>
          </div>
          <span className="accent text-sm">
            {percent(performance.returnRate, locale)} · {range}
          </span>
        </div>
        <p className="muted mt-3 text-xs">
          Fixed holdings, hypothetical month-end valuations. No cash flows, fees
          or dividends modeled.
        </p>
        <div
          className="chart-frame"
          role="group"
          aria-label={`Performance chart for ${range}. Exact values in the table below.`}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 600, height: 270 }}
          >
            <AreaChart
              data={performance.points}
              margin={{ top: 15, right: 12, bottom: 5, left: 5 }}
              accessibilityLayer
            >
              <defs>
                <linearGradient id="basket-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b5e7bd" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#b5e7bd" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#2c383e"
                vertical={false}
                strokeDasharray="3 5"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(value: string) =>
                  new Intl.DateTimeFormat(locale, {
                    month: "short",
                    year: "2-digit",
                    timeZone: "UTC",
                  }).format(new Date(value))
                }
                tick={{ fill: "#a7b5bd", fontSize: 11 }}
                minTickGap={25}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={["dataMin - 3000", "dataMax + 3000"]}
                tickFormatter={(value: number) =>
                  new Intl.NumberFormat(locale, { notation: "compact" }).format(
                    value,
                  )
                }
                tick={{ fill: "#a7b5bd", fontSize: 11 }}
                width={55}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelFormatter={(label) => date(String(label), locale)}
                formatter={(value) => [
                  formatMoney(Number(value)),
                  "Basket value",
                ]}
                isAnimationActive={false}
              />
              <Area
                type="linear"
                dataKey="value"
                name="Basket value"
                stroke="#b5e7bd"
                strokeWidth={2.5}
                fill="url(#basket-fill)"
                isAnimationActive={false}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="muted text-xs">
          {date(performance.points[0].date, locale)} —{" "}
          {date(performance.points.at(-1)!.date, locale)} · nominal {currency}
        </p>
        <details className="mt-5 text-sm">
          <summary className="cursor-pointer accent">
            View performance data
          </summary>
          <div className="table-scroll">
            <table>
              <caption>
                Exact chart values for {range}; ending value equals the total of
                all holdings.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Snapshot date</th>
                  <th scope="col">Basket value</th>
                </tr>
              </thead>
              <tbody>
                {performance.points.map((point) => (
                  <tr key={point.date}>
                    <th scope="row">{date(point.date, locale)}</th>
                    <td>{formatMoney(point.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>
      <section className="panel chart-panel" aria-labelledby="allocation-title">
        <p className="eyebrow mb-2">Where it sits</p>
        <h2 id="allocation-title">Asset allocation</h2>
        <p className="muted mt-3 text-xs">
          All holdings at the fixed snapshot; unaffected by table filters.
        </p>
        <div
          className="chart-frame"
          role="group"
          aria-label="Asset allocation chart. Exact values and percentages follow."
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 350, height: 270 }}
          >
            <PieChart accessibilityLayer>
              <Pie
                data={allocation}
                dataKey="value"
                nameKey="name"
                innerRadius="57%"
                outerRadius="85%"
                paddingAngle={3}
                stroke="none"
                isAnimationActive={false}
              >
                {allocation.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => formatMoney(Number(value))}
                isAnimationActive={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <table>
          <caption className="sr-only">Allocation by asset category</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Value</th>
              <th scope="col">Weight</th>
            </tr>
          </thead>
          <tbody>
            {allocation.map((item) => (
              <tr key={item.name}>
                <th scope="row">
                  <span
                    className="mr-2 inline-block h-2 w-2 rounded-full"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />
                  {item.name}
                </th>
                <td>{formatMoney(item.value)}</td>
                <td>{percent(item.share, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
