import React, { useState } from 'react';
import { Currency, StoreSettings } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { 
  Phone, 
  Mail, 
  Wallet, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ShoppingBag, 
  Menu, 
  X, 
  PlusCircle,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  balance: number;
  currency: Currency;
  onToggleCurrency: () => void;
  settings: StoreSettings;
  ordersCount: number;
  onOpenAdmin: () => void;
  onOpenWallet: () => void;
  onOpenOrders: () => void;
  onOpenFaq: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  balance,
  currency,
  onToggleCurrency,
  settings,
  ordersCount,
  onOpenAdmin,
  onOpenWallet,
  onOpenOrders,
  onOpenFaq,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      {settings.showAnnouncement && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-emerald-950 text-white text-xs py-1.5 px-4 text-center font-bold border-b border-purple-500/20 flex items-center justify-center gap-2 overflow-hidden shadow-inner">
          <Zap className="w-3.5 h-3.5 text-yellow-300 animate-pulse shrink-0" />
          <span className="truncate">{settings.announcementText}</span>
        </div>
      )}

      {/* Top Bar with Contacts & Language */}
      <header className="bg-[#7A20DF] text-white text-xs py-2 px-4 shadow-sm border-b border-purple-400/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <a 
              href={`tel:${settings.storePhone.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-purple-200 transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span dir="ltr">{settings.storePhone}</span>
            </a>
            <span className="text-purple-300 hidden sm:inline">|</span>
            <a 
              href={`mailto:${settings.storeEmail}`} 
              className="flex items-center gap-1.5 hover:text-purple-200 transition font-medium hidden sm:flex"
            >
              <Mail className="w-3.5 h-3.5 text-purple-200" />
              <span>{settings.storeEmail}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="bg-purple-900/80 hover:bg-purple-950 text-white text-[11px] px-2.5 py-1 rounded-full font-bold border border-purple-400/40 flex items-center gap-1 transition shadow-sm"
              title="تغيير العملة بين اليورو والدينار الجزائري"
            >
              <span className="text-yellow-300 font-extrabold">{currency === 'EUR' ? '€ EUR' : 'دج DZD'}</span>
              <span className="text-[10px] text-purple-200">تبديل</span>
            </button>

            <span className="bg-purple-950/60 text-purple-100 text-[11px] px-2.5 py-1 rounded-full font-semibold border border-purple-400/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              الجزائر 🇩🇿 (عربي)
            </span>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7A20DF] to-purple-800 rounded-2xl flex items-center justify-center text-white font-black text-xl border border-purple-400/40 shadow-lg shadow-purple-900/30 group-hover:scale-105 group-hover:border-emerald-400 transition-all duration-300">
                <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 group-hover:rotate-12 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white flex items-center">
                  Dzair<span className="text-[#9333ea] drop-shadow-[0_0_12px_rgba(147,51,234,0.5)]">Pay</span>
                </span>
                <span className="text-[10px] text-emerald-400 -mt-1 font-extrabold tracking-wider flex items-center gap-1">
                  <span>GAMING STORE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-400">المتجر الرسمي</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-300">
              <a href="#games-section" className="hover:text-purple-400 transition flex items-center gap-1">
                <span>شحن الألعاب</span>
              </a>
              <a href="#giftcards" className="hover:text-purple-400 transition">
                <span>بطاقات الهدايا</span>
              </a>
              <a href="#subscriptions" className="hover:text-purple-400 transition">
                <span>الاشتراكات</span>
              </a>
              <a href="#accounts" className="hover:text-purple-400 transition flex items-center gap-1">
                <span>حسابات جاهزة</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded font-extrabold border border-emerald-500/30">جديد</span>
              </a>
              <button 
                onClick={onOpenFaq} 
                className="hover:text-purple-400 transition flex items-center gap-1 text-slate-400"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>كيفية الشراء</span>
              </button>
            </div>
          </div>

          {/* User Controls & Balance */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Wallet Balance Widget */}
            <div 
              onClick={onOpenWallet}
              className="bg-purple-950/70 hover:bg-purple-900/80 border border-purple-500/40 rounded-2xl px-3 py-1.5 flex items-center gap-2 cursor-pointer transition shadow-md group"
              title="انقر لشحن رصيد محفظتك عبر بريدي موب"
            >
              <div className="w-7 h-7 rounded-xl bg-purple-800/80 flex items-center justify-center text-yellow-300 font-bold text-xs border border-purple-400/30 group-hover:scale-110 transition">
                <Wallet className="w-4 h-4 text-yellow-300" />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-purple-300 block -mb-0.5">رصيدك:</span>
                <span className="font-black text-emerald-400 text-sm tracking-tight">
                  {formatPrice(balance, currency, settings.eurToDzdRate)}
                </span>
              </div>
              <PlusCircle className="w-4 h-4 text-emerald-400 group-hover:rotate-90 transition-transform hidden sm:block" />
            </div>

            {/* My Orders Button */}
            <button
              onClick={onOpenOrders}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm relative"
              title="تتبع طلباتي"
            >
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">طلباتي</span>
              {ordersCount > 0 && (
                <span className="bg-[#7A20DF] text-white text-[10px] px-1.5 py-0.2 rounded-full font-black border border-purple-300/40">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Button */}
            <button
              onClick={onOpenAdmin}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95"
              title="الدخول للوحة الإدارة (PIN: 2009)"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span className="hidden md:inline">لوحة التحكم</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl border border-slate-700"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-center text-sm font-bold text-slate-200">
              <a 
                href="#games-section" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-800/80 rounded-xl hover:bg-purple-900/40 hover:text-purple-300 transition"
              >
                ⚽ شحن الألعاب
              </a>
              <a 
                href="#giftcards" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-800/80 rounded-xl hover:bg-purple-900/40 hover:text-purple-300 transition"
              >
                🎁 بطاقات الهدايا
              </a>
              <a 
                href="#subscriptions" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-800/80 rounded-xl hover:bg-purple-900/40 hover:text-purple-300 transition"
              >
                📺 الاشتراكات
              </a>
              <a 
                href="#accounts" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-800/80 rounded-xl hover:bg-purple-900/40 hover:text-purple-300 transition"
              >
                🛡️ حسابات جاهزة
              </a>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <button 
                onClick={() => { onOpenFaq(); setMobileMenuOpen(false); }}
                className="flex items-center gap-1 text-purple-400 font-bold"
              >
                <HelpCircle className="w-4 h-4" />
                <span>دليل الشراء والشحن</span>
              </button>
              <button
                onClick={() => { onOpenWallet(); setMobileMenuOpen(false); }}
                className="flex items-center gap-1 text-emerald-400 font-bold"
              >
                <PlusCircle className="w-4 h-4" />
                <span>شحن رصيد المحفظة</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
