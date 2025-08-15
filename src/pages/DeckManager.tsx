import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { decks as defaultDecks, cards as defaultCards } from '../data/cards';
import type { Deck, Card } from '../data/cards';
import AppButton from '../components/AppButton';

interface DeckManagerProps {
  onNavigateHome: () => void;
}

const DeckManager: FC<DeckManagerProps> = ({ onNavigateHome }) => {
  const [customDecks, setCustomDecks] = useState<Deck[]>([]);
  const [customCards, setCustomCards] = useState<Card[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  // Form states
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [cardEnglish, setCardEnglish] = useState('');
  const [cardRussian, setCardRussian] = useState('');
  const [cardExample, setCardExample] = useState('');

  // Load custom decks and cards from localStorage
  useEffect(() => {
    const savedDecks = localStorage.getItem('flashcard-custom-decks');
    const savedCards = localStorage.getItem('flashcard-custom-cards');
    
    if (savedDecks) {
      try {
        setCustomDecks(JSON.parse(savedDecks));
      } catch (error) {
        console.error('Error loading custom decks:', error);
      }
    }
    
    if (savedCards) {
      try {
        setCustomCards(JSON.parse(savedCards));
      } catch (error) {
        console.error('Error loading custom cards:', error);
      }
    }
  }, []);

  // Save to localStorage whenever custom data changes
  useEffect(() => {
    localStorage.setItem('flashcard-custom-decks', JSON.stringify(customDecks));
  }, [customDecks]);

  useEffect(() => {
    localStorage.setItem('flashcard-custom-cards', JSON.stringify(customCards));
  }, [customCards]);

  // Get all decks (default + custom)
  const allDecks = [...defaultDecks, ...customDecks];
  
  // Get all cards (default + custom)
  const allCards = [...defaultCards, ...customCards];

  // Get cards for selected deck
  const selectedDeckCards = selectedDeck 
    ? allCards.filter(card => card.deck === selectedDeck)
    : [];

  const handleCreateDeck = () => {
    if (!deckName.trim()) return;
    
    const newDeck: Deck = {
      id: `custom-${Date.now()}`,
      name: deckName.trim(),
      description: deckDescription.trim() || 'Custom deck'
    };
    
    setCustomDecks([...customDecks, newDeck]);
    setDeckName('');
    setDeckDescription('');
    setShowCreateDeck(false);
  };

  const handleDeleteDeck = (deckId: string) => {
    // Only allow deleting custom decks
    if (!deckId.startsWith('custom-')) return;
    
    // Remove deck
    setCustomDecks(customDecks.filter(deck => deck.id !== deckId));
    
    // Remove all cards from this deck
    setCustomCards(customCards.filter(card => card.deck !== deckId));
    
    // Clear selection if this deck was selected
    if (selectedDeck === deckId) {
      setSelectedDeck(null);
    }
  };

  const handleCreateCard = () => {
    if (!cardEnglish.trim() || !cardRussian.trim() || !selectedDeck) return;
    
    const newCard: Card = {
      id: `custom-card-${Date.now()}`,
      english: cardEnglish.trim(),
      russian: cardRussian.trim(),
      deck: selectedDeck,
      example: cardExample.trim() || undefined
    };
    
    setCustomCards([...customCards, newCard]);
    setCardEnglish('');
    setCardRussian('');
    setCardExample('');
    setShowCreateCard(false);
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setCardEnglish(card.english);
    setCardRussian(card.russian);
    setCardExample(card.example || '');
    setShowCreateCard(true);
  };

  const handleUpdateCard = () => {
    if (!editingCard || !cardEnglish.trim() || !cardRussian.trim()) return;
    
    const updatedCard: Card = {
      ...editingCard,
      english: cardEnglish.trim(),
      russian: cardRussian.trim(),
      example: cardExample.trim() || undefined
    };
    
    setCustomCards(customCards.map(card => 
      card.id === editingCard.id ? updatedCard : card
    ));
    
    setEditingCard(null);
    setCardEnglish('');
    setCardRussian('');
    setCardExample('');
    setShowCreateCard(false);
  };

  const handleDeleteCard = (cardId: string) => {
    // Only allow deleting custom cards
    if (!cardId.startsWith('custom-card-')) return;
    
    setCustomCards(customCards.filter(card => card.id !== cardId));
  };

  const resetForms = () => {
    setDeckName('');
    setDeckDescription('');
    setCardEnglish('');
    setCardRussian('');
    setCardExample('');
    setEditingCard(null);
    setShowCreateDeck(false);
    setShowCreateCard(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🛠️ Deck Manager</h1>
          <p className="text-gray-600">Create and manage your custom flashcard decks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Deck Management */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">📚 Decks</h2>
              <AppButton 
                intent="primary" 
                onClick={() => setShowCreateDeck(true)}
                className="py-2 px-4"
              >
                ➕ New Deck
              </AppButton>
            </div>

            {/* Create Deck Form */}
            {showCreateDeck && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-3">Create New Deck</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Deck name"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={deckDescription}
                    onChange={(e) => setDeckDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex space-x-2">
                    <AppButton intent="primary" onClick={handleCreateDeck}>
                      Create
                    </AppButton>
                    <AppButton intent="neutral" onClick={() => setShowCreateDeck(false)}>
                      Cancel
                    </AppButton>
                  </div>
                </div>
              </div>
            )}

            {/* Deck List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {allDecks.map((deck) => (
                <div
                  key={deck.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedDeck === deck.id
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDeck(deck.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{deck.name}</h3>
                      <p className="text-sm text-gray-600">{deck.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {allCards.filter(card => card.deck === deck.id).length} cards
                      </p>
                    </div>
                    {deck.id.startsWith('custom-') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDeck(deck.id);
                        }}
                        className="text-red-500 hover:text-red-700 ml-2"
                        title="Delete deck"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Card Management */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                🃏 Cards {selectedDeck && `(${allDecks.find(d => d.id === selectedDeck)?.name})`}
              </h2>
              {selectedDeck && (
                <AppButton 
                  intent="success" 
                  onClick={() => setShowCreateCard(true)}
                  className="py-2 px-4"
                >
                  ➕ New Card
                </AppButton>
              )}
            </div>

            {!selectedDeck ? (
              <div className="text-center text-gray-500 py-12">
                <p>Select a deck to manage its cards</p>
              </div>
            ) : (
              <>
                {/* Create/Edit Card Form */}
                {showCreateCard && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      {editingCard ? 'Edit Card' : 'Create New Card'}
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="English word/phrase"
                        value={cardEnglish}
                        onChange={(e) => setCardEnglish(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Russian translation"
                        value={cardRussian}
                        onChange={(e) => setCardRussian(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Example sentence (optional)"
                        value={cardExample}
                        onChange={(e) => setCardExample(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <div className="flex space-x-2">
                        <AppButton 
                          intent="success" 
                          onClick={editingCard ? handleUpdateCard : handleCreateCard}
                        >
                          {editingCard ? 'Update' : 'Create'}
                        </AppButton>
                        <AppButton intent="neutral" onClick={resetForms}>
                          Cancel
                        </AppButton>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedDeckCards.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <p>No cards in this deck yet</p>
                    </div>
                  ) : (
                    selectedDeckCards.map((card) => (
                      <div
                        key={card.id}
                        className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">{card.english}</div>
                            <div className="text-gray-600">{card.russian}</div>
                            {card.example && (
                              <div className="text-sm text-gray-500 italic mt-1">"{card.example}"</div>
                            )}
                          </div>
                          {card.id.startsWith('custom-card-') && (
                            <div className="flex space-x-2 ml-2">
                              <button
                                onClick={() => handleEditCard(card)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit card"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteCard(card.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete card"
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <AppButton intent="neutral" onClick={onNavigateHome} className="py-3 px-6">
            🏠 Back to Home
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default DeckManager;
