import React from 'react';
import { Subscription, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { Tv, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface SubscriptionsSectionProps {
  subscriptions: Subscription[];
  currency: Currency;
  eurToDzdRate: number;
  onBuySubscription: (sub: Subscription) => void;
}

export const SubscriptionsSection: React.FC<SubscriptionsSectionProps> = ({
  subscriptions,
  currency,
  eurToDzdRate,
  onBuySubscription,
}) => {
  return (
    <section id="subscriptions" className="scroll-mt-24 mb-16 pt-8 border-t border-slate-850">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-2 mb-1">
            <Tv className="w-6 h-6 text-purple-400" />
            <span>الاشتراكات الرقمية والبث (VIP)</span>
          </h3>
          <p className="text-slate-400 text-sm font-semibold">
            حسابات واشتراكات رسمية مضمونة طوال فترة الاشتراك مع دعم واستبدال فوري
          </p>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>ضمان كامل طوال مدة الاشتراك</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subscriptions.map(sub => (
          <div
            key={sub.id}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 hover:border-purple-500/80 hover:shadow-xl hover:shadow-purple-950/20 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-purple-300 bg-purple-950/70 border border-purple-500/30 px-2.5 py-1 rounded-xl">
                  {sub.period}
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                  {sub.category}
                </span>
              </div>

              <h4 className="font-black text-white text-base mb-1 group-hover:text-purple-300 transition-colors">
                {sub.name}
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {sub.desc}
              </p>

              {sub.features && sub.features.length > 0 && (
                <div className="space-y-1.5 mb-5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {sub.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div>
                <span className="text-[11px] text-slate-400 block">السعر:</span>
                <span className="font-black text-emerald-400 text-lg">
                  {formatPrice(sub.price, currency, eurToDzdRate)}
                </span>
              </div>

              <button
                onClick={() => onBuySubscription(sub)}
                className="bg-slate-800 hover:bg-[#7A20DF] text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 group-hover:bg-[#7A20DF]"
              >
                <span>تفعيل فوري</span>
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
