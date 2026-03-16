import React, { useEffect, useState } from 'react';
import { fetchSurahs, fetchSurahDetail, fetchJuzDetail } from '../services/islamicService';
import { Surah, Ayah } from '../types';
import { BookOpen, Search, ChevronLeft, Loader2, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Quran: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'surah' | 'juz'>('surah');

  useEffect(() => {
    const cachedSurahs = localStorage.getItem('surahs_list');
    if (cachedSurahs) {
      setSurahs(JSON.parse(cachedSurahs));
      setLoading(false);
    }

    fetchSurahs().then((data) => {
      setSurahs(data);
      localStorage.setItem('surahs_list', JSON.stringify(data));
      setLoading(false);
    });
  }, []);

  const handleSurahClick = async (surah: Surah) => {
    setLoadingDetail(true);
    setSelectedSurah(surah);
    setSelectedJuz(null);
    try {
      const data = await fetchSurahDetail(surah.number);
      setAyahs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleJuzClick = async (juzNumber: number) => {
    setLoadingDetail(true);
    setSelectedJuz(juzNumber);
    setSelectedSurah(null);
    try {
      const data = await fetchJuzDetail(juzNumber);
      setAyahs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.includes(searchQuery) ||
    s.number.toString().includes(searchQuery)
  );

  const juzList = Array.from({ length: 30 }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
        <p className="text-stone-500 font-medium italic">Qur'on yuklanmoqda...</p>
      </div>
    );
  }

  const isDetailView = selectedSurah !== null || selectedJuz !== null;

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        {!isDetailView ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 md:p-12 pb-24 max-w-7xl mx-auto w-full"
          >
            <header className="mb-12">
              <h1 className="text-5xl md:text-7xl font-serif font-light text-stone-800 mb-8">Qur'oni Karim</h1>
              
              <div className="flex bg-stone-100 p-1 rounded-2xl mb-8 max-w-md">
                <button 
                  onClick={() => setViewMode('surah')}
                  className={cn(
                    "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                    viewMode === 'surah' ? "bg-white text-emerald-600 shadow-sm" : "text-stone-500"
                  )}
                >
                  Suralar
                </button>
                <button 
                  onClick={() => setViewMode('juz')}
                  className={cn(
                    "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                    viewMode === 'juz' ? "bg-white text-emerald-600 shadow-sm" : "text-stone-500"
                  )}
                >
                  Juzlar
                </button>
              </div>

              {viewMode === 'surah' && (
                <div className="relative max-w-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={24} />
                  <input 
                    type="text"
                    placeholder="Sura nomi yoki raqami..."
                    className="w-full pl-14 pr-4 py-5 bg-white border border-stone-100 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
            </header>

            {viewMode === 'surah' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSurahs.map((surah) => (
                  <button
                    key={surah.number}
                    onClick={() => handleSurahClick(surah)}
                    className="flex items-center p-6 bg-white border border-stone-100 rounded-3xl hover:border-emerald-200 hover:shadow-xl transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-stone-50 group-hover:bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-mono font-bold mr-5 transition-colors">
                      {surah.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-800 text-lg">{surah.englishName}</h3>
                      <p className="text-xs text-stone-400 uppercase tracking-wider">{surah.englishNameTranslation}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-serif text-emerald-700 mb-1">{surah.name}</p>
                      <p className="text-[10px] text-stone-400 uppercase">{surah.numberOfAyahs} oyat</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {juzList.map((juz) => (
                  <button
                    key={juz}
                    onClick={() => handleJuzClick(juz)}
                    className="flex flex-col items-center justify-center p-8 bg-white border border-stone-100 rounded-[2.5rem] hover:border-emerald-200 hover:shadow-xl transition-all group"
                  >
                    <div className="w-16 h-16 bg-emerald-50 group-hover:bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 font-mono font-bold mb-4 text-2xl transition-colors">
                      {juz}
                    </div>
                    <span className="text-stone-800 font-medium text-lg">{juz}-juz</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full max-w-5xl mx-auto w-full"
          >
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-stone-100 p-4 z-10 flex items-center">
              <button 
                onClick={() => { setSelectedSurah(null); setSelectedJuz(null); }}
                className="p-2 hover:bg-stone-50 rounded-full mr-2"
              >
                <ChevronLeft size={24} className="text-stone-600" />
              </button>
              <div>
                <h2 className="font-serif text-xl text-stone-800">
                  {selectedSurah ? selectedSurah.englishName : `${selectedJuz}-juz`}
                </h2>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                  {selectedSurah ? selectedSurah.englishNameTranslation : "Qur'oni Karim"}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-12">
              {loadingDetail ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="animate-spin text-emerald-600 mb-4" size={32} />
                  <p className="text-stone-400 text-sm italic">Oyatlar yuklanmoqda...</p>
                </div>
              ) : (
                <>
                  {selectedSurah && (
                    <div className="text-center mb-12">
                      <p className="text-3xl font-serif text-emerald-800 mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                      <p className="text-xs text-stone-400 uppercase tracking-[0.2em]">Mehribon va rahmli Alloh nomi bilan</p>
                    </div>
                  )}
                  
                  {(() => {
                    if (selectedSurah) {
                      return ayahs.map((ayah, index) => (
                        <div key={`${ayah.number}-${index}`} className="space-y-6">
                          <div className="flex justify-end">
                            <p className="text-3xl font-serif text-stone-800 leading-[1.8] text-right dir-rtl">
                              {ayah.text}
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-emerald-200 text-xs font-mono text-emerald-600 ml-4 align-middle">
                                {ayah.numberInSurah}
                              </span>
                            </p>
                          </div>
                          <div className="bg-stone-50 p-6 rounded-3xl border-l-4 border-emerald-500">
                            <p className="text-stone-700 leading-relaxed italic">
                              {ayah.translation}
                            </p>
                          </div>
                        </div>
                      ));
                    } else if (selectedJuz) {
                      // Group ayahs by surah
                      const groups: { surah: any; ayahs: Ayah[] }[] = [];
                      ayahs.forEach((ayah) => {
                        const lastGroup = groups[groups.length - 1];
                        if (lastGroup && lastGroup.surah.number === ayah.surah?.number) {
                          lastGroup.ayahs.push(ayah);
                        } else {
                          groups.push({ surah: ayah.surah, ayahs: [ayah] });
                        }
                      });

                      return (
                        <div className="space-y-12">
                          {/* Surah Index for this Juz */}
                          <div className="bg-stone-50 p-6 md:p-8 rounded-[2.5rem] border border-stone-100 mb-8">
                            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Ushbu juzdagi suralar:</h4>
                            <div className="flex flex-wrap gap-3">
                              {groups.map((group) => (
                                <button
                                  key={group.surah.number}
                                  onClick={() => {
                                    const element = document.getElementById(`surah-${group.surah.number}`);
                                    if (element) {
                                      const offset = 100; // Account for sticky header
                                      const bodyRect = document.body.getBoundingClientRect().top;
                                      const elementRect = element.getBoundingClientRect().top;
                                      const elementPosition = elementRect - bodyRect;
                                      const offsetPosition = elementPosition - offset;

                                      window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                      });
                                    }
                                  }}
                                  className="px-5 py-3 bg-white border border-stone-200 rounded-2xl text-sm font-medium text-stone-700 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md transition-all"
                                >
                                  <span className="text-emerald-600 font-mono mr-2">{group.surah.number}.</span>
                                  {group.surah.englishName}
                                </button>
                              ))}
                            </div>
                          </div>

                          {groups.map((group, gIndex) => (
                            <div key={group.surah.number} id={`surah-${group.surah.number}`} className="space-y-12 scroll-mt-24">
                              <div className="bg-emerald-50 p-8 rounded-[2.5rem] text-center border border-emerald-100">
                                <h3 className="text-3xl font-serif text-emerald-800 mb-2">{group.surah.name}</h3>
                                <p className="text-sm text-emerald-600 font-bold uppercase tracking-[0.2em]">{group.surah.englishName}</p>
                              </div>
                              
                              {group.ayahs.map((ayah, aIndex) => (
                                <div key={`${ayah.number}-${aIndex}`} className="space-y-6">
                                  <div className="flex justify-end">
                                    <p className="text-3xl md:text-4xl font-serif text-stone-800 leading-[1.8] text-right dir-rtl">
                                      {ayah.text}
                                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-emerald-200 text-sm font-mono text-emerald-600 ml-6 align-middle">
                                        {ayah.numberInSurah}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="bg-stone-50 p-8 rounded-[2rem] border-l-4 border-emerald-500">
                                    <p className="text-stone-700 text-lg leading-relaxed italic">
                                      {ayah.translation}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
