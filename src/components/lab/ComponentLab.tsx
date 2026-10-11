"use client";

import { useState } from "react";
import { Button, Dialog, Tooltip } from "@/components/ui";
import { currencies, date, locales, money, number, percent, type Currency, type Locale } from "@/lib/format";
import Ledger from "./Ledger";
import TransactionEntry from "./TransactionEntry";
import { initialTransactions, type Transaction } from "./transactions";

export default function ComponentLab() {
  const [locale, setLocale] = useState<Locale>("en-SG");
  const [currency, setCurrency] = useState<Currency>("SGD");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const examples = [
    { label: "Money", baseline: money(12345.67), selected: money(12345.67, locale, currency) },
    { label: "Date (UTC)", baseline: date("2026-06-15T00:00:00Z"), selected: date("2026-06-15T00:00:00Z", locale) },
    { label: "Number", baseline: number(12345.67), selected: number(12345.67, locale) },
    { label: "Percent", baseline: percent(0.1265), selected: percent(0.1265, locale) },
  ];
  return <main className="shell py-12">
    <header className="page-heading">
      <p className="eyebrow">Interactive playground / Component Lab</p>
      <h1>Small details. Complete workflows.</h1>
      <p className="muted">Explore formatting, accessible inputs, batch validation, and resilient UI states in one fictional transaction workspace.</p>
    </header>
    <div className="demo-banner mb-8">
      Newly created portfolio demo — not a production product or evidence of professional KYC or bulk-processing work.
      Entries live in browser memory and reset on refresh. No API, uploads, payments, or persistence.
    </div>
    <section className="panel lab-section" aria-labelledby="format-title">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div><p className="eyebrow">01 / Set the context</p><h2 id="format-title">Same values, different presentation</h2></div>
        <Tooltip label="Formatting changes separators, symbols, and date presentation. It never converts an amount.">ⓘ Formatting help</Tooltip>
      </div>
      <p className="muted my-4 text-sm">Locale and currency are independent. This is formatting only, NOT FX conversion: the numeric amount stays unchanged.</p>
      <div className="demo-toolbar">
        <label className="field" htmlFor="lab-locale">Display locale
          <select id="lab-locale" value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
            {locales.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="field" htmlFor="lab-currency">Display currency
          <select id="lab-currency" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>
            {currencies.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <Button variant="secondary" onClick={() => { setLocale("en-SG"); setCurrency("SGD"); }}>Reset formatting</Button>
      </div>
      <div className="table-scroll">
        <table>
          <caption className="text-left muted text-sm pb-3">Fixed sample: 12345.67 · June 15, 2026 · 12.65%</caption>
          <thead><tr><th scope="col">Format</th><th scope="col">Baseline · en-SG / SGD</th><th scope="col">Selected · {locale} / {currency}</th></tr></thead>
          <tbody>{examples.map((example) => <tr key={example.label}>
            <th scope="row">{example.label}</th><td>{example.baseline}</td><td data-testid={`formatted-${example.label.split(" ")[0].toLowerCase()}`}>{example.selected}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="sr-only" role="status">Formatting selected: {locale}, {currency}.</p>
    </section>
    <TransactionEntry transactions={transactions} locale={locale} currency={currency}
      onAdd={(rows) => setTransactions((current) => [...current, ...rows])} />
    <Ledger transactions={transactions} locale={locale} currency={currency} />
    <section className="panel lab-section" aria-labelledby="actions-title">
      <p className="eyebrow">04 / Safe actions</p>
      <h2 id="actions-title">A clear end to the workflow</h2>
      <p className="muted">Inspect the session summary in a native modal. Export is deliberately unavailable; nothing leaves this playground.</p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setDialogOpen(true)}>Review demo session</Button>
        <Button variant="secondary" onClick={() => setDialogOpen(true)}>About this demo</Button>
        <Button disabled aria-describedby="export-help">Export unavailable</Button>
      </div>
      <p id="export-help" className="muted text-sm mt-3">No export or backend is connected.</p>
    </section>
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Demo session summary">
      <p className="muted">This newly created demonstration has {transactions.length} fictional transactions in memory. Refreshing clears your additions.</p>
      <p className="my-4">Total: {money(transactions.reduce((sum, row) => sum + row.amount, 0), locale, currency)}. Formatting only — not FX conversion.</p>
      <p className="muted text-sm">No KYC checks, bank integrations, uploads, or real transaction processing occur here. Press Escape or use the close button to return.</p>
      <Button className="mt-6" onClick={() => setDialogOpen(false)}>Back to workspace</Button>
    </Dialog>
  </main>;
}
