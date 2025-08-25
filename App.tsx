
import React from 'react';
import { useState } from 'react';
import type { StudyMaterial } from './types';
import { generateStudyMaterial } from './services/geminiService';
import Header from './components/Header';
import InputArea from './components/InputArea';
import OutputDisplay from './components/OutputDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import LanguageToggle from './components/LanguageToggle';

function App(): React.ReactNode {
  const [lectureText, setLectureText] = useState<string>('');
  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');

  const handleGenerate = async () => {
    if (!lectureText.trim()) {
      setError('Please enter some lecture text.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStudyMaterial(null);

    try {
      const result = await generateStudyMaterial(lectureText, language);
      setStudyMaterial(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />

        <main>
          <div className="flex justify-end mb-4">
            <LanguageToggle selectedLanguage={language} onLanguageChange={setLanguage} />
          </div>
          
          <InputArea
            lectureText={lectureText}
            onTextChange={setLectureText}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          {isLoading && (
            <div className="flex flex-col items-center justify-center mt-12">
              <LoadingSpinner />
              <p className="mt-4 text-sky-600 dark:text-sky-400">Brewing your study guide...</p>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {studyMaterial && !isLoading && (
            <div className="mt-8">
              <OutputDisplay material={studyMaterial} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
