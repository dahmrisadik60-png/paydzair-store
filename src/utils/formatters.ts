import { Currency } from '../types/store';

export function formatPrice(priceEur: number, currency: Currency, rate: number = 240): string {
  if (currency === 'DZD') {
    const dzd = Math.round(priceEur * rate);
    return `${dzd.toLocaleString('ar-DZ')} دج`;
  }
  return `${priceEur.toFixed(2)} €`;
}

export function convertToDzd(priceEur: number, rate: number = 240): number {
  return Math.round(priceEur * rate);
}

export function generateOrderId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `DZ-${randomNum}`;
}

export function formatDate(timestamp: number | string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
