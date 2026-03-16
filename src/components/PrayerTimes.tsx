import React, { useEffect, useState } from 'react';
import { fetchPrayerTimes } from '../services/islamicService';
import { PrayerTimes as PrayerTimesType } from '../types';
import { Clock, MapPin, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const regions = [
  { name: 'Toshkent', lat: 41.2995, lng: 69.2401 },
  { name: 'Samarqand', lat: 39.6270, lng: 66.9750 },
  { name: 'Buxoro', lat: 39.7747, lng: 64.4286 },
  { name: 'Andijon', lat: 40.7821, lng: 72.3442 },
  { name: 'Namangan', lat: 40.9983, lng: 71.6726 },
  { name: 'Farg\'ona', lat: 40.3844, lng: 71.7844 },
  { name: 'Urganch', lat: 41.5500, lng: 60.6333 },
  { name: 'Nukus', lat: 42.4608, lng: 59.6122 },
  { name: 'Qarshi', lat: 38.8612, lng: 65.7847 },
  { name: 'Termiz', lat: 37.2242, lng: 67.2783 },
  { name: 'Jizzax', lat: 40.1158, lng: 67.8422 },
  { name: 'Guliston', lat: 40.4897, lng: 68.7847 },
  { name: 'Navoiy', lat: 40.0844, lng: 65.3792 },
];

export const PrayerTimes: React.FC = () => {
  const [times, setTimes] = useState<PrayerTimesType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [showRegionList, setShowRegionList] = useState(false);

  const getTimes = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const data = await fetchPrayerTimes(lat, lng);
      setTimes(data);
      setError(null);
    } catch (err) {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTimes(selectedRegion.lat, selectedRegion.lng);
  }, [selectedRegion]);

  const prayerNames: { [key: string]: string } = {
    Fajr: 'Bomdod',
    Sunrise: 'Quyosh',
    Dhuhr: 'Peshin',
    Asr: 'Asr',
    Maghrib: 'Shom',
    Isha: 'Xufton'
  };

  const currentPrayer = () => {
    if (!times) return null;
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const timesArray = Object.entries(times)
      .filter(([key]) => prayerNames[key])
      .map(([key, value]) => {
        const [h, m] = (value as string).split(':').map(Number);
        return { name: key, minutes: h * 60 + m };
      })
      .sort((a, b) => a.minutes - b.minutes);

    for (let i = timesArray.length - 1; i >= 0; i--) {
      if (currentTime >= timesArray[i].minutes) {
        return timesArray[i].name;
      }
    }
    return 'Isha';
  };

  const activePrayer = currentPrayer();

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-stone-800 mb-4">Namoz Vaqtlari</h1>
          <div className="relative">
            <button 
              onClick={() => setShowRegionList(!showRegionList)}
              className="flex items-center bg-stone-100 hover:bg-stone-200 px-4 py-2 rounded-xl transition-colors text-stone-700"
            >
              <MapPin size={18} className="mr-2 text-emerald-600" />
              <span className="font-medium">{selectedRegion.name}</span>
              <ChevronDown size={18} className={cn("ml-2 transition-transform", showRegionList && "rotate-180")} />
            </button>

            <AnimatePresence>
              {showRegionList && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white border border-stone-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="max-h-80 overflow-y-auto p-2 grid grid-cols-1 gap-1">
                    {regions.map((region) => (
                      <button
                        key={region.name}
                        onClick={() => {
                          setSelectedRegion(region);
                          setShowRegionList(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl transition-colors",
                          selectedRegion.name === region.name 
                            ? "bg-emerald-50 text-emerald-700 font-bold" 
                            : "hover:bg-stone-50 text-stone-600"
                        )}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">Bugun</p>
          <p className="text-3xl font-mono text-emerald-600">{new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[40vh]">
          <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
          <p className="text-stone-500 font-medium italic">Vaqtlar yangilanmoqda...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {times && Object.entries(times)
            .filter(([key]) => prayerNames[key])
            .map(([key, value], index) => {
              const isActive = activePrayer === key;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  key={key}
                  className={cn(
                    "flex flex-col justify-between p-8 rounded-[2.5rem] border transition-all duration-500 h-64",
                    isActive 
                      ? "bg-emerald-600 border-emerald-500 text-white shadow-2xl shadow-emerald-200 scale-[1.05] z-10" 
                      : "bg-white border-stone-100 text-stone-700 hover:border-emerald-200 hover:shadow-xl"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      isActive ? "bg-white/20" : "bg-emerald-50"
                    )}>
                      <Clock size={28} className={isActive ? "text-white" : "text-emerald-600"} />
                    </div>
                    {isActive && (
                      <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        Hozirgi vaqt
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-xl font-medium mb-1",
                      isActive ? "text-white/80" : "text-stone-400"
                    )}>
                      {prayerNames[key]}
                    </h3>
                    <p className="text-5xl font-mono font-light tracking-tighter">{value}</p>
                  </div>
                </motion.div>
              );
            })}
        </div>
      )}

      {error && (
        <p className="mt-12 text-center text-lg text-amber-600 italic bg-amber-50 p-6 rounded-3xl border border-amber-100">{error}</p>
      )}
    </div>
  );
};
