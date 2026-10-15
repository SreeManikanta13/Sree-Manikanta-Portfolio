"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui";
import { money, type Currency, type Locale } from "@/lib/format";
import {
  categories,
  parseBulk,
  sampleCsv,
  validateTransaction,
  type Transaction,
} from "./transactions";

export default function TransactionEntry({
  transactions,
  onAdd,
  locale,
  currency,
}: {
  transactions: Transaction[];
  onAdd: (rows: Transaction[]) => void;
  locale: Locale;
  currency: Currency;
}) {
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Services");
  const [errors, setErrors] = useState<ReturnType<typeof validateTransaction>>(
    {},
  );
  const [csv, setCsv] = useState(sampleCsv);
  const [bulkErrors, setBulkErrors] = useState<string[]>([]);
  const [preview, setPreview] = useState<Transaction[]>([]);
  const [notice, setNotice] = useState("");

  function selectTab(index: number) {
    setTab(index);
    tabs.current[index]?.focus();
  }

  return (
    <section className="panel lab-section" aria-labelledby="entry-title">
      <p className="eyebrow">02 / Build a batch</p>
      <h2 id="entry-title">Transaction workspace</h2>
      <p className="muted">
        Create fictional entries locally. All-or-nothing bulk validation catches
        malformed amounts and duplicate references before adding a batch.
      </p>
      <div role="tablist" aria-label="Entry method" className="segmented mb-6">
        {["Single entry", "Bulk import"].map((label, index) => (
          <button
            key={label}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            id={`entry-tab-${index}`}
            role="tab"
            aria-selected={tab === index}
            aria-controls={`entry-panel-${index}`}
            tabIndex={tab === index ? 0 : -1}
            onClick={() => setTab(index)}
            onKeyDown={(event) => {
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? 1
                    : event.key === "ArrowRight" || event.key === "ArrowLeft"
                      ? 1 - tab
                      : null;
              if (next !== null) {
                event.preventDefault();
                selectTab(next);
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        id="entry-panel-0"
        role="tabpanel"
        aria-labelledby="entry-tab-0"
        hidden={tab !== 0}
        tabIndex={0}
      >
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            const issues = validateTransaction(
              reference.trim(),
              amount.trim(),
              category,
              transactions,
            );
            setErrors(issues);
            setNotice("");
            if (Object.keys(issues).length) {
              const field = issues.reference
                ? "entry-reference"
                : issues.amount
                  ? "entry-amount"
                  : "entry-category";
              document.getElementById(field)?.focus();
              return;
            }
            onAdd([
              {
                reference: reference.trim(),
                amount: Number(amount.trim()),
                category: category as Transaction["category"],
              },
            ]);
            setNotice(
              `Added ${reference.trim()} to the local demo ledger. No transaction was sent.`,
            );
            setReference("");
            setAmount("");
            setPreview([]);
          }}
        >
          <div className="lab-grid">
            <div className="field">
              <label htmlFor="entry-reference">Reference</label>
              <input
                id="entry-reference"
                value={reference}
                placeholder="DEMO-107"
                required
                aria-invalid={!!errors.reference}
                aria-describedby="reference-help reference-error"
                onChange={(event) => setReference(event.target.value)}
              />
              <span id="reference-help">
                Unique uppercase reference, 3–24 characters.
              </span>
              <span id="reference-error" className="error-text">
                {errors.reference}
              </span>
            </div>
            <div className="field">
              <label htmlFor="entry-amount">Amount</label>
              <input
                id="entry-amount"
                value={amount}
                inputMode="decimal"
                placeholder="1250.50"
                required
                aria-invalid={!!errors.amount}
                aria-describedby="amount-help amount-error"
                onChange={(event) => setAmount(event.target.value)}
              />
              <span id="amount-help">
                Decimal point, no currency symbols or grouping separators.
              </span>
              <span id="amount-error" className="error-text">
                {errors.amount}
              </span>
            </div>
          </div>
          <div className="field mt-4">
            <label htmlFor="entry-category">Category</label>
            <select
              id="entry-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-invalid={!!errors.category}
              aria-describedby="category-error"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <span id="category-error" className="error-text">
              {errors.category}
            </span>
          </div>
          {Object.keys(errors).length > 0 && (
            <p role="alert" className="error-text mt-4">
              Entry not added. Correct the highlighted fields.
            </p>
          )}
          <Button type="submit" className="mt-5">
            Add demo transaction
          </Button>
        </form>
      </div>
      <div
        id="entry-panel-1"
        role="tabpanel"
        aria-labelledby="entry-tab-1"
        hidden={tab !== 1}
        tabIndex={0}
      >
        <label className="field" htmlFor="bulk-text">
          Batch text
          <textarea
            id="bulk-text"
            rows={7}
            value={csv}
            spellCheck={false}
            className="font-mono"
            aria-invalid={bulkErrors.length > 0}
            aria-describedby="bulk-help bulk-errors"
            onChange={(event) => {
              setCsv(event.target.value);
              setPreview([]);
              setBulkErrors([]);
              setNotice("");
            }}
          />
        </label>
        <p id="bulk-help" className="muted mt-2 text-sm">
          Header required. Up to 100 rows: reference, amount, category. Plain
          comma-separated text only, no quoted fields. The same single-entry
          validation applies.
        </p>
        <div className="flex flex-wrap gap-3 my-4">
          <Button
            variant="secondary"
            onClick={() => {
              const result = parseBulk(csv, transactions);
              setBulkErrors(result.errors);
              setPreview(result.rows);
              setNotice("");
            }}
          >
            Validate batch
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setCsv(sampleCsv);
              setPreview([]);
              setBulkErrors([]);
              setNotice("");
            }}
          >
            Load sample
          </Button>
        </div>
        <div id="bulk-errors">
          {bulkErrors.length > 0 && (
            <div role="alert" className="error-text">
              <p>Nothing added. Fix these issues and validate again:</p>
              <ul className="list-disc pl-5">
                {bulkErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {preview.length > 0 && (
          <div className="notification">
            <p role="status">
              {preview.length} valid rows · batch total{" "}
              {money(
                preview.reduce((sum, row) => sum + row.amount, 0),
                locale,
                currency,
              )}
            </p>
            <ul className="my-3 text-sm">
              {preview.map((row) => (
                <li key={row.reference}>
                  {row.reference} · {row.category} ·{" "}
                  {money(row.amount, locale, currency)}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => {
                const result = parseBulk(csv, transactions);
                if (result.errors.length) {
                  setBulkErrors(result.errors);
                  setPreview([]);
                  return;
                }
                onAdd(result.rows);
                setNotice(
                  `Added ${result.rows.length} transactions to the local demo ledger. No batch was uploaded.`,
                );
                setPreview([]);
              }}
            >
              Add validated batch
            </Button>
          </div>
        )}
      </div>
      {notice && (
        <p role="status" className="notification mt-5">
          {notice}
        </p>
      )}
    </section>
  );
}
