import React from 'react';
import { GamingAccount, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { ShieldCheck, Check, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';

interface AccountsSectionProps {
  accounts: GamingAccount[];
  currency: Currency;
  eurToDzdRate: number;
  whatsappNumber: string;
  onBuyAccount: (account: GamingAccount) => void;
}

export const AccountsSection: React.FC<AccountsSectionProps> = ({
  accounts,
  currency,
  eurToDzdRate,
  whatsappNumber,
  onBuyAccount,
}) => {
  return (
    <section id="accounts" className="scroll-mt-24 mb-16 pt-8 border-t border-slate-850">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <span>سوق الحسابات الجاهزة القوية</span>
            <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30">
              VIP Verified
            </span>
          </h3>
          <p className="text-slate-400 text-sm font-semibold">
            حسابات تم فحصها وتوثيقها رسمياً مع تسليم كامل بيانات الربط والبريد الأصلي
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>ضمان عدم استرجاع 100% مدى الحياة</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(acc => (
          <div
            key={acc.id}
            className="bg-slate-900/95 rounded-3xl border border-slate-800 overflow-hidden hover:border-purple-500/80 transition-all shadow-xl hover:shadow-purple-950/30 flex flex-col justify-between group"
          >
            <div>
              {/* Account Card Header */}
              <div className="p-5 pb-3 bg-gradient-to-b from-purple-950/40 to-transparent border-b border-slate-800/60">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-xl font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{acc.status === 'available' ? 'متاح للتسليم الفوري' : 'تم البيع'}</span>
                  </span>
                  {acc.level && (
                    <span className="bg-slate-800 text-slate-300 text-[11px] font-bold px-2 py-0.5 rounded-lg border border-slate-700">
                      {acc.level}
                    </span>
                  )}
                </div>

                <h4 className="font-black text-white text-lg group-hover:text-purple-300 transition-colors">
                  {acc.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {acc.desc}
                </p>
              </div>

              {/* Specs & Highlights */}
              <div className="p-5 pt-3">
                <span className="text-[11px] font-bold text-slate-400 block mb-2">مميزات وتفاصيل الحساب:</span>
                <div className="space-y-1.5 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
                  {acc.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="p-5 pt-3 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">السعر النهائي:</span>
                <span className="font-black text-emerald-400 text-xl">
                  {formatPrice(acc.price, currency, eurToDzdRate)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`سلام عليكم، أود الاستفسار عن ${acc.name} بسعر ${acc.price}€`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-emerald-400 p-2.5 rounded-xl border border-slate-700 transition"
                  title="تواصل معنا عبر واتساب للمعاينة"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onBuyAccount(acc)}
                  disabled={acc.status === 'sold'}
                  className={`text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 ${
                    acc.status === 'sold'
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white shadow-purple-950/40 active:scale-95'
                  }`}
                >
                  <span>شراء الحساب</span>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
