import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { Trophy, ArrowRight, RotateCcw, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Quiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUIZ_QUESTIONS[currentStep].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <div className="p-6 md:p-12 max-w-7xl mx-auto h-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 md:p-20 rounded-[4rem] border border-stone-100 shadow-2xl w-full max-w-2xl"
        >
          <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Trophy size={64} className="text-emerald-600" />
          </div>
          <h2 className="text-5xl font-serif text-stone-800 mb-4">Natija</h2>
          <p className="text-stone-500 text-xl mb-12">Siz {QUIZ_QUESTIONS.length} tadan {score} ta to'g'ri javob berdingiz.</p>
          
          <div className="text-8xl font-serif text-emerald-600 mb-16">
            {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
          </div>

          <button
            onClick={resetQuiz}
            className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-bold text-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center"
          >
            <RotateCcw size={24} className="mr-3" />
            Qaytadan boshlash
          </button>
        </motion.div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto h-full flex flex-col">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-stone-800 mb-4">Viktorina</h1>
          <p className="text-stone-500 text-lg italic">Bilimingizni sinab ko'ring</p>
        </div>
        <div className="bg-stone-100 px-6 py-3 rounded-2xl text-stone-600 font-mono text-xl">
          {currentStep + 1} / {QUIZ_QUESTIONS.length}
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm">
              <h3 className="text-3xl font-serif text-stone-800 leading-relaxed">
                {question.question}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                const isCorrect = index === question.correctAnswer;
                const isSelected = selectedOption === index;
                
                let buttonClass = "bg-white border-stone-100 text-stone-700";
                if (isAnswered) {
                  if (isCorrect) buttonClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
                  else if (isSelected) buttonClass = "bg-rose-50 border-rose-500 text-rose-700";
                  else buttonClass = "bg-white border-stone-50 text-stone-300";
                } else {
                  buttonClass = "bg-white border-stone-100 text-stone-700 hover:border-emerald-300 hover:bg-emerald-50/30";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full p-8 rounded-3xl border text-left font-medium text-lg transition-all flex items-center justify-between",
                      buttonClass
                    )}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={24} className="text-emerald-500" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={24} className="text-rose-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100"
              >
                <div className="flex items-center text-emerald-700 font-bold text-xs uppercase tracking-widest mb-2">
                  <HelpCircle size={14} className="mr-2" />
                  Izoh
                </div>
                <p className="text-emerald-800 text-sm leading-relaxed italic">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {isAnswered && (
        <div className="mt-8">
          <button
            onClick={nextQuestion}
            className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold shadow-xl shadow-stone-200 hover:bg-stone-800 transition-all flex items-center justify-center group"
          >
            <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? "Natijani ko'rish" : "Keyingi savol"}</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
