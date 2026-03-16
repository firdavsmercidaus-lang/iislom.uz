import { Hadith, QuizQuestion } from './types';

export const HADITHS: Hadith[] = [
  {
    id: 1,
    text: "Sizlarning eng yaxshingiz Qur'onni o'rgangan va uni o'rgatganingizdir.",
    source: "Buxoriy rivoyati",
    category: "Ilm"
  },
  {
    id: 2,
    text: "Amallar niyatga bog'liqdir. Har bir kishi niyat qilgan narsasiga erishadi.",
    source: "Buxoriy va Muslim rivoyati",
    category: "Niyat"
  },
  {
    id: 3,
    text: "Mo'min kishi o'zi uchun yaxshi ko'rgan narsani birodari uchun ham ilinmaguncha komil mo'min bo'la olmaydi.",
    source: "Buxoriy va Muslim rivoyati",
    category: "Birodarlik"
  },
  {
    id: 4,
    text: "Qayerda bo'lsang ham Allohdan qo'rq. Yomonlik ketidan uni o'chiruvchi yaxshilikni ergashtir. Odamlarga chiroyli xulq bilan muomala qil.",
    source: "Termiziy rivoyati",
    category: "Taqvo"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Islomning necha ustuni bor?",
    options: ["3 ta", "5 ta", "7 ta", "4 ta"],
    correctAnswer: 1,
    explanation: "Islomning 5 ta ustuni bor: Iymon, Namoz, Ro'za, Zakot va Haj."
  },
  {
    id: 2,
    question: "Payg'ambarimiz Muhammad (s.a.v.) qaysi shaharda tug'ilganlar?",
    options: ["Madina", "Quddus", "Makka", "Toif"],
    correctAnswer: 2,
    explanation: "Payg'ambarimiz Muhammad (s.a.v.) Makka shahrida tug'ilganlar."
  },
  {
    id: 3,
    question: "Qur'oni Karimda necha sura bor?",
    options: ["110 ta", "114 ta", "120 ta", "100 ta"],
    correctAnswer: 1,
    explanation: "Qur'oni Karimda 114 ta sura bor."
  },
  {
    id: 4,
    question: "Bir kunda necha vaqt namoz o'qish farz qilingan?",
    options: ["3 vaqt", "4 vaqt", "5 vaqt", "6 vaqt"],
    correctAnswer: 2,
    explanation: "Musulmonlar uchun bir kunda 5 vaqt namoz o'qish farzdir."
  }
];

export const HOLIDAYS: any[] = [
  {
    id: 1,
    name: "Ramazon Hayiti (Iyd al-Fitr)",
    hijriDate: "1-Shavvol",
    history: "Ramazon hayiti Islom tarixida hijratning ikkinchi yilidan boshlab nishonlana boshlagan. Bu kun Ramazon oyi ro'zasi tugaganidan so'ng quvonch va shukronalik kuni sifatida belgilangan.",
    reason: "Bir oy davomida tutilgan ro'za, qilingan ibodatlar va nafs ustidan qozonilgan g'alabani nishonlash, Allohning ne'matlariga shukrona keltirish uchun nishonlanadi.",
    celebration: "Hayit kuni erta tongda jamoat bo'lib Hayit namozi o'qiladi. Namozdan oldin Fitr sadaqasi beriladi. Odamlar bir-birlarini tabriklaydilar, qarindosh-urug'larni ziyorat qiladilar, shirinliklar ulashiladi.",
    info: "Bu kun musulmonlar uchun birdamlik, saxovat va mehr-oqibat ramzidir."
  },
  {
    id: 2,
    name: "Qurbon Hayiti (Iyd al-Adha)",
    hijriDate: "10-Zulhijja",
    history: "Bu bayram Ibrohim alayhissalomning Allohga bo'lgan sadoqatlari va o'g'illari Ismoil alayhissalomni qurbon qilishga tayyor bo'lganlari xotirasiga bag'ishlangan. Alloh u kishining sadoqatlarini qabul qilib, o'rniga jannatdan qo'chqor tushirgan.",
    reason: "Allohga bo'lgan cheksiz sadoqat va itoatni namoyon etish, qurbonlik qilish orqali muhtojlarga yordam berish maqsadida nishonlanadi.",
    celebration: "Hayit namozidan so'ng qurbonlik qilinadi. Qurbonlik go'shti uch qismga bo'linadi: bir qismi oilaga, bir qismi qarindoshlarga, bir qismi esa muhtojlarga tarqatiladi.",
    info: "Qurbon hayiti Haj ibodatining yakuniy qismi bilan ham bog'liqdir."
  },
  {
    id: 3,
    name: "Ashuro kuni",
    hijriDate: "10-Muharram",
    history: "Ashuro kuni ko'plab muhim tarixiy voqealar sodir bo'lgan. Masalan, Nuh alayhissalomning kemasi to'xtagan, Muso alayhissalom va u kishining qavmi Fir'avndan qutulgan kun.",
    reason: "Allohning payg'ambarlariga ko'rsatgan marhamati va najoti uchun shukrona keltirish maqsadida nishonlanadi.",
    celebration: "Bu kuni ro'za tutish sunnat hisoblanadi. Shuningdek, oila a'zolariga kengchilik qilish, yaxshi taomlar tayyorlash tavsiya etiladi.",
    info: "Payg'ambarimiz (s.a.v.) Ashuro kuni bilan birga bir kun oldin yoki bir kun keyin ham ro'za tutishni tavsiya qilganlar."
  },
  {
    id: 4,
    name: "Mavlid al-Nabi",
    hijriDate: "12-Rabiul avval",
    history: "Bu kun Payg'ambarimiz Muhammad (s.a.v.)ning tavallud topgan kunlari sifatida tanilgan. Islom olamida bu kunni nishonlash keyinchalik an'anaga aylangan.",
    reason: "Payg'ambarimiz (s.a.v.)ning hayotlari, axloqlari va Islom diniga qo'shgan hissalarini yod etish, u kishiga salovotlar aytish uchun nishonlanadi.",
    celebration: "Masjidlarda va xonadonlarda Payg'ambarimiz (s.a.v.)ning hayotlari haqida ma'ruzalar qilinadi, siyrat kitoblari o'qiladi, salovotlar aytiladi va xayriya tadbirlari o'tkaziladi.",
    info: "Mavlid oyi davomida ko'proq salovot aytish va sunnatlarga amal qilish fazilatli hisoblanadi."
  }
];
