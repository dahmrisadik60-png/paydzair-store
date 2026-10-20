import React from 'react';
import { X, HelpCircle, CheckCircle2, CreditCard, Clock, ShieldCheck, Zap } from 'lucide-react';
import { StoreSettings } from '../types/store';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose, settings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative text-right text-white my-8 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">دليل الشراء والأسئلة الشائعة</h3>
            <p className="text-xs text-slate-400">كل ما تود معرفته عن سرعة الشحن وطرق الدفع والضمان</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-slate-300 max-h-[60vh] overflow-y-auto pr-1">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>كيف يتم شحن الألعاب فورياً؟</span>
            </h4>
            <p className="leading-relaxed text-slate-400">
              اختر لعبتك (مثل eFootball أو PUBG أو Free Fire)، ثم حدد الباقة، وأدخل الـ Player ID الخاص بك بدقة. بمجرد تأكيد الدفع سواء من رصيد المحفظة أو بريدي موب، يتم إرسال الشحنة لحسابك في أقل من دقيقة.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>كيف أدفع بواسطة تطبيق بريدي موب (BaridiMob)؟</span>
            </h4>
            <p className="leading-relaxed text-slate-400">
              قم بفتح تطبيق BaridiMob، اختر تحويل أموال (Virement)، وانسخ رقم الـ RIP الخاص بنا (<span className="text-white font-mono font-bold" dir="ltr">{settings.baridiMobRip}</span>). حوّل المبلغ بالدينار، ثم اكتب رقم المعاملة أو أرسل صورة الوصل لفريق الدعم عبر الواتساب.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>كم يستغرق وصول الطلب؟</span>
            </h4>
            <p className="leading-relaxed text-slate-400">
              - شحن الألعاب والمحفظة: خلال 30 إلى 90 ثانية.
              <br />
              - بطاقات الهدايا (الأكواد): فوري 100% على الشاشة.
              <br />
              - الاشتراكات والحسابات: من دقيقتين إلى 10 دقائق بعد التنسيق السريع.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>هل الشحن رسمي وآمن على حسابي من الباند؟</span>
            </h4>
            <p className="leading-relaxed text-slate-400">
              نعم، جميع الشحنات تتم مباشرة وبطرق رسمية وشرعية 100% من خلال سيرفرات وشراكات معتمدة (Google Play، Konami، Midasbuy، Garena)، بدون أي مخاطر باند.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full bg-[#7A20DF] hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition text-xs"
          >
            حسناً، فهمت ذلك
          </button>
        </div>

      </div>
    </div>
  );
};
