import React, { useState } from 'react';
import { HOLIDAYS } from '../constants';
import { Calendar as CalendarIcon, Moon, Info, History, Star, Heart, ChevronLeft, ChevronRight, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const HIJRI_MONTHS_MAP: Record<string, string> = {
  'Muharram': 'Muharram',
  'Safar': 'Safar',
  'Rabiʻ I': 'Rabiul avval',
  'Rabiʻ II': 'Rabiul oxir',
  'Jumada I': 'Jumodul avval',
  'Jumada II': 'Jumodul oxir',
  'Rajab': 'Rajab',
  'Shaʻban': 'Sha\'bon',
  'Ramadan': 'Ramazon',
  'Shawwal': 'Shavvol',
  'Dhuʻl-Qiʻdah': 'Zulqa\'da',
  'Dhuʻl-Hijjah': 'Zulhijja'
};

export const Calendar: React.FC = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();
  
  const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-uma-nu-latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getHijriInfo = (date: Date) => {
    const parts = hijriFormatter.formatToParts(date);
    const day = parts.find(p => p.type === 'day')?.value || '';
    const month = parts.find(p => p.type === 'month')?.value || '';
    const year = parts.find(p => p.type === 'year')?.value || '';
    return { day, month, year, full: `${day}-${HIJRI_MONTHS_MAP[month] || month}` };
  };

  const currentHijri = getHijriInfo(today);

  const renderMonth = (date: Date, type: 'gregorian' | 'hijri') => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Adjust to Monday start
    
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-14" />);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
      const currentDayDate = new Date(year, month, d);
      const isToday = currentDayDate.toDateString() === today.toDateString();
      const hijri = getHijriInfo(currentDayDate);
      const holiday = HOLIDAYS.find(h => h.hijriDate === hijri.full);

      days.push(
        <div 
          key={d} 
          className={cn(
            "h-10 md:h-14 flex flex-col items-center justify-center rounded-xl md:rounded-2xl text-xs md:text-sm transition-all relative group",
            isToday ? "bg-stone-800 text-white shadow-lg z-10" : "hover:bg-stone-100",
            type === 'hijri' && holiday ? "bg-emerald-100 text-emerald-800 font-bold border border-emerald-200" : ""
          )}
        >
          <span className="font-mono">{type === 'gregorian' ? d : hijri.day}</span>
          {type === 'gregorian' && (
            <span className="text-[8px] md:text-[10px] opacity-50 font-mono">{hijri.day}</span>
          )}
          {type === 'hijri' && holiday && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          )}
          {holiday && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-stone-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {holiday.name}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto h-full flex flex-col">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-stone-800 mb-4">Taqvim</h1>
          <p className="text-stone-500 text-lg italic">Hijriy va Milodiy taqvimlar</p>
        </div>
        <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-200 flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Moon size={32} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-1">Bugun (Hijriy)</p>
            <p className="text-3xl font-mono font-light">{currentHijri.day} {HIJRI_MONTHS_MAP[currentHijri.month] || currentHijri.month}, {currentHijri.year}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Gregorian Calendar */}
        <div className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-serif text-stone-800 flex items-center gap-3">
              <Sun className="text-amber-500" />
              Milodiy
            </h3>
            <div className="flex items-center gap-4">
              <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="font-mono text-sm font-bold uppercase tracking-widest">
                {viewDate.toLocaleString('uz-UZ', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => changeMonth(1)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest py-2">{d}</div>
            ))}
            {renderMonth(viewDate, 'gregorian')}
          </div>
        </div>

        {/* Hijri Calendar */}
        <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-serif text-emerald-800 flex items-center gap-3">
              <Moon className="text-emerald-600" />
              Hijriy
            </h3>
            <div className="text-right">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Islomiy Taqvim</p>
              <p className="font-mono text-sm text-emerald-800">
                {HIJRI_MONTHS_MAP[getHijriInfo(viewDate).month] || getHijriInfo(viewDate).month} {getHijriInfo(viewDate).year}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-emerald-400 uppercase tracking-widest py-2">{d}</div>
            ))}
            {renderMonth(viewDate, 'hijri')}
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-600 font-medium italic">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            Yashil rangda belgilangan kunlar - musulmon bayramlari
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <section>
          <h2 className="text-3xl font-serif text-stone-800 mb-8 flex items-center gap-3">
            <Star className="text-emerald-600" />
            Bayramlar Haqida Ma'lumot
          </h2>
          
          <div className="space-y-8">
            {HOLIDAYS.map((holiday, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={holiday.id}
                className="bg-white border border-stone-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                        <CalendarIcon size={14} />
                        {holiday.hijriDate}
                      </div>
                      <h3 className="text-4xl font-serif text-stone-800">{holiday.name}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-stone-50 p-8 rounded-[2rem] border-l-4 border-emerald-500">
                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-3">
                          <History size={16} />
                          Tarixi
                        </div>
                        <p className="text-stone-700 leading-relaxed italic">
                          {holiday.history}
                        </p>
                      </div>

                      <div className="bg-stone-50 p-8 rounded-[2rem] border-l-4 border-amber-500">
                        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest mb-3">
                          <Info size={16} />
                          Sababi
                        </div>
                        <p className="text-stone-700 leading-relaxed italic">
                          {holiday.reason}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-stone-50 p-8 rounded-[2rem] border-l-4 border-blue-500">
                        <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-widest mb-3">
                          <Heart size={16} />
                          Nishonlanishi
                        </div>
                        <p className="text-stone-700 leading-relaxed italic">
                          {holiday.celebration}
                        </p>
                      </div>

                      <div className="bg-stone-50 p-8 rounded-[2rem] border-l-4 border-purple-500">
                        <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-widest mb-3">
                          <Star size={16} />
                          Ma'lumot
                        </div>
                        <p className="text-stone-700 leading-relaxed italic">
                          {holiday.info}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-20 text-center text-stone-400 text-sm italic pb-12">
        <p>"Alloh taolo bu kunlarni musulmonlar uchun shodlik va xursandchilik kunlari qilib berdi."</p>
      </footer>
    </div>
  );
};
