import { decks as defaultDecks, cards as defaultCards, getCardsByDeck as originalGetCardsByDeck, getDeckById as originalGetDeckById } from './cards';
import type { Deck, Card } from './cards';

// Debug: Test the imports immediately
console.log('cardUtils.ts loaded');
console.log('defaultDecks:', defaultDecks?.length || 0);
console.log('defaultCards:', defaultCards?.length || 0);
console.log('First deck:', defaultDecks?.[0]);
console.log('First card:', defaultCards?.[0]);

// Get custom decks from localStorage
export const getCustomDecks = (): Deck[] => {
  try {
    const saved = localStorage.getItem('flashcard-custom-decks');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading custom decks:', error);
    return [];
  }
};

// Get custom cards from localStorage
export const getCustomCards = (): Card[] => {
  try {
    const saved = localStorage.getItem('flashcard-custom-cards');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading custom cards:', error);
    return [];
  }
};

// Get all decks (default + custom)
export const getAllDecks = (): Deck[] => {
  const customDecks = getCustomDecks();
  console.log('getAllDecks:', { defaultCount: defaultDecks.length, customCount: customDecks.length });
  return [...defaultDecks, ...customDecks];
};

// Get all cards (default + custom)
export const getAllCards = (): Card[] => {
  const customCards = getCustomCards();
  console.log('getAllCards:', { defaultCount: defaultCards.length, customCount: customCards.length });
  return [...defaultCards, ...customCards];
};

// Get cards by deck ID (works with both default and custom decks)
export const getCardsByDeck = (deckId: string): Card[] => {
  // First try to get default cards for this deck
  const defaultDeckCards = originalGetCardsByDeck(deckId);
  
  // Then get custom cards for this deck
  const customCards = getCustomCards();
  const customDeckCards = customCards.filter(card => card.deck === deckId);
  
  const result = [...defaultDeckCards, ...customDeckCards];
  
  console.log('getCardsByDeck debug:', {
    deckId,
    defaultCards: defaultDeckCards.length,
    customCards: customDeckCards.length,
    totalCards: result.length,
    sampleCard: result[0]
  });
  
  return result;
};

// Get deck by ID (works with both default and custom decks)
export const getDeckById = (deckId: string): Deck | undefined => {
  // First try default decks
  const defaultDeck = originalGetDeckById(deckId);
  if (defaultDeck) {
    return defaultDeck;
  }
  
  // Then try custom decks
  const customDecks = getCustomDecks();
  return customDecks.find(deck => deck.id === deckId);
};

// Export original data for backward compatibility
export { decks, cards } from './cards';