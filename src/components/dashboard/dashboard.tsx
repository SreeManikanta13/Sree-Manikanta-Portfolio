"use client";

import { useState } from "react";
import {
  AS_OF,
  holdings,
  ranges,
  transactions,
  transactionTypes,
  type Category,
  type Holding,
  type Range,
  type TransactionType,
} from "@/data/financial";
import { Button, Dialog, EmptyState, Metric, Tooltip } from "@/components/ui";
import {
  currencies,
  date,
  locales,
  money,
  number,
  percent,
  type Currency,
  type Locale,
} from "@/lib/format";
import {
  filterHoldings,
  getPortfolioSummary,
  getRangePerformance,
  holdingCost,
  holdingReturn,
  holdingValue,
  type HoldingSort,
} from "@/lib/portfolio";
import Charts from "./charts";

const PAGE_SIZE = 5;

export default function Dashboard() {
  const [range, setRange] = useState<Range>("1Y");
  const [locale, setLocale] = useState<Locale>("en-SG");
  const [currency, setCurrency] = useState<Currency>("SGD");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [sort, setSort] = useState<HoldingSort>("value-desc");
  const [selected, setSelected] = useState<Holding | null>(null);
  const [transactionType, setTransactionType] = useState<
    TransactionType | "All"
  >("All");
  const [page, setPage] = useState(1);
  const portfolio = getPortfolioSummary();
  const performance = getRangePerformance(range);
  const visibleHoldings = filterHoldings(query, category, sort);
  const matchingTransactions = transactions.filter(
    (item) => transactionType === "All" || item.type === transactionType,
  );
  const pageCount = Math.max(
    1,
    Math.ceil(matchingTransactions.length / PAGE_SIZE),
  );
  const visibleTransactions = matchingTransactions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const cash = holdings.find((item) => item.category === "Cash")!;
  const formatMoney = (value: number) => money(value, locale, currency);
  const signedMoney = (value: number) =>
    `${value > 0 ? "+" : ""}${formatMoney(value)}`;
  const resetHoldings = () => {
    setQuery("");
    setCategory("All");
    setSort("value-desc");
  };

  return (
    <div className="shell pb-20">
      <header className="page-heading">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">Interactive product demo / 01</p>
          <span className="rounded-full border border-[#38564a] px-3 py-1 text-xs accent">
            Static fictional snapshot
          </span>
        </div>
        <h1>
          Your portfolio,
          <br />
          <span className="accent">in perspective.</span>
        </h1>
        <p className="muted">
          A quieter view of the numbers. Explore a fictional basket, inspect the
          details, and see how every figure connects.
        </p>
      </header>
      <div className="demo-banner">
        <strong>Fictional data only.</strong> All names, identifiers and figures
        are invented. As of {date(AS_OF, locale)}; not live market data,
        investment advice or a recommendation.
      </div>
      <div className="demo-toolbar">
        <div>
          <p className="eyebrow mb-2">Snapshot overview</p>
          <p className="text-sm">
            September 2026{" "}
            <span className="muted">/ {holdings.length} holdings</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="field">
            Locale
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
            >
              {locales.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Display currency
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as Currency)}
            >
              {currencies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <p className="muted mb-6 text-xs">
        Locale and currency change nominal formatting only. Numbers are not
        converted using exchange rates.
      </p>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Performance range</span>
          <Tooltip label="Period gains compare the first and last fixed-basket values in your selected range. They are not cost-basis gains.">
            ⓘ<span className="sr-only">About period gains</span>
          </Tooltip>
        </div>
        <div className="segmented" role="group" aria-label="Performance range">
          {ranges.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={range === item}
              onClick={() => setRange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="metric-grid" aria-live="polite" aria-atomic="true">
        <Metric
          label="Portfolio value"
          value={
            <span data-testid="portfolio-value">
              {formatMoney(portfolio.value)}
            </span>
          }
          detail={`Fixed snapshot · ${date(AS_OF, locale)}`}
        />
        <Metric
          label={`${range} value change`}
          value={
            <span className="accent" data-testid="period-gain">
              {signedMoney(performance.gain)}
            </span>
          }
          detail={`${percent(performance.returnRate, locale)} · price-only basket return`}
        />
        <Metric
          label={`${range} opening value`}
          value={
            <span data-testid="opening-value">
              {formatMoney(performance.startValue)}
            </span>
          }
          detail={date(performance.points[0].date, locale)}
        />
        <Metric
          label="Cash reserve"
          value={formatMoney(holdingValue(cash))}
          detail={`${percent(holdingValue(cash) / portfolio.value, locale)} of total · no modeled interest`}
        />
      </div>
      <Charts locale={locale} currency={currency} range={range} />

      <section
        className="panel table-panel mb-6"
        aria-labelledby="holdings-title"
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Inside the basket</p>
            <h2 id="holdings-title">Holdings</h2>
          </div>
          <span className="muted text-xs">
            Select a name to inspect its position
          </span>
        </div>
        <div className="demo-toolbar">
          <label className="field grow">
            Search holdings
            <input
              type="search"
              placeholder="Name or fictional identifier…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="field">
            Asset category
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as Category | "All")
              }
            >
              <option value="All">All categories</option>
              {(["Equities", "Bonds", "Cash"] as const).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Sort holdings
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as HoldingSort)}
            >
              <option value="value-desc">Value: high to low</option>
              <option value="value-asc">Value: low to high</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="return-desc">Return: high to low</option>
              <option value="return-asc">Return: low to high</option>
            </select>
          </label>
        </div>
        <p className="muted text-xs mb-2" role="status">
          {visibleHoldings.length} of {holdings.length} holdings · visible value{" "}
          {formatMoney(getPortfolioSummary(visibleHoldings).value)}. Filters do
          not change the portfolio totals.
        </p>
        {visibleHoldings.length === 0 ? (
          <EmptyState title="No holdings match your filters">
            <span className="block mb-4">
              Try a different name or asset category.
            </span>
            <Button variant="secondary" onClick={resetHoldings}>
              Reset holdings filters
            </Button>
          </EmptyState>
        ) : (
          <div className="table-scroll">
            <table data-testid="holdings-table">
              <caption>
                Snapshot positions. Return is the price change against each
                holding’s cost basis, not the selected chart period.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Holding</th>
                  <th scope="col">Category</th>
                  <th scope="col">Units</th>
                  <th scope="col">Unit price</th>
                  <th scope="col">Value</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Cost-basis return</th>
                </tr>
              </thead>
              <tbody>
                {visibleHoldings.map((holding) => (
                  <tr key={holding.id}>
                    <th scope="row">
                      <button
                        className="holding-link text-left"
                        onClick={() => setSelected(holding)}
                      >
                        <span
                          className="mr-3 inline-block h-2 w-2 rounded-full"
                          style={{ background: holding.color }}
                          aria-hidden="true"
                        />
                        {holding.name}
                        <span className="muted block pl-5 mt-1 text-xs">
                          {holding.symbol}
                        </span>
                      </button>
                    </th>
                    <td>{holding.category}</td>
                    <td>{number(holding.units, locale)}</td>
                    <td>{formatMoney(holding.price)}</td>
                    <td>{formatMoney(holdingValue(holding))}</td>
                    <td>
                      {percent(holdingValue(holding) / portfolio.value, locale)}
                    </td>
                    <td
                      className={
                        holdingReturn(holding) < 0 ? "text-[#f3ada6]" : "accent"
                      }
                    >
                      {holdingReturn(holding) > 0 ? "+" : ""}
                      {percent(holdingReturn(holding), locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-5 flex flex-wrap justify-between gap-3 border-t border-[#2c383e] pt-5 text-xs">
          <span className="muted">
            Entire basket cost basis: {formatMoney(portfolio.cost)}
          </span>
          <span>
            Unrealized cost-basis gain:{" "}
            <span className="accent">
              {signedMoney(portfolio.gain)} (
              {percent(portfolio.returnRate, locale)})
            </span>
          </span>
        </div>
      </section>

      <section className="panel table-panel" aria-labelledby="activity-title">
        <div className="demo-toolbar">
          <div>
            <p className="eyebrow mb-2">The paper trail</p>
            <h2 id="activity-title">Recent activity</h2>
          </div>
          <label className="field">
            Transaction type
            <select
              value={transactionType}
              onChange={(event) => {
                setTransactionType(
                  event.target.value as TransactionType | "All",
                );
                setPage(1);
              }}
            >
              <option value="All">All activity</option>
              {transactionTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="muted text-xs">
          Selected fictional activity, not a full ledger. This sample does not
          drive the fixed-basket chart. Buys are outflows; sells and dividends
          are inflows. No fees modeled.
        </p>
        <div className="table-scroll">
          <table data-testid="transactions-table">
            <caption>
              {matchingTransactions.length} matching transactions · newest first
            </caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Reference</th>
                <th scope="col">Holding</th>
                <th scope="col">Type</th>
                <th scope="col">Units</th>
                <th scope="col">Unit price</th>
                <th scope="col">Cash movement</th>
              </tr>
            </thead>
            <tbody>
              {visibleTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{date(transaction.date, locale)}</td>
                  <th scope="row">{transaction.id}</th>
                  <td>
                    {
                      holdings.find(
                        (holding) => holding.id === transaction.holdingId,
                      )!.name
                    }
                  </td>
                  <td>
                    <span className="rounded-full border border-[#3b4c54] px-2 py-1 text-xs">
                      {transaction.type}
                    </span>
                  </td>
                  <td>
                    {transaction.units === null
                      ? "—"
                      : number(transaction.units, locale)}
                  </td>
                  <td>
                    {transaction.price === null
                      ? "—"
                      : formatMoney(transaction.price)}
                  </td>
                  <td className={transaction.amount > 0 ? "accent" : ""}>
                    {signedMoney(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav
          className="mt-5 flex flex-wrap items-center justify-between gap-4"
          aria-label="Transaction pagination"
        >
          <p className="muted text-xs" role="status">
            Page {page} of {pageCount} · showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, matchingTransactions.length)} of{" "}
            {matchingTransactions.length}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              disabled={page === pageCount}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </nav>
      </section>
      <p className="muted mt-6 text-xs">
        A product interaction study. Original fictional data · fixed snapshot ·
        no account connection.
      </p>
      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? "Holding details"}
      >
        {selected && (
          <>
            <p className="eyebrow mb-3">
              {selected.symbol} / {selected.category}
            </p>
            <p className="muted">{selected.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="muted mb-1">Position value</dt>
                <dd>{formatMoney(holdingValue(selected))}</dd>
              </div>
              <div>
                <dt className="muted mb-1">Portfolio weight</dt>
                <dd>
                  {percent(holdingValue(selected) / portfolio.value, locale)}
                </dd>
              </div>
              <div>
                <dt className="muted mb-1">Units held</dt>
                <dd>{number(selected.units, locale)}</dd>
              </div>
              <div>
                <dt className="muted mb-1">Snapshot unit price</dt>
                <dd>{formatMoney(selected.price)}</dd>
              </div>
              <div>
                <dt className="muted mb-1">Total cost basis</dt>
                <dd>{formatMoney(holdingCost(selected))}</dd>
              </div>
              <div>
                <dt className="muted mb-1">Unrealized gain / loss</dt>
                <dd>
                  {signedMoney(holdingValue(selected) - holdingCost(selected))}{" "}
                  ({percent(holdingReturn(selected), locale)})
                </dd>
              </div>
            </dl>
            <p className="muted mt-6 text-xs">
              As of {date(AS_OF, locale)}. Nominal {currency}; no exchange
              conversion. Cost-basis figures are independent of the selected
              chart range.
            </p>
            <div className="mt-6">
              <Button variant="secondary" onClick={() => setSelected(null)}>
                Back to holdings
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </div>
  );
}
