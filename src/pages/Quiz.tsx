import React, { type FC } from 'react';
import { useState } from 'react';
import { getAllDecks, getCardsByDeck, getDeckById } from '../data/cardUtils';
import { decks as directDecks, cards as directCards, getCardsByDeck as directGetCardsByDeck, getDeckById as directGetDeckById } from '../data/cards';
import type { Card, Deck } from '../data/cards';
import AppButton from '../components/AppButton';
import ProgressBar from '../components/ProgressBar';

interface QuizProps {
  onNavigateHome: () => void;
}

type QuizType = 'multiple-choice' | 'fill-in-blank';

interface QuizResult {
  cardId: string;
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
  timestamp: number;
}

interface QuizSession {
  deckId: string;
  quizType: QuizType;
  results: QuizResult[];
  timestamp: number;
}

const Quiz: FC<QuizProps> = ({ onNavigateHome }) => {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Test data loading on component mount (only log once)
  React.useEffect(() => {
    console.log('Quiz component mounted');
    console.log('Available decks (cardUtils):', getAllDecks());
    console.log('Sample deck cards (cardUtils):', getCardsByDeck('animals'));
    console.log('Direct decks:', directDecks);
    console.log('Direct cards:', directCards.length);
    console.log('Direct animal cards:', directGetCardsByDeck('animals'));
  }, []);

  // Generate multiple choice options
  const generateOptions = (correctCard: Card, allCards: Card[]): string[] => {
    const options = [correctCard.english];
    const otherCards = allCards.filter(card => 
      card.id !== correctCard.id && card.english !== correctCard.english
    );
    
    // Add 3 random incorrect options
    const shuffled = otherCards.sort(() => 0.5 - Math.random());
    for (let i = 0; i < 3 && i < shuffled.length; i++) {
      options.push(shuffled[i].english);
    }
    
    // Shuffle all options
    return options.sort(() => 0.5 - Math.random());
  };

  // Start quiz with selected deck and type
  const startQuiz = (deckId: string, type: QuizType) => {
    console.log('startQuiz called with:', { deckId, type });
    
    // Use direct import since we know it works
    const deckCards = directGetCardsByDeck(deckId);
    console.log('Found cards for deck (direct):', deckCards.length, deckCards);
    
    if (deckCards.length === 0) {
      console.error('No cards found for deck:', deckId);
      alert(`No cards found for deck: ${deckId}`);
      return;
    }
    
    const shuffledCards = [...deckCards].sort(() => 0.5 - Math.random());
    
    // Set state exactly like FORCE TEST (which works)
    console.log('Setting quiz state...');
    setCards(shuffledCards);
    setSelectedDeck(deckId);
    setQuizType(type);
    setCurrentCardIndex(0);
    setShowFeedback(false);
    setQuizResults([]);
    setUserAnswer('');
    setIsCorrect(false);
    
    // Handle quiz type specific setup
    if (type === 'multiple-choice') {
      const allCards = directCards;
      const options = generateOptions(shuffledCards[0], allCards);
      console.log('Generated options:', options);
      setCurrentOptions(options);
    } else {
      // Fill-in-blank: clear options
      setCurrentOptions([]);
    }
    
    console.log('Quiz state set, should render question now');
  };

  // Handle answer submission
  const handleAnswer = (answer: string) => {
    const currentCard = cards[currentCardIndex];
    const correct = answer.toLowerCase().trim() === currentCard.english.toLowerCase().trim();
    
    const result: QuizResult = {
      cardId: currentCard.id,
      correct,
      userAnswer: answer,
      correctAnswer: currentCard.english,
      timestamp: Date.now()
    };
    
    setQuizResults([...quizResults, result]);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Save result to localStorage for statistics
    saveQuizResult(result);
  };

  // Save quiz result to localStorage
  const saveQuizResult = (result: QuizResult) => {
    try {
      const existingResults = localStorage.getItem('flashcard-quiz-results');
      const results = existingResults ? JSON.parse(existingResults) : [];
      results.push(result);
      localStorage.setItem('flashcard-quiz-results', JSON.stringify(results));
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  // Move to next question
  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      const nextIndex = currentCardIndex + 1;
      setCurrentCardIndex(nextIndex);
      setUserAnswer('');
      setShowFeedback(false);
      
      if (quizType === 'multiple-choice') {
        const allCards = directCards;
        setCurrentOptions(generateOptions(cards[nextIndex], allCards));
      }
    } else {
      // Quiz complete - save session
      saveQuizSession();
      setCurrentCardIndex(-1);
    }
  };

  // Save complete quiz session
  const saveQuizSession = () => {
    if (!selectedDeck || !quizType) return;
    
    try {
      const session: QuizSession = {
        deckId: selectedDeck,
        quizType,
        results: quizResults,
        timestamp: Date.now()
      };
      
      const existingSessions = localStorage.getItem('flashcard-quiz-sessions');
      const sessions = existingSessions ? JSON.parse(existingSessions) : [];
      sessions.push(session);
      localStorage.setItem('flashcard-quiz-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving quiz session:', error);
    }
  };

  // Reset quiz
  const handleRestart = () => {
    setSelectedDeck(null);
    setQuizType(null);
    setCards([]);
    setCurrentCardIndex(0);
    setQuizResults([]);
    setUserAnswer('');
    setShowFeedback(false);
  };

  // Show deck and quiz type selection
  if (!selectedDeck || !quizType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">🧩 Quiz Mode</h1>
            <p className="text-gray-600">Choose a deck and quiz type to get started</p>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deck Selection */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Select Deck</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {directDecks.map((deck: Deck) => {
                  const deckCards = directGetCardsByDeck(deck.id);
                  return (
                    <button
                      key={deck.id}
                      onClick={() => {
                        console.log('Selected deck:', deck.id);
                        setSelectedDeck(deck.id);
                      }}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedDeck === deck.id
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{deck.name}</div>
                      <div className="text-sm text-gray-600">{deck.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {deckCards.length} cards
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quiz Type Selection */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Quiz Type</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setQuizType('multiple-choice')}
                  className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                    quizType === 'multiple-choice'
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800 text-lg mb-2">
                    🔤 Multiple Choice
                  </div>
                  <div className="text-sm text-gray-600">
                    See the Russian word and choose the correct English translation from 4 options
                  </div>
                </button>

                <button
                  onClick={() => setQuizType('fill-in-blank')}
                  className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                    quizType === 'fill-in-blank'
                      ? 'border-purple-400 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800 text-lg mb-2">
                    ✍️ Fill in the Blank
                  </div>
                  <div className="text-sm text-gray-600">
                    See the Russian word and type the English translation
                  </div>
                </button>
              </div>

              {selectedDeck && quizType && (
                <div className="mt-6 space-y-3">
                  <AppButton 
                    intent="success" 
                    onClick={() => {
                      console.log('Start Quiz button clicked');
                      startQuiz(selectedDeck, quizType);
                    }}
                    className="w-full py-4"
                  >
                    🚀 Start Quiz
                  </AppButton>
                  <AppButton 
                    intent="neutral" 
                    onClick={() => {
                      console.log('Test button clicked');
                      console.log('Selected deck:', selectedDeck);
                      console.log('Quiz type:', quizType);
                      const testCards = getCardsByDeck(selectedDeck);
                      console.log('Test cards:', testCards);
                      alert(`Test: Found ${testCards.length} cards for ${selectedDeck}`);
                    }}
                    className="w-full py-2 text-sm"
                  >
                    🔧 Debug Test
                  </AppButton>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <AppButton intent="neutral" onClick={onNavigateHome} className="py-3 px-6">
              🏠 Back to Home
            </AppButton>
          </div>
        </div>
      </div>
    );
  }

  // Show quiz completion screen
  if (currentCardIndex === -1) {
    const deck = getDeckById(selectedDeck);
    const correctCount = quizResults.filter(r => r.correct).length;
    const accuracy = quizResults.length > 0 ? Math.round((correctCount / quizResults.length) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border border-white/20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🎉 Quiz Complete!</h1>
          <h2 className="text-xl text-green-600 font-semibold mb-2">{deck?.name}</h2>
          <p className="text-sm text-gray-600 mb-6">
            {quizType === 'multiple-choice' ? 'Multiple Choice' : 'Fill in the Blank'} Quiz
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-3xl font-bold text-gray-800 mb-2">{accuracy}% Accuracy</div>
            <div className="text-gray-600">
              <div className="flex justify-between mb-1">
                <span>✅ Correct:</span>
                <span className="font-semibold text-green-600">{correctCount}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>❌ Incorrect:</span>
                <span className="font-semibold text-red-600">{quizResults.length - correctCount}</span>
              </div>
              <div className="flex justify-between">
                <span>📊 Total:</span>
                <span className="font-semibold">{quizResults.length}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <AppButton intent="success" onClick={() => startQuiz(selectedDeck, quizType)}>
              🔄 Quiz Again
            </AppButton>
            <AppButton intent="neutral" onClick={handleRestart}>
              📚 Choose Different Quiz
            </AppButton>
            <AppButton intent="secondary" onClick={onNavigateHome}>
              🏠 Back to Home
            </AppButton>
          </div>
        </div>
      </div>
    );
  }

  // Show quiz question
  const currentCard = cards[currentCardIndex];
  const deck = directGetDeckById(selectedDeck);

  // Debug logging
  console.log('Quiz render state:', {
    selectedDeck,
    quizType,
    cardsLength: cards.length,
    currentCardIndex,
    currentCard: currentCard ? { id: currentCard.id, english: currentCard.english } : null,
    deck: deck ? { id: deck.id, name: deck.name } : null
  });

  // Safety check: if no current card, show loading or return to selection
  if (!currentCard || !deck) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-2xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Loading Quiz...</h2>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700 mb-2">Quick Start Options:</div>
            
            {/* Animals */}
            <div className="grid grid-cols-2 gap-2">
              <AppButton intent="success" onClick={() => {
                const testCards = directGetCardsByDeck('animals');
                setCards(testCards); setSelectedDeck('animals'); setQuizType('multiple-choice');
                setCurrentCardIndex(0); setShowFeedback(false); setQuizResults([]); setUserAnswer(''); setIsCorrect(false);
                setCurrentOptions(generateOptions(testCards[0], directCards));
              }} className="py-2 px-3 text-sm">
                🐱 Animals MC
              </AppButton>
              <AppButton intent="primary" onClick={() => {
                const testCards = directGetCardsByDeck('animals');
                setCards(testCards); setSelectedDeck('animals'); setQuizType('fill-in-blank');
                setCurrentCardIndex(0); setShowFeedback(false); setQuizResults([]); setUserAnswer(''); setIsCorrect(false);
                setCurrentOptions([]);
              }} className="py-2 px-3 text-sm">
                🐱 Animals FB
              </AppButton>
            </div>
            
            {/* Food */}
            <div className="grid grid-cols-2 gap-2">
              <AppButton intent="success" onClick={() => {
                const testCards = directGetCardsByDeck('food');
                setCards(testCards); setSelectedDeck('food'); setQuizType('multiple-choice');
                setCurrentCardIndex(0); setShowFeedback(false); setQuizResults([]); setUserAnswer(''); setIsCorrect(false);
                setCurrentOptions(generateOptions(testCards[0], directCards));
              }} className="py-2 px-3 text-sm">
                🍎 Food MC
              </AppButton>
              <AppButton intent="primary" onClick={() => {
                const testCards = directGetCardsByDeck('food');
                setCards(testCards); setSelectedDeck('food'); setQuizType('fill-in-blank');
                setCurrentCardIndex(0); setShowFeedback(false); setQuizResults([]); setUserAnswer(''); setIsCorrect(false);
                setCurrentOptions([]);
              }} className="py-2 px-3 text-sm">
                🍎 Food FB
              </AppButton>
            </div>
            
            {/* Colors */}
            <div className="grid grid-cols-2 gap-2">
              <AppButton intent="success" onClick={() => {
                const testCards = directGetCardsByDeck('colors');
                setCards(testCards); setSelectedDeck('colors'); setQuizType('multiple-choice');
                setCurrentCardIndex(0); setShowFeedback(false); setQuizResults([]); setUserAnswer(''); setIsCorrect(false);
                setCurrentOptions(generateOptions(testCards[0], directCards));
              }} className="py-2 px-3 text-sm">
                🌈 Colors MC
              </AppButton>
              <AppButton intent="primary" onClick={() => {
                const testCards = directGetCardsByDeck('colors');
                setCards(testCards); setSelectedDeck('colors'); setQuizType('fill-in-blank');
                setCurrentCardIndex(0); setShowFeedback(false); setQuizResults([]); setUserAnswer(''); setIsCorrect(false);
                setCurrentOptions([]);
              }} className="py-2 px-3 text-sm">
                🌈 Colors FB
              </AppButton>
            </div>
            
            <AppButton intent="neutral" onClick={handleRestart} className="py-2 px-4">
              ← Back to Quiz Selection
            </AppButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            🧩 {deck?.name} - {quizType === 'multiple-choice' ? 'Multiple Choice' : 'Fill in the Blank'}
          </h1>
          <div className="text-gray-600">
            Question {currentCardIndex + 1} of {cards.length}
          </div>
          <ProgressBar currentIndex={currentCardIndex} total={cards.length} />
        </div>

        {/* Question Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-white/20">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">Translate this word:</div>
            <div className="text-4xl font-bold text-gray-800 mb-4">{currentCard.russian}</div>
            <div className="text-sm text-gray-500">Russian → English</div>
          </div>

          {!showFeedback ? (
            <div>

              {quizType === 'multiple-choice' ? (
                <div className="space-y-3">
                  {currentOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all"
                    >
                      <span className="font-semibold text-gray-700">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && userAnswer.trim() && handleAnswer(userAnswer.trim())}
                    placeholder="Type the English translation..."
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    autoFocus
                  />
                  <AppButton 
                    intent="success" 
                    onClick={() => handleAnswer(userAnswer.trim())}
                    disabled={!userAnswer.trim()}
                    className="w-full py-3"
                  >
                    Submit Answer
                  </AppButton>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              {!isCorrect && (
                <div className="mb-4">
                  <div className="text-gray-600">Your answer: <span className="font-semibold text-red-600">{quizResults[quizResults.length - 1]?.userAnswer}</span></div>
                  <div className="text-gray-600">Correct answer: <span className="font-semibold text-green-600">{currentCard.english}</span></div>
                </div>
              )}
              {currentCard.example && (
                <div className="text-sm text-gray-600 italic mb-4">
                  Example: "{currentCard.example}"
                </div>
              )}
              <AppButton intent="primary" onClick={handleNext} className="py-3 px-8">
                {currentCardIndex < cards.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </AppButton>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <AppButton intent="neutral" onClick={handleRestart} className="py-2 px-4">
            ← Back to Quiz Selection
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 