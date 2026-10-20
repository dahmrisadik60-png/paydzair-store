import React, { useState } from 'react';
import { Currency, StoreSettings } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { 
  X, 
  Wallet, 
  CreditCard, 
  Copy, 
  Check, 
  Gift, 
  PlusCircle, 
  Sparkles, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  currency: Currency;
  settings: StoreSettings;
  onAddBalance: (amountEur: number, note: string) => void;
  activeVouchers: Record<string, number>;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  balance,
  currency,
  settings,
  onAddBalance,
  activeVouchers,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'baridimob' | 'voucher' | 'quick'>('baridimob');
  const [copiedRip, setCopiedRip] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [depositAmountDzd, setDepositAmountDzd] = useState<number | ''>(2400);
  const [depositRef, setDepositRef] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCopyRip = () => {
    navigator.clipboard.writeText(settings.baridiMobRip.replace(/\s+/g, ''));
    setCopiedRip(true);
    setTimeout(() => setCopiedRip(false), 2000);
  };

  const handleBaridiDeposit = () => {
    setStatusMsg(null);
    if (!depositAmountDzd || Number(depositAmountDzd) <= 0) {
      setStatusMsg({ type: 'error', text: 'يرجى إدخال مبلغ إيداع صحيح بالدينار الجزائري!' });
      return;
    }
    if (!depositRef.trim()) {
      setStatusMsg({ type: 'error', text: 'يرجى إدخال رقم العملية (Transaction Ref) من تطبيق بريدي موب!' });
      return;
    }

    const amountEur = Number((Number(depositAmountDzd) / settings.eurToDzdRate).toFixed(2));
    onAddBalance(amountEur, `شحن بريدي موب (وصل ${depositRef})`);
    setStatusMsg({
      type: 'success',
      text: `تم شحن ${amountEur.toFixed(2)}€ (${depositAmountDzd.toLocaleString()} دج) إلى محفظتك بنجاح!`,
    });
    setDepositRef('');
  };

  const handleRedeemVoucher = () => {
    setStatusMsg(null);
    const code = voucherCode.trim().toUpperCase();
    if (!code) {
      setStatusMsg({ type: 'error', text: 'يرجى إدخال كود القسيمة أولاً!' });
      return;
    }

    const value = activeVouchers[code];
    if (value && value > 0) {
      onAddBalance(value, `قسيمة هدية (${code})`);
      setStatusMsg({
        type: 'success',
        text: `مبروك! تم تفعيل القسيمة وإضافة ${value.toFixed(2)}€ لرصيدك فوراً! 🎉`,
      });
      setVoucherCode('');
    } else {
      setStatusMsg({
        type: 'error',
        text: 'كود القسيمة غير صالح أو تم استخدامه مسبقاً! جرب الأكواد التجريبية: DZAIR50 أو WELCOME أو BARIDI10',
      });
    }
  };

  const handleQuickAdd = (eur: number) => {
    onAddBalance(eur, `شحن تجريبي سريع +${eur}€`);
    setStatusMsg({
      type: 'success',
      text: `تمت إضافة +${eur}€ إلى رصيدك بنجاح!`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-right text-white my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">محفظة المتجر وشحن الرصيد</h3>
            <p className="text-xs text-slate-400">اشحن محفظتك بالدينار الجزائري أو عبر قسائم الشحن الفورية</p>
          </div>
        </div>

        {/* Current Balance Display */}
        <div className="bg-gradient-to-r from-purple-950/60 to-emerald-950/60 border border-purple-500/30 rounded-2xl p-4 mb-5 flex justify-between items-center shadow-inner">
          <div>
            <span className="text-xs text-slate-300 block">رصيدك الحالي في المتجر:</span>
            <span className="text-2xl font-black text-emerald-400">
              {formatPrice(balance, currency, settings.eurToDzdRate)}
            </span>
          </div>
          <div className="text-left">
            <span className="text-[11px] text-slate-400 block font-mono">
              ~ {Math.round(balance * settings.eurToDzdRate).toLocaleString()} دج
            </span>
            <span className="text-[10px] text-purple-300 font-bold block">
              سعر الصرف: 1€ = {settings.eurToDzdRate} دج
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-5 gap-2 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('baridimob'); setStatusMsg(null); }}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'baridimob'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>بريدي موب (BaridiMob)</span>
          </button>

          <button
            onClick={() => { setActiveTab('voucher'); setStatusMsg(null); }}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'voucher'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>كود قسيمة هدية</span>
          </button>

          <button
            onClick={() => { setActiveTab('quick'); setStatusMsg(null); }}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'quick'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>شحن سريع للتجربة</span>
          </button>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div className={`p-3 rounded-2xl text-xs font-bold mb-4 flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
              : 'bg-red-950/70 text-red-300 border border-red-500/40'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* TAB 1: BARIDIMOB */}
        {activeTab === 'baridimob' && (
          <div className="space-y-4 text-xs">
            {/* RIP Card */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">رقم حساب بريدي موب (RIP):</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded">معتمد رسمي</span>
              </div>
              <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-700/80">
                <span className="font-mono font-black text-sm text-white tracking-wider" dir="ltr">
                  {settings.baridiMobRip}
                </span>
                <button
                  onClick={handleCopyRip}
                  className="bg-purple-900/60 hover:bg-purple-800 text-purple-200 p-1.5 rounded-lg border border-purple-500/30 transition flex items-center gap-1 text-[11px]"
                >
                  {copiedRip ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRip ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>اسم صاحب الحساب:</span>
                <span className="font-bold text-slate-200">{settings.baridiMobAccountName}</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">المبلغ المرسل بالدينار (DZD):</label>
                <input
                  type="number"
                  value={depositAmountDzd}
                  onChange={(e) => setDepositAmountDzd(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="2400"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  يعادل: {depositAmountDzd ? (Number(depositAmountDzd) / settings.eurToDzdRate).toFixed(2) : 0} €
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">رقم وصل المعاملة (Ref):</label>
                <input
                  type="text"
                  value={depositRef}
                  onChange={(e) => setDepositRef(e.target.value)}
                  placeholder="مثال: 98402814"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  تجد الرقم في إشعار أو وصل بريدي موب
                </span>
              </div>
            </div>

            <button
              onClick={handleBaridiDeposit}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-2xl transition shadow-lg shadow-emerald-950/40 text-sm flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>تأكيد الإيداع وإضافة الرصيد</span>
            </button>
          </div>
        )}

        {/* TAB 2: VOUCHER */}
        {activeTab === 'voucher' && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-300">
              أدخل كود قسيمة الشحن أو كود المكافأة لشحن محفظتك فورياً بدون انتظار:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                placeholder="أدخل الكود مثل: DZAIR50"
                className="flex-1 p-3 bg-slate-950 border border-purple-500/40 rounded-xl text-sm font-mono tracking-widest text-center uppercase text-white font-black focus:outline-none"
              />
              <button
                onClick={handleRedeemVoucher}
                className="bg-purple-600 hover:bg-purple-500 text-white font-black px-6 py-3 rounded-xl transition text-xs shrink-0"
              >
                تفعيل
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 font-bold block mb-2">أكواد تجريبية جاهزة للاختبار:</span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeVouchers).map(([code, val]) => (
                  <button
                    key={code}
                    onClick={() => setVoucherCode(code)}
                    className="bg-slate-900 hover:bg-purple-950 border border-slate-700 hover:border-purple-500 px-2.5 py-1 rounded-lg text-[11px] font-mono text-purple-300 transition"
                  >
                    {code} (+{val}€)
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUICK TEST BALANCE */}
        {activeTab === 'quick' && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-300">
              اختر رصيداً تجريبياً لإضافته بضغطة واحدة لتجربة الشراء وسلاسة التطبيق:
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              {[10, 25, 50, 100, 200].map(amount => (
                <button
                  key={amount}
                  onClick={() => handleQuickAdd(amount)}
                  className="p-3 bg-slate-950 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-500 rounded-2xl text-center transition group cursor-pointer"
                >
                  <span className="text-emerald-400 font-black text-base block group-hover:scale-105 transition">
                    +{amount} €
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                    ({(amount * settings.eurToDzdRate).toLocaleString()} دج)
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
