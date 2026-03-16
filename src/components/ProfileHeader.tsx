import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, X, Mail, Phone, Globe, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-white rounded-2xl shadow-md border border-stone-100 flex items-center justify-center text-emerald-600 hover:scale-110 transition-transform"
        >
          <User size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-start justify-end p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="relative w-full max-w-sm bg-white h-fit rounded-[2.5rem] shadow-2xl border border-stone-100 p-8 overflow-hidden"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-stone-50 rounded-full text-stone-400"
              >
                <X size={20} />
              </button>

              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mr-4">
                  <User size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-stone-800">{profile.firstName} {profile.lastName}</h2>
                  <p className="text-emerald-600 text-sm font-medium">{profile.language} tili</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center text-stone-600">
                  <Calendar size={18} className="mr-4 text-stone-300" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Yosh</p>
                    <p className="font-medium">{profile.age} yosh</p>
                  </div>
                </div>

                <div className="flex items-center text-stone-600">
                  <Mail size={18} className="mr-4 text-stone-300" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Elektron pochta</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center text-stone-600">
                  <Phone size={18} className="mr-4 text-stone-300" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Telefon</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-50">
                  <div className="flex items-start text-stone-600">
                    <FileText size={18} className="mr-4 mt-1 text-stone-300" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400">Qisqacha izoh</p>
                      <p className="text-sm leading-relaxed italic text-stone-500">{profile.bio || "Izoh yo'q"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
