import React from 'react';

interface AlphabetSelectorProps {
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
}

const AlphabetSelector: React.FC<AlphabetSelectorProps> = ({ selectedLetter, onSelectLetter }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {alphabet.split('').map((letter) => (
        <button
          key={letter}
          onClick={() => onSelectLetter(letter)}
          className={`px-4 py-2 rounded-lg font-bold ${
            selectedLetter === letter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetSelector;
