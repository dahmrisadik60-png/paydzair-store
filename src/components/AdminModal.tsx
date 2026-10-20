import React, { useState } from 'react';
import { Game, Package, GiftCard, Subscription, GamingAccount, Order, StoreSettings, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  PackagePlus, 
  Sliders, 
  Wallet, 
  Settings, 
  Trash2, 
  Check, 
  Clock, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  ShoppingBag, 
  Layers,
  Star,
  LogOut
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: Game[];
  packages: Package[];
  giftCards: GiftCard[];
  subscriptions: Subscription[];
  accounts: GamingAccount[];
  orders: Order[];
  settings: StoreSettings;
  currency: Currency;
  onUpdatePackages: (packages: Package[]) => void;
  onUpdateGiftCards: (cards: GiftCard[]) => void;
  onUpdateSubscriptions: (subs: Subscription[]) => void;
  onUpdateAccounts: (accounts: GamingAccount[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onAddDirectBalance: (amountEur: number) => void;
  vouchers: Record<string, number>;
  onAddVoucher: (code: string, amount: number) => void;
  onDeleteVoucher: (code: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  games,
  packages,
  giftCards,
  subscriptions,
  accounts,
  orders,
  settings,
  currency,
  onUpdatePackages,
  onUpdateGiftCards,
  onUpdateSubscriptions,
  onUpdateAccounts,
  onUpdateOrders,
  onUpdateSettings,
  onAddDirectBalance,
  vouchers,
  onAddVoucher,
  onDeleteVoucher,
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'packages' | 'catalog' | 'balance' | 'settings'>('packages');

  // Package form state
  const [pkgGameId, setPkgGameId] = useState(games[0]?.id || 'efootball');
  const [pkgName, setPkgName] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');
  const [pkgCoins, setPkgCoins] = useState('');
  const [pkgBonus, setPkgBonus] = useState('');
  const [pkgPopular, setPkgPopular] = useState(false);

  // Settings form state
  const [formSettings, setFormSettings] = useState<StoreSettings>({ ...settings });

  // Direct balance state
  const [directBalanceInput, setDirectBalanceInput] = useState('');

  // Voucher form state
  const [newVoucherCode, setNewVoucherCode] = useState('');
  const [newVoucherAmount, setNewVoucherAmount] = useState('');

  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleVerifyPin = () => {
    if (pinInput === '2009') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleAddPackage = () => {
    if (!pkgName.trim() || !pkgPrice || isNaN(Number(pkgPrice))) {
      alert('يرجى ملء اسم الباقة والسعر باليورو بشكل صحيح!');
      return;
    }

    const newPkg: Package = {
      id: Date.now(),
      gameId: pkgGameId,
      name: pkgName.trim(),
      price: parseFloat(pkgPrice),
      coinsAmount: pkgCoins.trim() || undefined,
      bonus: pkgBonus.trim() || undefined,
      popular: pkgPopular,
    };

    onUpdatePackages([newPkg, ...packages]);
    setPkgName('');
    setPkgPrice('');
    setPkgCoins('');
    setPkgBonus('');
    setPkgPopular(false);
    showNotice('تمت إضافة الباقة بنجاح!');
  };

  const handleDeletePackage = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
      onUpdatePackages(packages.filter(p => p.id !== id));
      showNotice('تم حذف الباقة بنجاح!');
    }
  };

  const handleTogglePopular = (id: number) => {
    onUpdatePackages(
      packages.map(p => (p.id === id ? { ...p, popular: !p.popular } : p))
    );
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'completed' | 'processing') => {
    onUpdateOrders(
      orders.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showNotice(`تم تحديث حالة الطلب ${orderId} إلى: ${newStatus === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}`);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(`حذف الطلب ${orderId}؟`)) {
      onUpdateOrders(orders.filter(o => o.id !== orderId));
      showNotice('تم حذف الطلب.');
    }
  };

  const handleSaveSettings = () => {
    onUpdateSettings({ ...formSettings });
    showNotice('تم حفظ إعدادات المتجر بنجاح!');
  };

  const handleAddBalanceSubmit = () => {
    const val = parseFloat(directBalanceInput);
    if (!isNaN(val) && val > 0) {
      onAddDirectBalance(val);
      setDirectBalanceInput('');
      showNotice(`تم شحن ${val.toFixed(2)}€ لحساب المستخدم بنجاح!`);
    } else {
      alert('يرجى إدخال مبلغ صحيح!');
    }
  };

  const handleCreateVoucher = () => {
    if (!newVoucherCode.trim() || !newVoucherAmount || isNaN(Number(newVoucherAmount))) {
      alert('يرجى إدخال كود وقيمة القسيمة!');
      return;
    }
    onAddVoucher(newVoucherCode.trim().toUpperCase(), parseFloat(newVoucherAmount));
    setNewVoucherCode('');
    setNewVoucherAmount('');
    showNotice('تم إنشاء كود القسيمة بنجاح!');
  };

  // Calculations for stats
  const totalRevenueEur = orders.reduce((sum, o) => sum + o.priceEur, 0);
  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'processing').length;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl relative text-right text-white my-8 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Action Toast Notice */}
        {actionNotice && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-black text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* LOGIN VIEW */}
        {!isAuthenticated ? (
          <div className="py-10 text-center max-w-sm mx-auto">
            <div className="w-16 h-16 bg-purple-900/50 text-purple-300 rounded-3xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold border border-purple-500/30 shadow-lg">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>

            <h3 className="text-2xl font-black mb-1">لوحة تحكم المشرف (Admin)</h3>
            <p className="text-slate-400 text-xs mb-6">
              أدخل رمز المرور السري للدخول إلى إدارة المتجر:
              <br />
              <span className="text-amber-400 font-bold font-mono">الرمز الافتراضي: 2009</span>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyPin();
              }}
              className="space-y-4"
            >
              <input
                type="password"
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setAuthError(false); }}
                placeholder="••••"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-center text-xl tracking-[0.4em] font-mono font-black focus:outline-none focus:border-purple-500"
                maxLength={8}
                autoFocus
              />

              {authError && (
                <p className="text-red-400 text-xs font-bold animate-pulse">
                  كلمة المرور غير صحيحة! يرجى استخدام 2009.
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#7A20DF] to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-black py-3 rounded-2xl transition shadow-lg shadow-purple-950/40 text-sm"
              >
                دخول لوحة التحكم
              </button>
            </form>
          </div>
        ) : (
          /* DASHBOARD VIEW */
          <div>
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span>إدارة متجر DzairPay</span>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      مشرف معتمد
                    </span>
                  </h3>
                  <span className="text-xs text-slate-400">لوحة التحكم الكاملة بالباقات، والطلبات، والأسعار</span>
                </div>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition p-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>تسجيل الخروج</span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 mb-6 gap-2 text-xs font-bold overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'overview' ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>الإحصائيات</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 relative ${
                  activeTab === 'orders' ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>إدارة الطلبات ({orders.length})</span>
                {pendingOrdersCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('packages')}
                className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'packages' ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <PackagePlus className="w-3.5 h-3.5" />
                <span>باقات الألعاب ({packages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('balance')}
                className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'balance' ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>شحن الرصيد والقسائم</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'settings' ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>إعدادات المتجر والصرف</span>
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">إجمالي المبيعات:</span>
                    <span className="text-xl font-black text-emerald-400 block">{totalRevenueEur.toFixed(2)} €</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      ~ {Math.round(totalRevenueEur * settings.eurToDzdRate).toLocaleString()} دج
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">عدد الطلبات:</span>
                    <span className="text-xl font-black text-white block">{orders.length}</span>
                    <span className="text-[10px] text-purple-400 font-bold">{completedOrdersCount} مكتمل</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">طلبات قيد المراجعة:</span>
                    <span className="text-xl font-black text-amber-400 block">{pendingOrdersCount}</span>
                    <span className="text-[10px] text-slate-500">تحتاج تأكيد</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">باقات الألعاب:</span>
                    <span className="text-xl font-black text-purple-400 block">{packages.length}</span>
                    <span className="text-[10px] text-slate-500">{games.length} ألعاب مدعومة</span>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-white text-sm mb-3">آخر العمليات المسجلة:</h4>
                  {orders.length === 0 ? (
                    <p className="text-xs text-slate-500">لم يتم تسجيل أي طلب بعد.</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {orders.slice(0, 5).map(order => (
                        <div key={order.id} className="flex justify-between items-center text-xs p-2 bg-slate-900 rounded-xl">
                          <div>
                            <span className="font-mono text-purple-300 font-bold ml-2">{order.id}</span>
                            <span className="text-white font-semibold">{order.title}</span>
                            <span className="text-slate-500 mr-2 font-mono">({order.targetId})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-bold">{order.priceEur.toFixed(2)}€</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              order.status === 'completed' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                            }`}>
                              {order.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h4 className="font-black text-white text-sm">قائمة الطلبات المسجلة من العملاء:</h4>
                {orders.length === 0 ? (
                  <div className="text-center py-8 bg-slate-950 rounded-2xl text-slate-500 text-xs">
                    لا توجد أي طلبات حالياً.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                    {orders.map(order => (
                      <div
                        key={order.id}
                        className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-purple-300 font-black ml-2 bg-purple-950 px-2 py-0.5 rounded">
                              {order.id}
                            </span>
                            <strong className="text-white text-sm">{order.title}</strong>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, order.status === 'completed' ? 'processing' : 'completed')}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                                order.status === 'completed'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                              }`}
                            >
                              {order.status === 'completed' ? 'مكتمل ✅' : 'انقر لإكمال الشحن ⚡'}
                            </button>

                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="text-slate-500 hover:text-red-400 p-1"
                              title="حذف الطلب"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-850">
                          <div>
                            <span className="text-slate-500">الآيدي / البريد:</span>{' '}
                            <span className="text-yellow-300 font-mono font-bold" dir="ltr">{order.targetId}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">المبلغ:</span>{' '}
                            <span className="text-emerald-400 font-bold">{order.priceEur.toFixed(2)}€ ({order.priceDzd.toLocaleString()} دج)</span>
                          </div>
                          <div>
                            <span className="text-slate-500">الدفع:</span>{' '}
                            <span className="text-purple-300 font-bold">{order.paymentMethod}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">رقم الوصل:</span>{' '}
                            <span className="font-mono text-white">{order.transactionRef || 'دفع محفظة مباشر'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PACKAGES MANAGEMENT */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                {/* Add New Package Form */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-black text-white text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>إضافة باقة شحن جديدة باليورو (€)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">اللعبة:</label>
                      <select
                        value={pkgGameId}
                        onChange={(e) => setPkgGameId(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                      >
                        {games.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">اسم الباقة:</label>
                      <input
                        type="text"
                        value={pkgName}
                        onChange={(e) => setPkgName(e.target.value)}
                        placeholder="مثال: 1040 كوينز"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">السعر باليورو (€):</label>
                      <input
                        type="number"
                        step="0.01"
                        value={pkgPrice}
                        onChange={(e) => setPkgPrice(e.target.value)}
                        placeholder="4.99"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">الكمية الصافية:</label>
                      <input
                        type="text"
                        value={pkgCoins}
                        onChange={(e) => setPkgCoins(e.target.value)}
                        placeholder="1040 Coins"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <input
                          type="text"
                          value={pkgBonus}
                          onChange={(e) => setPkgBonus(e.target.value)}
                          placeholder="شارة البونص (مثلاً: +50 كوينز)"
                          className="p-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs w-48"
                        />
                      </div>

                      <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-300">
                        <input
                          type="checkbox"
                          checked={pkgPopular}
                          onChange={(e) => setPkgPopular(e.target.checked)}
                          className="rounded text-purple-600 focus:ring-0"
                        />
                        <span>تمييز كـ "الأكثر مبيعاً" ⭐</span>
                      </label>
                    </div>

                    <button
                      onClick={handleAddPackage}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2.5 rounded-xl text-xs transition shadow-md"
                    >
                      إضافة الباقة للمتجر
                    </button>
                  </div>
                </div>

                {/* Current Packages List */}
                <div>
                  <h4 className="font-bold text-white text-sm mb-3">الباقات المتاحة حالياً ({packages.length}):</h4>
                  <div className="space-y-2 max-h-[42vh] overflow-y-auto pr-1">
                    {packages.map(pkg => {
                      const game = games.find(g => g.id === pkg.gameId);
                      return (
                        <div
                          key={pkg.id}
                          className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-white">{pkg.name}</span>
                            <span className="text-[10px] text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/20">
                              {game?.name || pkg.gameId}
                            </span>
                            {pkg.popular && (
                              <span className="text-[10px] text-amber-400 font-black">⭐ الأكثر طلباً</span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-black text-emerald-400">{pkg.price.toFixed(2)} €</span>
                            
                            <button
                              onClick={() => handleTogglePopular(pkg.id)}
                              className="text-slate-400 hover:text-amber-400 p-1"
                              title="تبديل وسم الأكثر مبيعاً"
                            >
                              <Star className={`w-3.5 h-3.5 ${pkg.popular ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>

                            <button
                              onClick={() => handleDeletePackage(pkg.id)}
                              className="text-slate-500 hover:text-red-400 p-1"
                              title="حذف الباقة"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BALANCE & VOUCHERS */}
            {activeTab === 'balance' && (
              <div className="space-y-6">
                {/* Direct User Balance Injection */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-black text-white text-sm">شحن رصيد تجريبي مباشر للحساب (€)</h4>
                  <p className="text-xs text-slate-400">
                    يمكنك إضافة رصيد لحساب العميل فورياً لاختبار عمليات الشراء أو تعويض المشتركين:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={directBalanceInput}
                      onChange={(e) => setDirectBalanceInput(e.target.value)}
                      placeholder="أدخل المبلغ باليورو (مثال: 50)"
                      className="flex-1 p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                    <button
                      onClick={handleAddBalanceSubmit}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2.5 rounded-xl text-xs transition"
                    >
                      شحن فوري
                    </button>
                  </div>
                </div>

                {/* Create Voucher */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-black text-white text-sm">إنشاء قسيمة شحن هدية (Voucher)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">كود القسيمة:</label>
                      <input
                        type="text"
                        value={newVoucherCode}
                        onChange={(e) => setNewVoucherCode(e.target.value.toUpperCase())}
                        placeholder="مثال: SUPER2025"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white uppercase font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">القيمة باليورو (€):</label>
                      <input
                        type="number"
                        value={newVoucherAmount}
                        onChange={(e) => setNewVoucherAmount(e.target.value)}
                        placeholder="25.00"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono font-bold"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleCreateVoucher}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
                  >
                    حفظ وإتاحة القسيمة
                  </button>

                  <div className="pt-3 border-t border-slate-850">
                    <span className="text-xs text-slate-400 font-bold block mb-2">القسائم الفعالة حالياً:</span>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(vouchers).map(([code, amt]) => (
                        <div
                          key={code}
                          className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-xs"
                        >
                          <span className="font-mono font-black text-purple-300">{code}</span>
                          <span className="text-emerald-400 font-bold">+{amt}€</span>
                          <button
                            onClick={() => onDeleteVoucher(code)}
                            className="text-slate-500 hover:text-red-400"
                            title="حذف القسيمة"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: GENERAL SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">رقم هاتف الدعم الفني:</label>
                    <input
                      type="text"
                      value={formSettings.storePhone}
                      onChange={(e) => setFormSettings({ ...formSettings, storePhone: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">رقم الواتساب الرسمي:</label>
                    <input
                      type="text"
                      value={formSettings.whatsappNumber}
                      onChange={(e) => setFormSettings({ ...formSettings, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">البريد الإلكتروني الرسمي:</label>
                    <input
                      type="email"
                      value={formSettings.storeEmail}
                      onChange={(e) => setFormSettings({ ...formSettings, storeEmail: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">سعر صرف اليورو للدينار (1€ = ؟ دج):</label>
                    <input
                      type="number"
                      value={formSettings.eurToDzdRate}
                      onChange={(e) => setFormSettings({ ...formSettings, eurToDzdRate: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-emerald-400 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">رقم حساب بريدي موب (RIP):</label>
                    <input
                      type="text"
                      value={formSettings.baridiMobRip}
                      onChange={(e) => setFormSettings({ ...formSettings, baridiMobRip: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">اسم صاحب حساب بريدي موب:</label>
                    <input
                      type="text"
                      value={formSettings.baridiMobAccountName}
                      onChange={(e) => setFormSettings({ ...formSettings, baridiMobAccountName: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-400 font-bold mb-1">نص شريط الإعلانات العاجل (في أعلى الموقع):</label>
                    <input
                      type="text"
                      value={formSettings.announcementText}
                      onChange={(e) => setFormSettings({ ...formSettings, announcementText: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSaveSettings}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-black px-8 py-3 rounded-2xl text-xs transition shadow-lg shadow-purple-950/40"
                  >
                    حفظ كافة الإعدادات
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
