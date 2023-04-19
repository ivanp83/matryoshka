export function currencyFormat(num: number) {
  const value = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
  return value;
}
