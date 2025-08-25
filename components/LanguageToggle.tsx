
import React from 'react';

interface LanguageToggleProps {
  selectedLanguage: 'English' | 'Hindi';
  onLanguageChange: (language: 'English' | 'Hindi') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ selectedLanguage, onLanguageChange }) => {
  const isEnglish = selectedLanguage === 'English';

  const toggleLanguage = () => {
    onLanguageChange(isEnglish ? 'Hindi' : 'English');
  };

  return (
    <div className="flex items-center space-x-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
      <button
        onClick={() => onLanguageChange('English')}
        className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
          isEnglish ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow' : 'text-slate-600 dark:text-slate-300'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange('Hindi')}
        className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
          !isEnglish ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow' : 'text-slate-600 dark:text-slate-300'
        }`}
      >
        Hindi
      </button>
    </div>
  );
};

export default LanguageToggle;
