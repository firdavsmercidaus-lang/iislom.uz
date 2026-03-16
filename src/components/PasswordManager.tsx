import React, { useState, useEffect } from 'react';
import { Eye, Lock, X, Check, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PasswordManagerProps {
  currentPasswordHash: string;
  onPasswordChange: (newPassword: string) => void;
}

export const PasswordManager: React.FC<PasswordManagerProps> = ({ currentPasswordHash, onPasswordChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'old' | 'new'>('old');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
    } else if (lockTimer === 0) {
      setIsLocked(false);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimer]);

  const handleVerifyOld = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    if (oldPassword === currentPasswordHash) {
      setStep('new');
      setError(null);
    } else {
      setError("Eski parol noto'g'ri!");
      setIsLocked(true);
      setLockTimer(30);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Parollar mos kelmadi!");
      return;
    }
    onPasswordChange(newPassword);
    setIsOpen(false);
    resetState();
  };

  const resetState = () => {
    setStep('old');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 group">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 bg-red-500/0 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <Eye size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8"
            >
              <header className="text-center mb-8">
                <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-red-600">
                  <Lock size={32} />
                </div>
                <h2 className="text-2xl font-serif text-stone-800">Parolni o'zgartirish</h2>
                <p className="text-stone-500 text-sm mt-1">
                  {step === 'old' ? "Avval eski parolni kiriting" : "Yangi parolni kiriting"}
                </p>
              </header>

              {isLocked ? (
                <div className="text-center p-6 bg-red-50 rounded-3xl border border-red-100">
                  <p className="text-red-600 font-medium mb-2">Bloklandi!</p>
                  <p className="text-stone-500 text-sm">Iltimos, {lockTimer} soniya kuting...</p>
                </div>
              ) : (
                <form onSubmit={step === 'old' ? handleVerifyOld : handleUpdatePassword} className="space-y-4">
                  {step === 'old' ? (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-400 uppercase ml-1">Eski parol</label>
                      <input 
                        required 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500/20 outline-none" 
                        placeholder="••••••••" 
                      />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-400 uppercase ml-1">Yangi parol</label>
                        <input 
                          required 
                          type="password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" 
                          placeholder="••••••••" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-400 uppercase ml-1">Tasdiqlash</label>
                        <input 
                          required 
                          type="password" 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" 
                          placeholder="••••••••" 
                        />
                      </div>
                    </>
                  )}

                  {error && <p className="text-red-500 text-xs text-center italic">{error}</p>}

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => {
                        if (step === 'new') setStep('old');
                        else setIsOpen(false);
                      }} 
                      className="flex-1 bg-stone-100 text-stone-600 p-4 rounded-2xl font-bold flex items-center justify-center"
                    >
                      <ArrowLeft size={18} className="mr-2" /> Orqaga
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 bg-emerald-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center"
                    >
                      Tasdiqlash <Check size={18} className="ml-2" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
