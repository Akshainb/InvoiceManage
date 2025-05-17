interface CurrencyProps {
  amount: number;
  currency: "USD" | "INR";
}
export function formatCurrency({ amount, currency }: CurrencyProps) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
