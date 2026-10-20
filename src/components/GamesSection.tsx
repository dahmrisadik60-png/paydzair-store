import React from 'react';
import { Game, Package, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { Zap, Coins, Flame, Star, ShieldCheck, Info } from 'lucide-react';

interface GamesSectionProps {
  games: Game[];
  selectedGameId: string;
  onSelectGame: (gameId: string) => void;
  packages: Package[];
  currency: Currency;
  eurToDzdRate: number;
  onBuyPackage: (pkg: Package, game: Game) => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  games,
  selectedGameId,
  onSelectGame,
  packages,
  currency,
  eurToDzdRate,
  onBuyPackage,
}) => {
  const selectedGame = games.find(g => g.id === selectedGameId) || games[0];
  const filteredPackages = packages.filter(p => p.gameId === selectedGameId);

  return (
    <section id="games-section" className="scroll-mt-24 mb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2 mb-1">
            عروض شحن الألعاب المباشر <Flame className="w-6 h-6 text-amber-500 fill-amber-500 animate-bounce" />
          </h2>
          <p className="text-slate-400 text-sm font-semibold">
            اختر لعبتك المفضلة، حدد الباقة، واستلم الكوينز والشدات بحسابك فوراً برقم المعرف (ID)
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl px-3.5 py-1.5 flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>شحن رسمي عبر سيرفرات المطور</span>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {games.map(game => {
          const isActive = selectedGameId === game.id;
          return (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col text-right relative overflow-hidden group cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-purple-900/70 to-slate-900 border-purple-500 shadow-xl shadow-purple-950/40 text-white ring-2 ring-purple-500/30'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Subtle gradient corner */}
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-lg mb-2 shadow`}>
                <span>{game.icon}</span>
              </div>

              <span className="font-black text-sm block text-white group-hover:text-purple-300 transition-colors">
                {game.name}
              </span>
              <span className="text-[11px] text-emerald-400 font-bold mt-0.5 truncate">
                {game.tag || game.subtitle}
              </span>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-emerald-400"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Game Info & ID Prompt */}
      {selectedGame && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedGame.color} flex items-center justify-center text-2xl shadow-lg`}>
              {selectedGame.icon}
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>باقات شحن {selectedGame.name}</span>
                <span className="text-xs font-normal text-slate-400">({filteredPackages.length} باقة متاحة)</span>
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Info className="w-3.5 h-3.5 text-purple-400" />
                <span>الشحن يتم عبر: </span>
                <span className="text-purple-300 font-semibold">{selectedGame.idLabel}</span>
              </p>
            </div>
          </div>

          <div className="text-xs bg-purple-950/50 border border-purple-500/30 text-purple-200 px-3 py-1.5 rounded-xl font-bold">
            تسليم فوري ومباشر ⚡
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPackages.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400">
            <Coins className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="font-bold">لا توجد باقات متاحة حالياً لهذه اللعبة</p>
            <span className="text-xs text-slate-500">يمكنك إضافة باقات جديدة من لوحة التحكم</span>
          </div>
        ) : (
          filteredPackages.map(pkg => (
            <div
              key={pkg.id}
              className={`bg-slate-900/90 rounded-2xl border transition-all duration-200 p-4 flex flex-col justify-between hover:border-purple-500/80 hover:shadow-xl hover:shadow-purple-950/30 relative overflow-hidden group ${
                pkg.popular 
                  ? 'border-amber-500/70 shadow-lg shadow-amber-500/5' 
                  : 'border-slate-800'
              }`}
            >
              {/* Popular / Best Seller Badge */}
              {pkg.popular && (
                <span className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-br-xl shadow-md flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-slate-950" />
                  <span>الأكثر طلباً</span>
                </span>
              )}

              {/* Bonus Ribbon */}
              {pkg.bonus && (
                <span className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {pkg.bonus}
                </span>
              )}

              <div className="mb-4 mt-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-950/80 flex items-center justify-center text-purple-400 border border-purple-500/30 shadow-inner group-hover:scale-105 group-hover:border-emerald-400 transition-all">
                    <Coins className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-base group-hover:text-purple-300 transition-colors">
                      {pkg.name}
                    </h4>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      شحن فوري بالمعرف (ID)
                    </span>
                  </div>
                </div>

                {pkg.coinsAmount && (
                  <div className="bg-slate-950/60 rounded-xl px-3 py-1.5 border border-slate-800 text-xs flex justify-between items-center">
                    <span className="text-slate-400">الكمية الصافية:</span>
                    <span className="font-bold text-yellow-300 font-mono" dir="ltr">{pkg.coinsAmount}</span>
                  </div>
                )}
              </div>

              {/* Price & Action Button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div>
                  <span className="text-[11px] text-slate-400 block">السعر:</span>
                  <span className="font-black text-emerald-400 text-lg">
                    {formatPrice(pkg.price, currency, eurToDzdRate)}
                  </span>
                </div>

                <button
                  onClick={() => onBuyPackage(pkg, selectedGame)}
                  className="bg-gradient-to-r from-[#7A20DF] to-purple-600 hover:from-purple-600 hover:to-indigo-600 active:scale-95 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md shadow-purple-900/40 flex items-center gap-1.5"
                >
                  <span>شحن الآن</span>
                  <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
