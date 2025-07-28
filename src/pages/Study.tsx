import type { FC } from 'react';
import { useState } from 'react';
import CategorySelection from '../components/CategorySelection';
import Flashcard from '../components/Flashcard';
import { getCardsByDeck, getDeckById } from '../data/cards';
import type { Card } from '../data/cards';

interface StudyProps {
  onNavigateHome: () => void;
}

const Study: FC<StudyProps> = ({ onNavigateHome }) => {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [correctCards, setCorrectCards] = useState<string[]>([]);
  const [incorrectCards, setIncorrectCards] = useState<string[]>([]);

  const handleSelectDeck = (deckId: string) => {
    const deckCards = getCardsByDeck(deckId);
    setCards(deckCards);
    setSelectedDeck(deckId);
    setCurrentCardIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
  };

  const handleBack = () => {
    setSelectedDeck(null);
    setCards([]);
    setCurrentCardIndex(0);
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End of deck - show completion screen
      setCurrentCardIndex(-1);
    }
  };

  const handleMarkCorrect = () => {
    const currentCard = cards[currentCardIndex];
    if (!correctCards.includes(currentCard.id)) {
      setCorrectCards([...correctCards, currentCard.id]);
    }
    // Remove from incorrect if it was there
    setIncorrectCards(incorrectCards.filter(id => id !== currentCard.id));
  };

  const handleMarkIncorrect = () => {
    const currentCard = cards[currentCardIndex];
    if (!incorrectCards.includes(currentCard.id)) {
      setIncorrectCards([...incorrectCards, currentCard.id]);
    }
    // Remove from correct if it was there
    setCorrectCards(correctCards.filter(id => id !== currentCard.id));
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
  };

  // Show category selection if no deck is selected
  if (!selectedDeck) {
    return (
      <CategorySelection 
        onSelectDeck={handleSelectDeck}
        onBack={onNavigateHome}
      />
    );
  }

  // Show completion screen if we've gone through all cards
  if (currentCardIndex === -1) {
    const deck = getDeckById(selectedDeck);
    const accuracy = cards.length > 0 ? Math.round((correctCards.length / cards.length) * 100) : 0;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border border-white/20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🎉 Deck Complete!
          </h1>
          <h2 className="text-xl text-blue-600 font-semibold mb-6">
            {deck?.name}
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {accuracy}% Accuracy
            </div>
            <div className="text-gray-600">
              <div className="flex justify-between mb-1">
                <span>✅ Correct:</span>
                <span className="font-semibold text-green-600">{correctCards.length}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>❌ Incorrect:</span>
                <span className="font-semibold text-red-600">{incorrectCards.length}</span>
              </div>
              <div className="flex justify-between">
                <span>📊 Total:</span>
                <span className="font-semibold">{cards.length}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleRestart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              🔄 Study Again
            </button>
            <button
              onClick={handleBack}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              📚 Choose Another Deck
            </button>
            <button
              onClick={onNavigateHome}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show flashcard study interface
  const currentCard = cards[currentCardIndex];
  const deck = getDeckById(selectedDeck);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            📚 {deck?.name}
          </h1>
          <div className="text-gray-600">
            Card {currentCardIndex + 1} of {cards.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{width: `${((currentCardIndex + 1) / cards.length) * 100}%`}}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <Flashcard
          card={currentCard}
          onNext={handleNext}
          onMarkCorrect={handleMarkCorrect}
          onMarkIncorrect={handleMarkIncorrect}
        />

        {/* Back button */}
        <div className="text-center mt-8">
          <button
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Study; 