/** Format a whole-rupee amount as an Indian-locale currency string, e.g. ₹16,999. Returns "—" for null (no listed price). */
export function formatINR(amount: number | null): string {
  if (amount === null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Percentage discount between an original and discounted price, rounded down. 0 when original is null/unknown. */
export function discountPercent(original: number | null, discounted: number): number {
  if (original === null || original <= 0) return 0;
  return Math.floor(((original - discounted) / original) * 100);
}
