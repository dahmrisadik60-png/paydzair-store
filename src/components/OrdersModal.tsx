import React, { useState } from 'react';
import { Order, Currency, StoreSettings } from '../types/store';
import { formatPrice, formatDate } from '../utils/formatters';
import { 
  X, 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  currency: Currency;
  settings: StoreSettings;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  currency,
  settings,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'processing'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesQuery = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.targetId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesQuery && matchesStatus;
  });

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative text-right text-white my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">سجل طلباتي وتتبع الشحن</h3>
            <p className="text-xs text-slate-400">تابع حالة شحن حساباتك وبطاقاتك الرقمية لحظة بلحظة</p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الطلب (مثال: DZ-12345) أو اسم الباقة أو الآيدي..."
              className="w-full pr-9 pl-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterStatus === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              الكل ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterStatus === 'completed' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              مكتملة
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterStatus === 'processing' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              قيد التنفيذ
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="font-bold text-sm">لا توجد طلبات تطابق بحثك</p>
              <span className="text-xs text-slate-500">اختر إحدى الباقات واشحن حسابك فوراً الآن!</span>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition space-y-2.5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-purple-300 text-xs bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-500/30">
                        {order.id}
                      </span>
                      <button
                        onClick={() => handleCopy(order.id)}
                        className="text-slate-500 hover:text-slate-300 p-0.5"
                        title="نسخ رقم الطلب"
                      >
                        {copiedId === order.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <h4 className="font-black text-white text-sm mt-1">{order.title}</h4>
                  </div>

                  <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                    order.status === 'completed'
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-950/80 text-amber-400 border-amber-500/30'
                  }`}>
                    {order.status === 'completed' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>تم الشحن والتسليم ✅</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>قيد المراجعة والمعالجة ⏳</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="block text-[10px] text-slate-500">الآيدي أو البريد:</span>
                    <span className="font-bold text-yellow-300 font-mono" dir="ltr">{order.targetId}</span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-500">المبلغ:</span>
                    <span className="font-extrabold text-emerald-400">
                      {formatPrice(order.priceEur, currency, settings.eurToDzdRate)}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-500">تاريخ الطلب:</span>
                    <span className="font-medium text-slate-300">{formatDate(order.date)}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-slate-400 text-[11px]">
                    طريقة الدفع: <strong className="text-purple-300">{order.paymentMethod === 'wallet' ? 'محفظة المتجر ⚡' : 'بريدي موب'}</strong>
                  </span>

                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`سلام عليكم، أستفسر عن حالة الطلب رقم ${order.id} (${order.title}) للآيدي ${order.targetId}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>متابعة مع الدعم</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
