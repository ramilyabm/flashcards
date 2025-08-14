import type { FC } from 'react';
import { useState } from 'react';
import CategorySelection from '../components/CategorySelection';
import Flashcard from '../components/Flashcard';
import { getCardsByDeck, getDeckById } from '../data/cards';
import type { Card } from '../data/cards';
import ProgressBar from '../components/ProgressBar';
import CompletionStats from '../components/CompletionStats';
import AppButton from '../components/AppButton';

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
    setIncorrectCards(incorrectCards.filter((id) => id !== currentCard.id));
  };

  const handleMarkIncorrect = () => {
    const currentCard = cards[currentCardIndex];
    if (!incorrectCards.includes(currentCard.id)) {
      setIncorrectCards([...incorrectCards, currentCard.id]);
    }
    // Remove from correct if it was there
    setCorrectCards(correctCards.filter((id) => id !== currentCard.id));
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
  };

  // Show category selection if no deck is selected
  if (!selectedDeck) {
    return (
      <CategorySelection onSelectDeck={handleSelectDeck} onBack={onNavigateHome} />
    );
  }

  // Show completion screen if we've gone through all cards
  if (currentCardIndex === -1) {
    const deck = getDeckById(selectedDeck);
    const accuracy = cards.length > 0 ? Math.round((correctCards.length / cards.length) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border border-white/20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🎉 Deck Complete!</h1>
          <h2 className="text-xl text-blue-600 font-semibold mb-6">{deck?.name}</h2>

          <CompletionStats
            accuracyPercent={accuracy}
            correctCount={correctCards.length}
            incorrectCount={incorrectCards.length}
            totalCount={cards.length}
          />

          <div className="flex flex-col space-y-3">
            <AppButton intent="primary" onClick={handleRestart}>
              🔄 Study Again
            </AppButton>
            <AppButton intent="neutral" onClick={handleBack}>
              📚 Choose Another Deck
            </AppButton>
            <AppButton intent="secondary" onClick={onNavigateHome}>
              🏠 Back to Home
            </AppButton>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 {deck?.name}</h1>
          <div className="text-gray-600">
            Card {currentCardIndex + 1} of {cards.length}
          </div>
          <ProgressBar currentIndex={currentCardIndex} total={cards.length} />
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
          <AppButton intent="neutral" onClick={handleBack} className="py-2 px-4">
            ← Back to Categories
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default Study; 