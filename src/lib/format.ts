export function formatPrice(price?: number | string | null): string {
  if (price === undefined || price === null) {
    return "0 دج";
  }

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    return "0 دج";
  }

  return numericPrice.toLocaleString("ar-DZ") + " دج";
}
