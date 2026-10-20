export type Currency = 'EUR' | 'DZD';

export interface Game {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  tag: string;
  idLabel: string;
  idPlaceholder: string;
}

export interface Package {
  id: number;
  gameId: string;
  name: string;
  price: number; // in EUR
  coinsAmount?: string;
  popular?: boolean;
  bonus?: string;
}

export interface GiftCard {
  id: number;
  name: string;
  category: string;
  price: number; // in EUR
  desc: string;
  image?: string;
  region?: string;
  instantDelivery?: boolean;
}

export interface Subscription {
  id: number;
  name: string;
  category: string;
  price: number; // in EUR
  period: string;
  desc: string;
  features?: string[];
  instantDelivery?: boolean;
}

export interface GamingAccount {
  id: number;
  name: string;
  gameId: string;
  price: number; // in EUR
  desc: string;
  level?: string;
  specs: string[];
  images?: string[];
  status: 'available' | 'sold';
}

export interface Order {
  id: string;
  title: string;
  category: 'game' | 'card' | 'subscription' | 'account' | 'balance_topup';
  targetId: string; // Player ID, account email, etc.
  priceEur: number;
  priceDzd: number;
  paymentMethod: 'wallet' | 'baridimob' | 'paysera' | 'binance';
  status: 'completed' | 'processing' | 'pending';
  date: string;
  transactionRef?: string;
}

export interface StoreSettings {
  storePhone: string;
  storeEmail: string;
  whatsappNumber: string;
  baridiMobRip: string;
  baridiMobAccountName: string;
  ccpNumber: string;
  payseraEmail: string;
  eurToDzdRate: number; // e.g. 240
  announcementText: string;
  showAnnouncement: boolean;
}
