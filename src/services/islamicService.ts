import { PrayerTimes, Surah, Ayah } from '../types';

export async function fetchPrayerTimes(lat: number, lng: number): Promise<PrayerTimes> {
  const date = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');
  const response = await fetch(`https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=3`);
  const data = await response.json();
  return data.data.timings;
}

export async function fetchSurahs(): Promise<Surah[]> {
  const response = await fetch('https://api.alquran.cloud/v1/surah');
  const data = await response.json();
  return data.data;
}

export async function fetchSurahDetail(number: number): Promise<Ayah[]> {
  // Fetching Arabic text and Uzbek translation
  const [arabicRes, translationRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${number}`),
    fetch(`https://api.alquran.cloud/v1/surah/${number}/uz.sodik`)
  ]);
  
  const arabicData = await arabicRes.json();
  const translationData = await translationRes.json();
  
  return arabicData.data.ayahs.map((ayah: any, index: number) => ({
    ...ayah,
    translation: translationData.data.ayahs[index].text
  }));
}

export async function fetchJuzDetail(number: number): Promise<Ayah[]> {
  const [arabicRes, translationRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/juz/${number}`),
    fetch(`https://api.alquran.cloud/v1/juz/${number}/uz.sodik`)
  ]);
  
  const arabicData = await arabicRes.json();
  const translationData = await translationRes.json();
  
  return arabicData.data.ayahs.map((ayah: any, index: number) => ({
    ...ayah,
    translation: translationData.data.ayahs[index].text
  }));
}

export function calculateQibla(lat: number, lng: number): number {
  const meccaLat = 21.4225;
  const meccaLng = 39.8262;
  
  const φ1 = lat * (Math.PI / 180);
  const φ2 = meccaLat * (Math.PI / 180);
  const Δλ = (meccaLng - lng) * (Math.PI / 180);
  
  const y = Math.sin(Δλ);
  const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
  let qibla = Math.atan2(y, x) * (180 / Math.PI);
  
  return (qibla + 360) % 360;
}
