"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Button, EmptyState, Metric } from "@/components/ui";
import { money, number, type Currency, type Locale } from "@/lib/format";
import { categories, type Transaction } from "./transactions";

const states = ["Data", "Loading", "Error", "Empty"] as const;
export default function Ledger({
  transactions,
  locale,
  currency,
}: {
  transactions: Transaction[];
  locale: Locale;
  currency: Currency;
}) {
  const [state, setState] = useState<(typeof states)[number]>("Data");
  const total = transactions.reduce((sum, row) => sum + row.amount, 0);
  const chartData = categories.map((category) => ({
    category,
    amount: transactions
      .filter((row) => row.category === category)
      .reduce((sum, row) => sum + row.amount, 0),
  }));

  return (
    <section className="lab-section" aria-labelledby="ledger-title">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <p className="eyebrow">03 / Inspect the result</p>
          <h2 id="ledger-title">Local demo ledger</h2>
        </div>
        <div
          role="group"
          aria-label="Preview ledger state"
          className="segmented"
        >
          {states.map((item) => (
            <button
              key={item}
              aria-pressed={state === item}
              onClick={() => setState(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="muted mb-5 text-sm">
        State previews are deliberate simulations, not API responses. Returning
        to Data keeps your local entries.
      </p>
      {state === "Loading" && (
        <div className="panel" aria-busy="true">
          <p role="status">
            Loading preview… This simulated state stays active until you choose
            Data.
          </p>
          <div aria-hidden="true" className="mt-5 h-24 rounded-lg bg-white/5" />
          <Button disabled className="mt-4">
            Loading…
          </Button>
        </div>
      )}
      {state === "Error" && (
        <div className="panel">
          <p role="alert" className="error-text">
            Simulated failure: the ledger could not be displayed. Your local
            entries are unchanged.
          </p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => setState("Data")}
          >
            Retry ledger
          </Button>
        </div>
      )}
      {state === "Empty" && (
        <div className="panel">
          <EmptyState title="No transactions in this preview">
            Add an entry in the workspace or return to your existing demo data.
          </EmptyState>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => setState("Data")}
          >
            Show demo data
          </Button>
        </div>
      )}
      {state === "Data" && (
        <>
          <div
            className="metric-grid"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            }}
          >
            <Metric
              label="Demo total"
              value={money(total, locale, currency)}
              detail="Fictional values · no FX conversion"
            />
            <Metric
              label="Transactions"
              value={number(transactions.length, locale)}
              detail="Stored only in this page session"
            />
            <Metric
              label="Average amount"
              value={money(total / transactions.length, locale, currency)}
              detail="Across all local demo entries"
            />
          </div>
          <div className="lab-grid">
            <div className="panel chart-panel">
              <h3 className="font-semibold">Amount by category</h3>
              <p className="muted text-sm mt-2">
                The summary below provides the same values as the chart.
              </p>
              <div
                className="chart-frame"
                aria-hidden="true"
                style={{ minWidth: 0 }}
              >
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  initialDimension={{ width: 400, height: 270 }}
                >
                  <BarChart
                    data={chartData}
                    margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
                    accessibilityLayer={false}
                  >
                    <CartesianGrid stroke="#33443c" vertical={false} />
                    <XAxis
                      dataKey="category"
                      tick={{ fill: "#bac7bf", fontSize: 12 }}
                    />
                    <YAxis
                      width={64}
                      tick={{ fill: "#bac7bf", fontSize: 11 }}
                      tickFormatter={(value: number) => number(value, locale)}
                    />
                    <Bar
                      dataKey="amount"
                      fill="#9bddb5"
                      radius={[5, 5, 0, 0]}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <dl className="space-y-2 text-sm">
                {chartData.map((row) => (
                  <div
                    key={row.category}
                    className="flex justify-between gap-3"
                  >
                    <dt>{row.category}</dt>
                    <dd>{money(row.amount, locale, currency)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="panel table-panel min-w-0">
              <h3 className="font-semibold mb-4">Transaction details</h3>
              <div className="table-scroll">
                <table>
                  <caption className="text-left muted text-sm pb-3">
                    Fictional transactions · amounts displayed in {currency}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Reference</th>
                      <th scope="col">Category</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((row) => (
                      <tr key={row.reference}>
                        <th scope="row">{row.reference}</th>
                        <td>{row.category}</td>
                        <td className="whitespace-nowrap">
                          {money(row.amount, locale, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
