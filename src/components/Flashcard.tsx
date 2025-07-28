import type { FC } from 'react';
import { useState } from 'react';
import type { Card } from '../data/cards';

interface FlashcardProps {
  card: Card;
  onNext: () => void;
  onMarkCorrect: () => void;
  onMarkIncorrect: () => void;
}

const Flashcard: FC<FlashcardProps> = ({ card, onNext, onMarkCorrect, onMarkIncorrect }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCorrect = () => {
    onMarkCorrect();
    setIsFlipped(false);
    onNext();
  };

  const handleIncorrect = () => {
    onMarkIncorrect();
    setIsFlipped(false);
    onNext();
  };

  return (
    <div className="max-w-lg w-full mx-auto">
      {/* Flashcard */}
      <div
        onClick={handleFlip}
        className="relative w-full h-64 cursor-pointer mb-6 transform transition-transform duration-300 hover:scale-105"
      >
        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {isFlipped ? card.english : card.russian}
            </div>
            {card.example && isFlipped && (
              <div className="text-sm text-gray-600 italic mt-4 px-4">
                "{card.example}"
              </div>
            )}
            <div className="text-sm text-gray-500 mt-6">
              {isFlipped ? 'English' : 'Русский'}
            </div>
            {!isFlipped && (
              <div className="text-xs text-gray-400 mt-2">
                Click to flip
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons - Only show after flip */}
      {isFlipped && (
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleIncorrect}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            ❌ Wrong
          </button>
          <button
            onClick={handleCorrect}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            ✅ Right
          </button>
        </div>
      )}

      {/* Instructions */}
      {!isFlipped && (
        <div className="text-center text-gray-600 text-sm">
          <p>Look at the Russian word and try to remember the English translation.</p>
          <p className="mt-1">Click the card when ready to check your answer.</p>
        </div>
      )}
    </div>
  );
};

export default Flashcard; 