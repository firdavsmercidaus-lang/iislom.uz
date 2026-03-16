import React, { useState } from 'react';
import { HADITHS } from '../constants';
import { Quote, RefreshCw, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Hadith: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextHadith = () => {
    setIndex((prev) => (prev + 1) % HADITHS.length);
  };

  const currentHadith = HADITHS[index];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto h-full flex flex-col">
      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-serif font-light text-stone-800 mb-4">Hadislar</h1>
        <p className="text-stone-500 text-lg italic">Payg'ambarimiz (s.a.v.) o'gitlari</p>
      </header>

      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHadith.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-100/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Quote size={120} />
            </div>
            
            <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              {currentHadith.category}
            </div>

            <p className="text-2xl font-serif text-stone-800 leading-relaxed mb-8 relative z-10">
              "{currentHadith.text}"
            </p>

            <div className="flex items-center justify-between border-t border-stone-50 pt-6">
              <p className="text-sm text-stone-400 italic font-medium">
                — {currentHadith.source}
              </p>
              <button className="p-2 text-stone-400 hover:text-emerald-600 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <button
            onClick={nextHadith}
            className="flex items-center px-8 py-4 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 active:scale-95"
          >
            <RefreshCw size={20} className="mr-3" />
            <span>Keyingi hadis</span>
          </button>
        </div>
      </div>

      <p className="mt-12 text-center text-xs text-stone-400 px-8 leading-relaxed italic">
        "Sizlardan kim bir yomonlikni ko'rsa, uni qo'li bilan o'zgartirsin, bunga qodir bo'lmasa tili bilan, bunga ham qodir bo'lmasa dili bilan..."
      </p>
    </div>
  );
};
