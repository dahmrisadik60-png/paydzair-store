import React, { useState } from 'react';
import { GiftCard, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { Gift, Zap, ShieldCheck, Check } from 'lucide-react';

interface GiftCardsSectionProps {
  cards: GiftCard[];
  currency: Currency;
  eurToDzdRate: number;
  onBuyCard: (card: GiftCard) => void;
}

export const GiftCardsSection: React.FC<GiftCardsSectionProps> = ({
  cards,
  currency,
  eurToDzdRate,
  onBuyCard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(cards.map(c => c.category)))];

  const filteredCards = selectedCategory === 'all' 
    ? cards 
    : cards.filter(c => c.category === selectedCategory);

  return (
    <section id="giftcards" className="scroll-mt-24 mb-16 pt-8 border-t border-slate-850">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-2 mb-1">
            <Gift className="w-6 h-6 text-purple-400" />
            <span>بطاقات الهدايا والشحن الرقمي</span>
          </h3>
          <p className="text-slate-400 text-sm font-semibold">
            أكواد أصلية رسمية 100% تسلم لك فوراً على شاشتك وعبر الواتساب
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredCards.map(card => (
          <div
            key={card.id}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 hover:border-purple-500/80 hover:shadow-xl hover:shadow-purple-950/20 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold group-hover:scale-105 transition-transform">
                  <Gift className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex items-center gap-1">
                  {card.region && (
                    <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md font-bold border border-slate-700">
                      {card.region}
                    </span>
                  )}
                  <span className="bg-purple-900/50 text-purple-300 text-[10px] px-2 py-0.5 rounded-md font-bold border border-purple-500/30">
                    {card.category}
                  </span>
                </div>
              </div>

              <h4 className="font-black text-white text-base mb-1.5 group-hover:text-purple-300 transition-colors">
                {card.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {card.desc}
              </p>

              <div className="space-y-1 mb-4 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>كود رسمي مضمون من المصدر</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-300 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>تسليم رقمي فوري</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div>
                <span className="text-[11px] text-slate-400 block">السعر:</span>
                <span className="font-black text-emerald-400 text-lg">
                  {formatPrice(card.price, currency, eurToDzdRate)}
                </span>
              </div>

              <button
                onClick={() => onBuyCard(card)}
                className="bg-slate-800 hover:bg-[#7A20DF] text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 group-hover:bg-[#7A20DF]"
              >
                <span>شراء الكود</span>
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
