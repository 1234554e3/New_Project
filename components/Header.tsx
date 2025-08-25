
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
        AI Lecture <span className="text-sky-500 dark:text-sky-400">Companion</span>
      </h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Paste your lecture notes, transcript, or text below and let AI create your personalized study guide.
      </p>
    </header>
  );
};

export default Header;
