/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PrayerTimes } from './components/PrayerTimes';
import { Qibla } from './components/Qibla';
import { Quran } from './components/Quran';
import { Hadith } from './components/Hadith';
import { Quiz } from './components/Quiz';
import { Calendar } from './components/Calendar';
import { ProfileSetup } from './components/ProfileSetup';
import { ProfileHeader } from './components/ProfileHeader';
import { PasswordManager } from './components/PasswordManager';
import { UserProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('prayer');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    setIsLoaded(true);
  }, []);

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('user_profile', JSON.stringify(newProfile));
  };

  const handlePasswordChange = (newPassword: string) => {
    if (profile) {
      const updatedProfile = { ...profile, passwordHash: newPassword };
      setProfile(updatedProfile);
      localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'prayer':
        return <PrayerTimes />;
      case 'qibla':
        return <Qibla />;
      case 'quran':
        return <Quran />;
      case 'hadith':
        return <Hadith />;
      case 'quiz':
        return <Quiz />;
      case 'calendar':
        return <Calendar />;
      default:
        return <PrayerTimes />;
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {!profile && <ProfileSetup onComplete={handleProfileComplete} />}
      
      {profile && (
        <>
          <ProfileHeader profile={profile} />
          <PasswordManager currentPasswordHash={profile.passwordHash} onPasswordChange={handlePasswordChange} />
          
          <main className="w-full min-h-screen bg-white shadow-2xl shadow-stone-200/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="min-h-screen"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
}
