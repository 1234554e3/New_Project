
import React from 'react';
import { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group h-48 [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full rounded-lg shadow-md transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 bg-sky-100 dark:bg-sky-900/50 border border-sky-200 dark:border-sky-800 rounded-lg [backface-visibility:hidden]">
          <p className="text-center text-slate-800 dark:text-slate-200 font-medium">{front}</p>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-center text-slate-700 dark:text-slate-300">{back}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
