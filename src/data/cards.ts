export interface Card {
  id: string;
  english: string;
  russian: string;
  deck: string;
  example?: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
}

export const decks: Deck[] = [
  {
    id: 'animals',
    name: 'Animals',
    description: 'Common animals and pets'
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Food and drinks'
  },
  {
    id: 'verbs',
    name: 'Verbs',
    description: 'Common action verbs'
  }
];

export const cards: Card[] = [
  // Animals
  {
    id: 'animal-1',
    english: 'cat',
    russian: 'кот',
    deck: 'animals',
    example: 'The cat is sleeping on the sofa.'
  },
  {
    id: 'animal-2',
    english: 'dog',
    russian: 'собака',
    deck: 'animals',
    example: 'My dog loves to play in the park.'
  },
  {
    id: 'animal-3',
    english: 'bird',
    russian: 'птица',
    deck: 'animals',
    example: 'A bird is singing outside my window.'
  },
  {
    id: 'animal-4',
    english: 'fish',
    russian: 'рыба',
    deck: 'animals',
    example: 'We had fish for dinner last night.'
  },
  {
    id: 'animal-5',
    english: 'horse',
    russian: 'лошадь',
    deck: 'animals',
    example: 'The horse galloped across the field.'
  },
  
  // Food
  {
    id: 'food-1',
    english: 'apple',
    russian: 'яблоко',
    deck: 'food',
    example: 'I eat an apple every morning.'
  },
  {
    id: 'food-2',
    english: 'bread',
    russian: 'хлеб',
    deck: 'food',
    example: 'Please buy some bread from the store.'
  },
  {
    id: 'food-3',
    english: 'water',
    russian: 'вода',
    deck: 'food',
    example: 'Drink plenty of water every day.'
  },
  {
    id: 'food-4',
    english: 'cheese',
    russian: 'сыр',
    deck: 'food',
    example: 'This cheese tastes delicious.'
  },
  {
    id: 'food-5',
    english: 'coffee',
    russian: 'кофе',
    deck: 'food',
    example: 'I need coffee to wake up in the morning.'
  },
  
  // Verbs
  {
    id: 'verb-1',
    english: 'run',
    russian: 'бегать',
    deck: 'verbs',
    example: 'I run every morning for exercise.'
  },
  {
    id: 'verb-2',
    english: 'walk',
    russian: 'ходить',
    deck: 'verbs',
    example: 'Let\'s walk to the park together.'
  },
  {
    id: 'verb-3',
    english: 'read',
    russian: 'читать',
    deck: 'verbs',
    example: 'I like to read books before bed.'
  },
  {
    id: 'verb-4',
    english: 'write',
    russian: 'писать',
    deck: 'verbs',
    example: 'Please write your name on the paper.'
  },
  {
    id: 'verb-5',
    english: 'speak',
    russian: 'говорить',
    deck: 'verbs',
    example: 'Can you speak English fluently?'
  }
];

export const getCardsByDeck = (deckId: string): Card[] => {
  return cards.filter(card => card.deck === deckId);
};

export const getDeckById = (deckId: string): Deck | undefined => {
  return decks.find(deck => deck.id === deckId);
}; 