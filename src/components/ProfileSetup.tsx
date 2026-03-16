import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Mail, Phone, Globe, Calendar, FileText, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    language: 'O\'zbek',
    email: '',
    phone: '',
    bio: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Parollar mos kelmadi!");
      return;
    }

    const profile: UserProfile = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age),
      language: formData.language,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      passwordHash: formData.password // In a real app, hash this
    };

    onComplete(profile);
  };

  return (
    <div className="fixed inset-0 bg-stone-50 z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-xl border border-stone-100"
      >
        <header className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <User size={32} />
          </div>
          <h1 className="text-3xl font-serif text-stone-800">Xush kelibsiz!</h1>
          <p className="text-stone-500 text-sm mt-2">Iltimos, profilingizni sozlang</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase ml-1">Ism</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="Ali" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase ml-1">Familiya</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="Valiyev" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">Yosh</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full pl-12 p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="25" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">Til</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <select name="language" value={formData.language} onChange={handleChange} className="w-full pl-12 p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none appearance-none">
                    <option>O'zbek</option>
                    <option>English</option>
                    <option>Русский</option>
                  </select>
                </div>
              </div>
              <button type="button" onClick={nextStep} className="w-full bg-emerald-600 text-white p-5 rounded-2xl font-bold flex items-center justify-center hover:bg-emerald-700 transition-all">
                Keyingisi <ArrowRight size={20} className="ml-2" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-12 p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="example@mail.com" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="+998 90 123 45 67" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">O'zingiz haqingizda</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-stone-300" size={18} />
                  <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full pl-12 p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none h-24 resize-none" placeholder="Qisqacha ma'lumot..." />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={prevStep} className="flex-1 bg-stone-100 text-stone-600 p-5 rounded-2xl font-bold">Orqaga</button>
                <button type="button" onClick={nextStep} className="flex-1 bg-emerald-600 text-white p-5 rounded-2xl font-bold">Keyingisi</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">Parol o'rnating</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full pl-12 p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="••••••••" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">Parolni tasdiqlang</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-12 p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 outline-none" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={prevStep} className="flex-1 bg-stone-100 text-stone-600 p-5 rounded-2xl font-bold">Orqaga</button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white p-5 rounded-2xl font-bold">Tamomlash</button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};
