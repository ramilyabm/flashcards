import type { FC } from 'react';
import { getAllDecks } from '../data/cardUtils';
import type { Deck } from '../data/cards';

interface CategorySelectionProps {
  onSelectDeck: (deckId: string) => void;
  onBack: () => void;
}

const CategorySelection: FC<CategorySelectionProps> = ({ onSelectDeck, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border border-white/20">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          📚 Choose a Deck
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Select a category to start studying
        </p>
        
        <div className="space-y-4 mb-8">
          {getAllDecks().map((deck: Deck) => (
            <button
              key={deck.id}
              onClick={() => onSelectDeck(deck.id)}
              className="w-full bg-white hover:bg-blue-50 text-gray-800 font-semibold py-4 px-6 border-2 border-blue-200 hover:border-blue-400 rounded-lg transition duration-200 shadow-sm hover:shadow-md"
            >
              <div className="text-left">
                <div className="text-xl font-bold text-blue-600 mb-1">
                  {deck.name}
                </div>
                <div className="text-gray-600 text-sm">
                  {deck.description}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default CategorySelection; 