import React from 'react';
import { StoreSettings } from '../types/store';
import { Zap, Phone, Mail, ShieldCheck, Heart, Clock } from 'lucide-react';

interface FooterProps {
  settings: StoreSettings;
  onOpenFaq: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenFaq, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 text-white pt-12 pb-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-right text-sm text-slate-400">
          
          {/* Column 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-purple-900/60 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/30">
                <Zap className="w-4 h-4 fill-purple-400" />
              </div>
              <span className="text-xl font-black text-white">
                Dzair<span className="text-[#9333ea]">Pay</span>
              </span>
            </div>
            <p className="leading-relaxed text-xs text-slate-400 mb-4">
              المنصة الجزائرية الرائدة لشحن كوينز وشدات الألعاب والبطاقات الرقمية والاشتراكات بأفضل الأسعار ودعم فوري ومباشر على مدار الساعة.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>دفع معتمد وآمن 100%</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-black text-sm mb-3">روابط وتصفح سريع</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#games-section" className="hover:text-purple-400 transition">شحن كوينز وشدات الألعاب</a>
              </li>
              <li>
                <a href="#giftcards" className="hover:text-purple-400 transition">بطاقات الهدايا (جوجل، أبل، ستيم)</a>
              </li>
              <li>
                <a href="#subscriptions" className="hover:text-purple-400 transition">اشتراكات نتفلكس وشاهد وIPTV</a>
              </li>
              <li>
                <a href="#accounts" className="hover:text-purple-400 transition">سوق الحسابات الجاهزة VIP</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h4 className="text-white font-black text-sm mb-3">الدعم والمساعدة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenFaq} className="hover:text-purple-400 transition text-right">
                  كيفية الشراء والأسئلة الشائعة
                </button>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-purple-400 transition"
                >
                  الدعم الفني عبر الواتساب (24/7)
                </a>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-400 transition text-right">
                  لوحة تحكم المشرف (PIN: 2009)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-black text-sm mb-3">تواصل معنا</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300 font-bold" dir="ltr">{settings.storePhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-slate-300">{settings.storeEmail}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">ساعات العمل: 24 ساعة / 7 أيام</span>
              </p>
            </div>
          </div>

        </div>

        {/* Payment Methods Badges */}
        <div className="pt-6 pb-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>طرق الدفع المدعومة في الجزائر:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-slate-900 text-slate-300 font-bold px-2.5 py-1 rounded-lg border border-slate-800 text-[11px]">
              🇩🇿 بريدي موب (BaridiMob)
            </span>
            <span className="bg-slate-900 text-slate-300 font-bold px-2.5 py-1 rounded-lg border border-slate-800 text-[11px]">
              📬 بريد الجزائر (CCP)
            </span>
            <span className="bg-slate-900 text-slate-300 font-bold px-2.5 py-1 rounded-lg border border-slate-800 text-[11px]">
              💳 Paysera & Wise
            </span>
            <span className="bg-slate-900 text-slate-300 font-bold px-2.5 py-1 rounded-lg border border-slate-800 text-[11px]">
              🪙 Binance Pay (USDT)
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-900 pt-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>جميع الحقوق محفوظة © 2026 متجر DzairPay Store - الأسرع في الجزائر</p>
          <p className="text-[11px] text-slate-600 flex items-center gap-1">
            <span>صنع بشغف لعشاق الألعاب</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
