import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <a
      href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent('سلام عليكم DzairPay، أود الاستفسار عن خدمة الشحن المباشر.')}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-emerald-400"
      title="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-black">
        تحدث مع الدعم المباشر
      </span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
      </span>
    </a>
  );
};
