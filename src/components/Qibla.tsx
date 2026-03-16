import React, { useEffect, useState } from 'react';
import { calculateQibla } from '../services/islamicService';
import { Compass, MapPin, Loader2, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

export const Qibla: React.FC = () => {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const angle = calculateQibla(latitude, longitude);
          setQiblaAngle(angle);
          setLoading(false);
        },
        () => {
          setError("Joylashuv aniqlanmadi. Qibla burchagi Toshkent bo'yicha hisoblandi.");
          const angle = calculateQibla(41.2995, 69.2401);
          setQiblaAngle(angle);
          setLoading(false);
        },
        { timeout: 5000 }
      );

      const handleOrientation = (event: any) => {
        if (event.webkitCompassHeading) {
          setHeading(event.webkitCompassHeading);
        } else if (event.alpha) {
          setHeading(360 - event.alpha);
        }
      };

      window.addEventListener('deviceorientation', handleOrientation, true);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
        <p className="text-stone-500 font-medium italic">Qibla yo'nalishi aniqlanmoqda...</p>
      </div>
    );
  }

  const relativeAngle = qiblaAngle !== null ? (qiblaAngle - heading + 360) % 360 : 0;

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto flex flex-col items-center">
      <header className="mb-12 text-center w-full">
        <h1 className="text-5xl md:text-7xl font-serif font-light text-stone-800 mb-4">Qibla</h1>
        <p className="text-stone-500 text-lg italic">Ka'ba tomonga yo'naling</p>
      </header>

      <div className="relative w-80 h-80 md:w-96 md:h-96 mb-16">
        {/* Compass Ring */}
        <div className="absolute inset-0 border-4 border-stone-100 rounded-full" />
        <div className="absolute inset-4 border border-stone-100 rounded-full border-dashed" />
        
        {/* Cardinal Points */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-stone-400 font-bold text-xs">N</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-stone-400 font-bold text-xs">S</span>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 text-stone-400 font-bold text-xs">W</span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 text-stone-400 font-bold text-xs">E</span>

        {/* Qibla Needle */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: relativeAngle }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        >
          <div className="relative h-full w-1 flex flex-col items-center">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center -mt-4 shadow-lg shadow-emerald-200">
              <ArrowUp size={20} className="text-white" />
            </div>
            <div className="w-1 h-32 bg-emerald-600 rounded-full" />
            <div className="w-4 h-4 bg-emerald-100 rounded-full mt-auto mb-24" />
          </div>
        </motion.div>

        {/* Center Point */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-stone-800 rounded-full border-2 border-white shadow-sm" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm w-full text-center">
        <div className="flex items-center justify-center text-emerald-600 mb-2">
          <Compass size={24} className="mr-2" />
          <span className="text-3xl font-mono font-light tracking-tighter">
            {qiblaAngle?.toFixed(1)}°
          </span>
        </div>
        <p className="text-stone-500 text-sm">Sizning joylashuvingizdan Ka'ba burchagi</p>
      </div>

      {error && (
        <p className="mt-8 text-center text-sm text-amber-600 italic bg-amber-50 p-4 rounded-2xl w-full">
          {error}
        </p>
      )}

      <p className="mt-8 text-xs text-stone-400 text-center px-8 leading-relaxed">
        Eslatma: Compass aniqligi qurilmangiz datchiklariga bog'liq. To'g'ri natija uchun qurilmani tekis tuting.
      </p>
    </div>
  );
};
