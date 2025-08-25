
import React from 'react';

interface StudyMaterialSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const StudyMaterialSection: React.FC<StudyMaterialSectionProps> = ({ title, icon, children }) => {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h3 className="flex items-center text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
        <span className="text-sky-500 dark:text-sky-400 mr-3">{icon}</span>
        {title}
      </h3>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
};

export default StudyMaterialSection;
