import type { FC } from 'react';
import { useState, useEffect } from 'react';
import CategorySelection from '../components/CategorySelection';
import Flashcard from '../components/Flashcard';
import { getCardsByDeck, getDeckById } from '../data/cardUtils';
import type { Card } from '../data/cards';
import ProgressBar from '../components/ProgressBar';
import CompletionStats from '../components/CompletionStats';
import AppButton from '../components/AppButton';

interface StudyProps {
  onNavigateHome: () => void;
}

// Interface for localStorage session data
interface StudySession {
  selectedDeck: string;
  currentCardIndex: number;
  correctCards: string[];
  incorrectCards: string[];
  timestamp: number;
}

const Study: FC<StudyProps> = ({ onNavigateHome }) => {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [correctCards, setCorrectCards] = useState<string[]>([]);
  const [incorrectCards, setIncorrectCards] = useState<string[]>([]);
  const [isRedoMode, setIsRedoMode] = useState(false);
  const [originalIncorrectCards, setOriginalIncorrectCards] = useState<string[]>([]);

  // Load session from localStorage on component mount
  useEffect(() => {
    const savedSession = localStorage.getItem('flashcard-study-session');
    if (savedSession) {
      try {
        const session: StudySession = JSON.parse(savedSession);
        // Only restore if session is less than 24 hours old
        const isRecentSession = Date.now() - session.timestamp < 24 * 60 * 60 * 1000;
        
        if (isRecentSession) {
          const deckCards = getCardsByDeck(session.selectedDeck);
          if (deckCards.length > 0) {
            setSelectedDeck(session.selectedDeck);
            setCards(deckCards);
            setCurrentCardIndex(session.currentCardIndex);
            setCorrectCards(session.correctCards);
            setIncorrectCards(session.incorrectCards);
          }
        } else {
          // Clear old session
          localStorage.removeItem('flashcard-study-session');
        }
      } catch (error) {
        console.error('Error loading study session:', error);
        localStorage.removeItem('flashcard-study-session');
      }
    }
  }, []);

  // Save session to localStorage whenever state changes
  useEffect(() => {
    if (selectedDeck && cards.length > 0) {
      const session: StudySession = {
        selectedDeck,
        currentCardIndex,
        correctCards,
        incorrectCards,
        timestamp: Date.now()
      };
      localStorage.setItem('flashcard-study-session', JSON.stringify(session));
    }
  }, [selectedDeck, currentCardIndex, correctCards, incorrectCards, cards.length]);

  const handleSelectDeck = (deckId: string) => {
    const deckCards = getCardsByDeck(deckId);
    setCards(deckCards);
    setSelectedDeck(deckId);
    setCurrentCardIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
  };

  const handleBack = () => {
    // Clear localStorage session when going back to category selection
    localStorage.removeItem('flashcard-study-session');
    setSelectedDeck(null);
    setCards([]);
    setCurrentCardIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End of deck - show completion screen
      setCurrentCardIndex(-1);
      // Clear session when deck is completed
      localStorage.removeItem('flashcard-study-session');
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
    // Clear previous session and start fresh
    localStorage.removeItem('flashcard-study-session');
    setCurrentCardIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
    setIsRedoMode(false);
    setOriginalIncorrectCards([]);
  };

  const handleRedoWrongCards = () => {
    // Store original incorrect cards for reference
    setOriginalIncorrectCards([...incorrectCards]);
    
    // Filter cards to only show incorrect ones
    const wrongCards = cards.filter(card => incorrectCards.includes(card.id));
    setCards(wrongCards);
    
    // Reset progress for redo session
    setCurrentCardIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
    setIsRedoMode(true);
    
    // Clear localStorage session for redo mode
    localStorage.removeItem('flashcard-study-session');
  };

  const handleResetWrongCards = () => {
    // Clear the stored wrong cards and return to normal mode
    setOriginalIncorrectCards([]);
    setIsRedoMode(false);
    
    // Reload the full deck
    if (selectedDeck) {
      const deckCards = getCardsByDeck(selectedDeck);
      setCards(deckCards);
      setCurrentCardIndex(0);
      setCorrectCards([]);
      setIncorrectCards([]);
    }
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {isRedoMode ? '🔄 Redo Complete!' : '🎉 Deck Complete!'}
          </h1>
          <h2 className="text-xl text-blue-600 font-semibold mb-2">{deck?.name}</h2>
          {isRedoMode && (
            <p className="text-sm text-gray-600 mb-4">
              You practiced {originalIncorrectCards.length} cards that were marked wrong
            </p>
          )}

          <CompletionStats
            accuracyPercent={accuracy}
            correctCount={correctCards.length}
            incorrectCount={incorrectCards.length}
            totalCount={cards.length}
          />

          <div className="flex flex-col space-y-3">
            {isRedoMode ? (
              <>
                <AppButton intent="primary" onClick={handleResetWrongCards}>
                  🔄 Study Full Deck Again
                </AppButton>
                {incorrectCards.length > 0 && (
                  <AppButton intent="danger" onClick={handleRedoWrongCards}>
                    ❌ Redo Wrong Cards Again ({incorrectCards.length})
                  </AppButton>
                )}
              </>
            ) : (
              <>
                <AppButton intent="primary" onClick={handleRestart}>
                  🔄 Study Again
                </AppButton>
                {incorrectCards.length > 0 && (
                  <AppButton intent="danger" onClick={handleRedoWrongCards}>
                    ❌ Redo Wrong Cards ({incorrectCards.length})
                  </AppButton>
                )}
              </>
            )}
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isRedoMode ? '🔄' : '📚'} {deck?.name}
          </h1>
          {isRedoMode && (
            <div className="text-sm text-orange-600 font-semibold mb-1">
              Redo Mode - Wrong Cards Only
            </div>
          )}
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