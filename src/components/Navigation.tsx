import React from 'react';
import { Clock, Compass, BookOpen, Quote, Gamepad2, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'prayer', label: 'Namoz', icon: Clock },
  { id: 'qibla', label: 'Qibla', icon: Compass },
  { id: 'quran', label: 'Qur\'on', icon: BookOpen },
  { id: 'hadith', label: 'Hadis', icon: Quote },
  { id: 'calendar', label: 'Taqvim', icon: CalendarIcon },
  { id: 'quiz', label: 'O\'yin', icon: Gamepad2 },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-200 px-4 pb-safe pt-2 z-50">
      <div className="max-w-7xl mx-auto flex justify-around md:justify-center md:gap-12 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200",
                isActive ? "text-emerald-600 bg-emerald-50" : "text-stone-500 hover:text-stone-700"
              )}
            >
              <Icon size={24} className={cn("mb-1", isActive && "scale-110")} />
              <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
