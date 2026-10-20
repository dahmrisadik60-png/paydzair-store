import React, { useState } from 'react';
import { Currency, StoreSettings, Order } from '../types/store';
import { formatPrice, convertToDzd, generateOrderId, formatDate } from '../utils/formatters';
import { 
  X, 
  Zap, 
  Wallet, 
  CreditCard, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  MessageCircle, 
  Share2,
  Clock,
  Coins,
  ShieldCheck
} from 'lucide-react';

interface PurchaseItem {
  type: 'game' | 'card' | 'subscription' | 'account';
  title: string;
  priceEur: number;
  idLabel?: string;
  idPlaceholder?: string;
  bonusText?: string;
}

interface PurchaseModalProps {
  item: PurchaseItem | null;
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  currency: Currency;
  settings: StoreSettings;
  onSuccessfulPurchase: (order: Order, newBalance: number) => void;
  onOpenWallet: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  item,
  isOpen,
  onClose,
  userBalance,
  currency,
  settings,
  onSuccessfulPurchase,
  onOpenWallet,
}) => {
  if (!isOpen || !item) return null;

  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'baridimob' | 'paysera' | 'binance'>('wallet');
  const [baridiRef, setBaridiRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedRip, setCopiedRip] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const priceDzd = convertToDzd(item.priceEur, settings.eurToDzdRate);
  const hasEnoughBalance = userBalance >= item.priceEur;

  const handleCopyRip = () => {
    navigator.clipboard.writeText(settings.baridiMobRip.replace(/\s+/g, ''));
    setCopiedRip(true);
    setTimeout(() => setCopiedRip(false), 2000);
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  const handleConfirmPurchase = () => {
    setErrorMsg('');

    if (!playerId.trim()) {
      setErrorMsg(item.type === 'game' ? 'يرجى إدخال آيدي الحساب (Player ID) بشكل صحيح!' : 'يرجى إدخال البريد الإلكتروني أو رقم الواتساب للاستلام!');
      return;
    }

    if (paymentMethod === 'wallet') {
      if (!hasEnoughBalance) {
        setErrorMsg('رصيد محفظتك غير كافٍ! يرجى شحن الرصيد أولاً أو الدفع عبر بريدي موب.');
        return;
      }
    } else if (paymentMethod === 'baridimob') {
      if (!baridiRef.trim()) {
        setErrorMsg('يرجى إدخال رقم المعاملة أو رقم الوصل (Transaction Ref) من تطبيق بريدي موب!');
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      let finalNewBalance = userBalance;
      if (paymentMethod === 'wallet') {
        finalNewBalance = Number((userBalance - item.priceEur).toFixed(2));
      }

      const order: Order = {
        id: generateOrderId(),
        title: item.title,
        category: item.type,
        targetId: playerId.trim(),
        priceEur: item.priceEur,
        priceDzd: priceDzd,
        paymentMethod: paymentMethod,
        status: paymentMethod === 'wallet' ? 'completed' : 'processing',
        date: new Date().toISOString(),
        transactionRef: baridiRef.trim() || undefined,
      };

      setIsProcessing(false);
      setCompletedOrder(order);
      onSuccessfulPurchase(order, finalNewBalance);
    }, 1200);
  };

  const handleCloseModal = () => {
    setCompletedOrder(null);
    setPlayerId('');
    setPlayerName('');
    setBaridiRef('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-right text-white my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 left-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {completedOrder ? (
          /* SUCCESS RECEIPT VIEW */
          <div className="py-2 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-black text-white mb-1">
              {completedOrder.paymentMethod === 'wallet' 
                ? 'تم الشحن بنجاح! ⚡' 
                : 'تم استلام طلبك بنجاح! ⏳'}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              {completedOrder.paymentMethod === 'wallet'
                ? 'تم خصم المبلغ من رصيدك وإرسال الشحنة لحسابك فوراً.'
                : 'جاري مراجعة إيصال بريدي موب وإتمام الشحن في أقل من 5 دقائق.'}
            </p>

            {/* Receipt Card */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-right text-xs space-y-2.5 mb-5 font-medium">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">رقم الطلب:</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-purple-300">
                  <span>{completedOrder.id}</span>
                  <button 
                    onClick={() => handleCopyOrderId(completedOrder.id)}
                    className="p-1 hover:text-white"
                    title="نسخ رقم الطلب"
                  >
                    {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">العنصر المطلوب:</span>
                <span className="font-bold text-white">{completedOrder.title}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">معرف الحساب / الاستلام:</span>
                <span className="font-bold text-yellow-300 font-mono" dir="ltr">{completedOrder.targetId}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">المبلغ المدفوع:</span>
                <span className="font-extrabold text-emerald-400">
                  {formatPrice(completedOrder.priceEur, currency, settings.eurToDzdRate)} ({completedOrder.priceDzd.toLocaleString()} دج)
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">طريقة الدفع:</span>
                <span className="font-bold text-purple-300">
                  {completedOrder.paymentMethod === 'wallet' ? 'محفظة المتجر ⚡' : 'بريدي موب (BaridiMob)'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-slate-400">حالة العملية:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  completedOrder.status === 'completed'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                }`}>
                  {completedOrder.status === 'completed' ? 'مكتمل وتسليم فوري ✅' : 'قيد المعالجة السريعة ⏳'}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`سلام عليكم، قمت بالطلب رقم ${completedOrder.id} لشحن ${completedOrder.title} للآيدي ${completedOrder.targetId}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال الطلب للواتساب</span>
              </a>

              <button
                onClick={handleCloseModal}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-xl transition text-xs"
              >
                تم الإغلاق
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Zap className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <span className="text-[11px] text-purple-400 font-bold block">إتمام طلب الشحن</span>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
              </div>
            </div>

            {/* Price Badge */}
            <div className="bg-slate-950/70 p-3.5 rounded-2xl mb-4 flex justify-between items-center border border-slate-800">
              <div className="text-xs text-slate-400">
                <span>المبلغ الإجمالي المستحق:</span>
              </div>
              <div className="text-left">
                <span className="font-black text-emerald-400 text-lg block">
                  {formatPrice(item.priceEur, currency, settings.eurToDzdRate)}
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1 font-mono">
                  (ما يعادل {priceDzd.toLocaleString()} دينار جزائري)
                </span>
              </div>
            </div>

            {/* ID Input */}
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-300">
                  {item.idLabel || (item.type === 'game' ? 'آيدي الحساب (Player ID / User ID):' : 'البريد أو رقم الواتساب للاستلام:')}
                  <span className="text-red-400 mr-1">*</span>
                </label>
                <input
                  type="text"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder={item.idPlaceholder || (item.type === 'game' ? 'أدخل الآيدي الخاص بك في اللعبة' : 'أدخل بريدك أو رقم هاتفك')}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition font-mono"
                  dir="ltr"
                />
              </div>

              {item.type === 'game' && (
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-400">
                    اسم اللاعب داخل اللعبة (اختياري للتحقق الإضافي):
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="مثال: DZ_Sniper_99"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold mb-2 text-slate-300">اختر طريقة الدفع:</label>
              
              <div className="grid grid-cols-2 gap-2.5">
                {/* Method 1: Wallet Balance */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between ${
                    paymentMethod === 'wallet'
                      ? 'bg-purple-950/70 border-purple-500 ring-2 ring-purple-500/30'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-xs text-white">رصيد المحفظة ⚡</span>
                    <Wallet className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className={`text-[10px] font-bold ${hasEnoughBalance ? 'text-emerald-400' : 'text-amber-400'}`}>
                    رصيدك: {formatPrice(userBalance, currency, settings.eurToDzdRate)}
                  </span>
                </button>

                {/* Method 2: BaridiMob */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('baridimob')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between ${
                    paymentMethod === 'baridimob'
                      ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-xs text-white">بريدي موب 🇩🇿</span>
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-emerald-300 font-bold">
                    دفع مباشر بالدينار (RIP)
                  </span>
                </button>
              </div>

              {/* BaridiMob Details Panel */}
              {paymentMethod === 'baridimob' && (
                <div className="mt-3 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-3.5 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>حساب بريدي موب (RIP):</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-white bg-slate-900 px-2 py-1 rounded-lg">
                      <span dir="ltr">{settings.baridiMobRip}</span>
                      <button 
                        onClick={handleCopyRip}
                        className="p-1 hover:text-emerald-400 transition"
                        title="نسخ رقم الـ RIP"
                      >
                        {copiedRip ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>المبلغ الواجب إرساله:</span>
                    <span className="font-black text-emerald-400 text-sm">{priceDzd.toLocaleString()} دج</span>
                  </div>

                  <div className="pt-2 border-t border-emerald-900/60">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      رقم المعاملة / رقم الوصل من التطبيق (Transaction ID):
                    </label>
                    <input
                      type="text"
                      value={baridiRef}
                      onChange={(e) => setBaridiRef(e.target.value)}
                      placeholder="مثال: 00928174 أو رقم العملية"
                      className="w-full p-2 bg-slate-900 border border-emerald-600/40 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Insufficient Wallet Balance Hint */}
              {paymentMethod === 'wallet' && !hasEnoughBalance && (
                <div className="mt-3 bg-amber-950/40 border border-amber-500/40 rounded-2xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>رصيد محفظتك غير كافٍ لإتمام هذه العملية.</span>
                  </div>
                  <button
                    onClick={onOpenWallet}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-lg text-[11px] transition shrink-0"
                  >
                    شحن المحفظة
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="text-xs font-bold mb-3 p-2.5 rounded-xl bg-red-950/70 text-red-300 border border-red-500/40 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
              className={`w-full py-3.5 rounded-2xl font-black text-sm transition shadow-xl flex items-center justify-center gap-2 active:scale-95 ${
                isProcessing
                  ? 'bg-slate-800 text-slate-500 cursor-wait'
                  : 'bg-gradient-to-r from-purple-600 via-[#7A20DF] to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-950/50'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري معالجة الشحن...</span>
                </>
              ) : (
                <>
                  <span>تأكيد الشراء الفوري</span>
                  <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                </>
              )}
            </button>

            <div className="mt-3 text-center">
              <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>جميع المعاملات مشفرة ومحمية بضمان DzairPay الرسمي</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
