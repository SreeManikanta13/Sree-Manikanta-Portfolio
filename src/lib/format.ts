export const locales = ["en-SG", "en-US", "de-DE", "ja-JP"] as const;
export const currencies = ["SGD", "USD", "EUR", "JPY"] as const;
export type Locale = (typeof locales)[number];
export type Currency = (typeof currencies)[number];

export function money(
  value: number,
  locale: string = "en-SG",
  currency: string = "SGD",
) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value,
  );
}
export function percent(value: number, locale: string = "en-SG") {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(value);
}
export function number(value: number, locale: string = "en-SG") {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(
    value,
  );
}
export function date(value: string, locale: string = "en-SG") {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}
