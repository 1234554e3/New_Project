import React from 'react';
import type { StudyMaterial } from '../types';
import StudyMaterialSection from './StudyMaterialSection';
import Flashcard from './Flashcard';

// Import existing icons
import BookOpenIcon from './icons/BookOpenIcon';
import MapIcon from './icons/MapIcon';
import QuizIcon from './icons/QuizIcon';
import CardsIcon from './icons/CardsIcon';
import ChildIcon from './icons/ChildIcon';

// Import new icons
import SparklesIcon from './icons/SparklesIcon';
import MicroscopeIcon from './icons/MicroscopeIcon';
import BrainIcon from './icons/BrainIcon';
import LinkIcon from './icons/LinkIcon';


interface OutputDisplayProps {
  material: StudyMaterial;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ material }) => {
  return (
    <div className="space-y-8">
      {/* Ultra-short Summary */}
      <StudyMaterialSection title="Ultra-short Summary" icon={<SparklesIcon />}>
        <p className="text-lg italic text-slate-600 dark:text-slate-300">
          "{material.summary.ultra_short}"
        </p>
      </StudyMaterialSection>

      {/* Medium Summary */}
      <StudyMaterialSection title="Medium Summary (Bullets)" icon={<BookOpenIcon />}>
        <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          {material.summary.medium.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </StudyMaterialSection>
      
      {/* Detailed Explanation */}
      <StudyMaterialSection title="Detailed Explanation" icon={<MicroscopeIcon />}>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {material.summary.detailed}
        </p>
      </StudyMaterialSection>

      {/* Concept Visualization */}
      <StudyMaterialSection title="Concept Visualization Ideas" icon={<MapIcon />}>
        <div className="space-y-4">
            <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                {material.visualization.ideas.map((idea, index) => (
                <li key={index}>{idea}</li>
                ))}
            </ul>
            {material.visualization.mermaid && (
            <div>
                <h4 className="font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-200">Mermaid Diagram Code:</h4>
                <pre className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-cyan-700 dark:text-cyan-400 font-mono">
                    {material.visualization.mermaid}
                </code>
                </pre>
            </div>
            )}
        </div>
      </StudyMaterialSection>

      {/* Quiz Questions */}
      <StudyMaterialSection title="Quiz Questions" icon={<QuizIcon />}>
        <ol className="list-decimal space-y-6 pl-5">
          {/* MCQs */}
          {material.quiz.mcq.map((q, index) => (
            <li key={`mcq-${index}`} className="space-y-2">
              <p className="font-semibold">{q.q} <span className="text-xs font-normal bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-2 py-1 rounded-full ml-2">MCQ</span></p>
              {q.options && (
                <ul className="space-y-1 pl-4" style={{ listStyleType: 'lower-alpha' }}>
                  {q.options.map((opt, optIndex) => (
                    <li key={optIndex} className="text-slate-600 dark:text-slate-300">
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-sm">
                <strong className="text-sky-700 dark:text-sky-400">Answer:</strong>
                <span className="ml-2 text-slate-600 dark:text-slate-300">{q.answer}</span>
              </p>
            </li>
          ))}
          {/* Short Answer */}
          {material.quiz.short_answer.map((q, index) => (
             <li key={`sa-${index}`} className="space-y-2">
                <p className="font-semibold">{q} <span className="text-xs font-normal bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full ml-2">Short Answer</span></p>
             </li>
          ))}
        </ol>
      </StudyMaterialSection>

      {/* Flashcards */}
      <StudyMaterialSection title="Flashcards" icon={<CardsIcon />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {material.quiz.flashcards.map((card, index) => (
            <Flashcard key={index} front={card.front} back={card.back} />
          ))}
        </div>
      </StudyMaterialSection>

      {/* Critical Thinking Questions */}
      <StudyMaterialSection title="Critical Thinking Questions" icon={<BrainIcon />}>
        <ul className="list-disc space-y-3 pl-5 text-slate-600 dark:text-slate-300">
          {material.quiz.critical_thinking.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </StudyMaterialSection>

      {/* Simplified Explanation */}
      <StudyMaterialSection title="Simplified Version (Beginner)" icon={<ChildIcon />}>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {material.simplified.beginner_friendly}
        </p>
      </StudyMaterialSection>
      
      {/* Hindi Explanation if available */}
      {material.simplified.hindi && (
          <StudyMaterialSection title="सरल व्याख्या (हिंदी)" icon={<ChildIcon />}>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-['Noto_Sans_Devanagari']">
              {material.simplified.hindi}
            </p>
          </StudyMaterialSection>
      )}

      {/* Extra Resources */}
      <StudyMaterialSection title="Extra Resources" icon={<LinkIcon />}>
        <div className="space-y-4">
          {material.resources.map((resource, index) => (
            <div key={index} className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sky-700 dark:text-sky-400">
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {resource.title}
                        </a>
                    </h4>
                    <span className="text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full capitalize">{resource.type}</span>
                </div>
            </div>
          ))}
        </div>
      </StudyMaterialSection>
    </div>
  );
};

export default OutputDisplay;