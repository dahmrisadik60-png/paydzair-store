import React from 'react';
import { Zap, ShieldCheck, Clock, ArrowLeft, Flame, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onTopUpClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onTopUpClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 my-6">
      <div className="hero-matrix-bg rounded-3xl p-6 md:p-10 border border-emerald-900/60 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Visual Showcase: Dual Football Cards (Suarez CF 99 & Casillas GK 100) */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center items-center">
            <div className="relative flex items-center justify-center gap-3 sm:gap-4 max-w-full py-4">
              
              {/* Card 1: L. Suarez CF 99 */}
              <div className="relative w-36 sm:w-48 rounded-2xl overflow-hidden card-glow-green transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-2xl group cursor-pointer bg-slate-900">
                <div className="h-56 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80"
                    alt="Luis Suarez"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-between p-3">
                    <div className="flex justify-between items-start">
                      <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded shadow">
                        CF 99
                      </span>
                      <span className="bg-purple-900/80 text-yellow-300 text-[10px] font-black px-1.5 py-0.5 rounded border border-purple-400/40">
                        EPIC SHOWTIME
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] text-amber-300 font-bold tracking-wider">eFootball 2025</div>
                      <h4 className="font-black text-sm text-white drop-shadow">L. SUAREZ</h4>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold mt-0.5">
                        <Zap className="w-3 h-3 fill-emerald-400" />
                        <span>كوينز فوري</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: I. Casillas GK 100 */}
              <div className="relative w-36 sm:w-48 rounded-2xl overflow-hidden card-glow-green transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-2xl group cursor-pointer bg-slate-900 -mr-4 sm:-mr-6 border-2 border-emerald-400">
                <div className="h-56 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80"
                    alt="Iker Casillas"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-between p-3">
                    <div className="flex justify-between items-start">
                      <span className="bg-emerald-400 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded shadow">
                        GK 100
                      </span>
                      <span className="bg-emerald-950/90 text-emerald-300 text-[10px] font-black px-1.5 py-0.5 rounded border border-emerald-400/40">
                        LEGENDARY
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] text-emerald-300 font-bold tracking-wider">سد مدريد المنيع</div>
                      <h4 className="font-black text-sm text-white drop-shadow">I. CASILLAS</h4>
                      <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold mt-0.5">
                        <Sparkles className="w-3 h-3 fill-amber-300" />
                        <span>تشكيلة الأحلام</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Text & Pitch Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 text-right text-white">
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full mb-4 font-bold shadow-md">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>عروض حصرية اليوم في الجزائر</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded font-black mr-1">
                BaridiMob ⚡
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white drop-shadow-lg">
              عروض الشحن السريع <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                للألعاب والتطبيقات
              </span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
              احصل على أفضل أسعار شحن الكوينز والشدات والجواهر والاشتراكات الرقمية فوراً مع تسليم آمن ومضمون 100% ودفع مرن عبر بريدي موب (BaridiMob) والبطاقات الدولية.
            </p>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 text-xs text-slate-300">
              <div className="bg-slate-900/60 border border-slate-700/60 p-2.5 rounded-xl flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تسليم خلال 60 ثانية</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-700/60 p-2.5 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>شحن رسمي 100%</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-700/60 p-2.5 rounded-xl flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>دعم فني فوري</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button 
                onClick={onExploreClick}
                className="bg-gradient-to-r from-[#7A20DF] to-purple-700 hover:from-purple-600 hover:to-indigo-600 text-white font-black px-7 py-3 rounded-2xl transition shadow-xl shadow-purple-950/60 inline-flex items-center gap-2 active:scale-95"
              >
                <span>تصفح العروض الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button 
                onClick={onTopUpClick}
                className="bg-slate-900/80 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400 font-bold px-6 py-3 rounded-2xl transition shadow-md inline-flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>شحن رصيد بالدينار (BaridiMob)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
