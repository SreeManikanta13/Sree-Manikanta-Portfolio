export type Transaction = {
  reference: string;
  amount: number;
  category: "Services" | "Software" | "Travel";
};

export const categories = ["Services", "Software", "Travel"] as const;
export const sampleCsv =
  "reference,amount,category\nDEMO-104,1250.50,Services\nDEMO-105,89.90,Software\nDEMO-106,240.00,Travel";
export const initialTransactions: Transaction[] = [
  { reference: "DEMO-101", amount: 1800, category: "Services" },
  { reference: "DEMO-102", amount: 320.5, category: "Software" },
  { reference: "DEMO-103", amount: 175, category: "Travel" },
];

export function validateTransaction(
  reference: string,
  amount: string,
  category: string,
  existing: Transaction[],
) {
  const errors: { reference?: string; amount?: string; category?: string } = {};
  if (!/^[A-Z0-9][A-Z0-9-]{2,23}$/.test(reference)) {
    errors.reference =
      "Use 3–24 uppercase letters, digits, or hyphens, starting with a letter or digit.";
  } else if (existing.some((row) => row.reference === reference)) {
    errors.reference =
      "This reference already exists. Choose a unique reference.";
  }
  const numericAmount = Number(amount);
  if (
    !/^\d+(?:\.\d{1,2})?$/.test(amount) ||
    !Number.isFinite(numericAmount) ||
    numericAmount <= 0 ||
    numericAmount > 1_000_000
  ) {
    errors.amount =
      "Enter an amount above 0 and at most 1,000,000, with up to two decimal places (for example 1250.50).";
  }
  if (!categories.includes(category as Transaction["category"])) {
    errors.category = "Choose Services, Software, or Travel.";
  }
  return errors;
}

export function parseBulk(text: string, existing: Transaction[]) {
  const errors: string[] = [];
  const rows: Transaction[] = [];
  const lines = text.trim().split(/\r?\n/);
  if (lines[0]?.trim() !== "reference,amount,category") {
    return {
      rows,
      errors: ["Line 1: use the exact header reference,amount,category."],
    };
  }
  if (lines.length < 2 || lines.length > 101) {
    return {
      rows,
      errors: ["Include between 1 and 100 transaction rows after the header."],
    };
  }
  lines.slice(1).forEach((line, index) => {
    const fields = line.split(",").map((field) => field.trim());
    if (fields.length !== 3) {
      errors.push(
        `Line ${index + 2}: expected three comma-separated fields; quoted fields are not supported.`,
      );
      return;
    }
    const [reference, amount, category] = fields;
    const issues = validateTransaction(reference, amount, category, [
      ...existing,
      ...rows,
    ]);
    if (Object.keys(issues).length) {
      errors.push(`Line ${index + 2}: ${Object.values(issues).join(" ")}`);
    } else {
      rows.push({
        reference,
        amount: Number(amount),
        category: category as Transaction["category"],
      });
    }
  });
  return { rows: errors.length ? [] : rows, errors };
}
