import React, { useState, useEffect } from 'react';
import { 
  Currency, 
  Game, 
  Package, 
  GiftCard, 
  Subscription, 
  GamingAccount, 
  Order, 
  StoreSettings 
} from './types/store';
import { 
  defaultGames, 
  defaultPackages, 
  defaultGiftCards, 
  defaultSubscriptions, 
  defaultAccounts, 
  defaultSettings 
} from './data/defaultData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { GamesSection } from './components/GamesSection';
import { GiftCardsSection } from './components/GiftCardsSection';
import { SubscriptionsSection } from './components/SubscriptionsSection';
import { AccountsSection } from './components/AccountsSection';
import { PurchaseModal } from './components/PurchaseModal';
import { WalletModal } from './components/WalletModal';
import { OrdersModal } from './components/OrdersModal';
import { AdminModal } from './components/AdminModal';
import { FaqModal } from './components/FaqModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const DEFAULT_VOUCHERS: Record<string, number> = {
  'DZAIR50': 50,
  'WELCOME': 5,
  'BARIDI10': 10,
  'EFOOTBALL2025': 25,
};

export default function App() {
  // Persistence state
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('dzairpay_currency') as Currency) || 'EUR';
  });

  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('dzairpay_balance');
    return saved !== null ? parseFloat(saved) : 25.00;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('dzairpay_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('dzairpay_packages');
    return saved ? JSON.parse(saved) : defaultPackages;
  });

  const [giftCards, setGiftCards] = useState<GiftCard[]>(() => {
    const saved = localStorage.getItem('dzairpay_giftcards');
    return saved ? JSON.parse(saved) : defaultGiftCards;
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('dzairpay_subscriptions');
    return saved ? JSON.parse(saved) : defaultSubscriptions;
  });

  const [accounts, setAccounts] = useState<GamingAccount[]>(() => {
    const saved = localStorage.getItem('dzairpay_accounts');
    return saved ? JSON.parse(saved) : defaultAccounts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dzairpay_orders');
    if (saved) return JSON.parse(saved);
    // Initial sample completed order
    return [
      {
        id: 'DZ-74921',
        title: '550 كوينز (eFootball 2025)',
        category: 'game',
        targetId: '984-124-771',
        priceEur: 5.99,
        priceDzd: 1438,
        paymentMethod: 'wallet',
        status: 'completed',
        date: new Date(Date.now() - 3600000 * 2).toISOString(),
      }
    ];
  });

  const [vouchers, setVouchers] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('dzairpay_vouchers');
    return saved ? JSON.parse(saved) : DEFAULT_VOUCHERS;
  });

  // UI state
  const [selectedGameId, setSelectedGameId] = useState<string>('efootball');

  // Modals state
  const [purchaseModalItem, setPurchaseModalItem] = useState<{
    type: 'game' | 'card' | 'subscription' | 'account';
    title: string;
    priceEur: number;
    idLabel?: string;
    idPlaceholder?: string;
    bonusText?: string;
  } | null>(null);

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('dzairpay_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('dzairpay_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('dzairpay_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('dzairpay_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('dzairpay_giftcards', JSON.stringify(giftCards));
  }, [giftCards]);

  useEffect(() => {
    localStorage.setItem('dzairpay_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('dzairpay_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('dzairpay_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dzairpay_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  // Handlers
  const handleToggleCurrency = () => {
    setCurrency(prev => (prev === 'EUR' ? 'DZD' : 'EUR'));
  };

  const handleBuyPackage = (pkg: Package, game: Game) => {
    setPurchaseModalItem({
      type: 'game',
      title: `${pkg.name} - ${game.name}`,
      priceEur: pkg.price,
      idLabel: game.idLabel,
      idPlaceholder: game.idPlaceholder,
      bonusText: pkg.bonus,
    });
  };

  const handleBuyCard = (card: GiftCard) => {
    setPurchaseModalItem({
      type: 'card',
      title: `${card.name} (${card.category})`,
      priceEur: card.price,
      idLabel: 'البريد الإلكتروني أو رقم الواتساب لإرسال الكود:',
      idPlaceholder: 'أدخل بريدك الإلكتروني (مثل name@email.com)',
    });
  };

  const handleBuySubscription = (sub: Subscription) => {
    setPurchaseModalItem({
      type: 'subscription',
      title: `${sub.name} (${sub.period})`,
      priceEur: sub.price,
      idLabel: 'البريد أو رقم الهاتف لتفعيل الاشتراك:',
      idPlaceholder: 'أدخل بريدك أو رقم هاتفك',
    });
  };

  const handleBuyAccount = (acc: GamingAccount) => {
    setPurchaseModalItem({
      type: 'account',
      title: acc.name,
      priceEur: acc.price,
      idLabel: 'رقم هاتفك أو الواتساب لتسليم بيانات الحساب:',
      idPlaceholder: 'مثال: 0770123456',
    });
  };

  const handleSuccessfulPurchase = (newOrder: Order, newBalance: number) => {
    setOrders(prev => [newOrder, ...prev]);
    setBalance(newBalance);
  };

  const handleAddBalance = (amountEur: number, note: string) => {
    setBalance(prev => Number((prev + amountEur).toFixed(2)));
    // Record top-up order
    const topupOrder: Order = {
      id: `DZ-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `شحن رصيد المحفظة (+${amountEur.toFixed(2)}€)`,
      category: 'balance_topup',
      targetId: note,
      priceEur: amountEur,
      priceDzd: Math.round(amountEur * settings.eurToDzdRate),
      paymentMethod: 'wallet',
      status: 'completed',
      date: new Date().toISOString(),
    };
    setOrders(prev => [topupOrder, ...prev]);
  };

  const handleAddVoucher = (code: string, amount: number) => {
    setVouchers(prev => ({ ...prev, [code]: amount }));
  };

  const handleDeleteVoucher = (code: string) => {
    setVouchers(prev => {
      const copy = { ...prev };
      delete copy[code];
      return copy;
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#090d16] text-slate-100 selection:bg-purple-600 selection:text-white">
      
      {/* Top Header & Navbar */}
      <Header
        balance={balance}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        settings={settings}
        ordersCount={orders.length}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenWallet={() => setIsWalletModalOpen(true)}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
        onOpenFaq={() => setIsFaqModalOpen(true)}
      />

      {/* Main Page Content */}
      <div className="flex-grow">
        
        {/* Hero Banner with Suarez & Casillas cards */}
        <HeroBanner
          onExploreClick={() => {
            const el = document.getElementById('games-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onTopUpClick={() => setIsWalletModalOpen(true)}
        />

        {/* Content Container */}
        <main className="max-w-7xl mx-auto px-4 w-full">
          
          {/* Game Recharges Section */}
          <GamesSection
            games={defaultGames}
            selectedGameId={selectedGameId}
            onSelectGame={setSelectedGameId}
            packages={packages}
            currency={currency}
            eurToDzdRate={settings.eurToDzdRate}
            onBuyPackage={handleBuyPackage}
          />

          {/* Gift Cards Section */}
          <GiftCardsSection
            cards={giftCards}
            currency={currency}
            eurToDzdRate={settings.eurToDzdRate}
            onBuyCard={handleBuyCard}
          />

          {/* Subscriptions Section */}
          <SubscriptionsSection
            subscriptions={subscriptions}
            currency={currency}
            eurToDzdRate={settings.eurToDzdRate}
            onBuySubscription={handleBuySubscription}
          />

          {/* Ready Accounts Market */}
          <AccountsSection
            accounts={accounts}
            currency={currency}
            eurToDzdRate={settings.eurToDzdRate}
            whatsappNumber={settings.whatsappNumber}
            onBuyAccount={handleBuyAccount}
          />

        </main>
      </div>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenFaq={() => setIsFaqModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />

      {/* Modals */}
      <PurchaseModal
        item={purchaseModalItem}
        isOpen={Boolean(purchaseModalItem)}
        onClose={() => setPurchaseModalItem(null)}
        userBalance={balance}
        currency={currency}
        settings={settings}
        onSuccessfulPurchase={handleSuccessfulPurchase}
        onOpenWallet={() => {
          setPurchaseModalItem(null);
          setIsWalletModalOpen(true);
        }}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        balance={balance}
        currency={currency}
        settings={settings}
        onAddBalance={handleAddBalance}
        activeVouchers={vouchers}
      />

      <OrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        orders={orders}
        currency={currency}
        settings={settings}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        games={defaultGames}
        packages={packages}
        giftCards={giftCards}
        subscriptions={subscriptions}
        accounts={accounts}
        orders={orders}
        settings={settings}
        currency={currency}
        onUpdatePackages={setPackages}
        onUpdateGiftCards={setGiftCards}
        onUpdateSubscriptions={setSubscriptions}
        onUpdateAccounts={setAccounts}
        onUpdateOrders={setOrders}
        onUpdateSettings={setSettings}
        onAddDirectBalance={(amt) => handleAddBalance(amt, 'شحن مباشر من لوحة التحكم')}
        vouchers={vouchers}
        onAddVoucher={handleAddVoucher}
        onDeleteVoucher={handleDeleteVoucher}
      />

      <FaqModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
        settings={settings}
      />

    </div>
  );
}
