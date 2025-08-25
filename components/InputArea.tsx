
import React from 'react';

interface InputAreaProps {
  lectureText: string;
  onTextChange: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ lectureText, onTextChange, onGenerate, isLoading }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <textarea
        value={lectureText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Paste your lecture transcript here..."
        className="w-full h-48 p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg border-2 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 transition duration-200 resize-y"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Study Material'
        )}
      </button>
    </div>
  );
};

export default InputArea;
