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
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Family members and relationships'
  },
  {
    id: 'colors',
    name: 'Colors',
    description: 'Basic colors and shades'
  },
  {
    id: 'numbers',
    name: 'Numbers',
    description: 'Numbers from 1 to 100'
  },
  {
    id: 'body',
    name: 'Body Parts',
    description: 'Parts of the human body'
  },
  {
    id: 'clothes',
    name: 'Clothing',
    description: 'Clothes and accessories'
  },
  {
    id: 'house',
    name: 'House & Home',
    description: 'Rooms, furniture, and household items'
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Weather conditions and seasons'
  }
];

export const cards: Card[] = [
  // Animals (expanded)
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
  {
    id: 'animal-6',
    english: 'elephant',
    russian: 'слон',
    deck: 'animals',
    example: 'The elephant is the largest land animal.'
  },
  {
    id: 'animal-7',
    english: 'lion',
    russian: 'лев',
    deck: 'animals',
    example: 'The lion is known as the king of the jungle.'
  },
  {
    id: 'animal-8',
    english: 'tiger',
    russian: 'тигр',
    deck: 'animals',
    example: 'The tiger has beautiful orange and black stripes.'
  },
  {
    id: 'animal-9',
    english: 'bear',
    russian: 'медведь',
    deck: 'animals',
    example: 'The bear is hibernating in winter.'
  },
  {
    id: 'animal-10',
    english: 'rabbit',
    russian: 'кролик',
    deck: 'animals',
    example: 'The rabbit is eating carrots in the garden.'
  },
  {
    id: 'animal-11',
    english: 'mouse',
    russian: 'мышь',
    deck: 'animals',
    example: 'A small mouse ran across the floor.'
  },
  {
    id: 'animal-12',
    english: 'cow',
    russian: 'корова',
    deck: 'animals',
    example: 'The cow gives us fresh milk every day.'
  },
  
  // Food (expanded)
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
  {
    id: 'food-6',
    english: 'banana',
    russian: 'банан',
    deck: 'food',
    example: 'Bananas are rich in potassium.'
  },
  {
    id: 'food-7',
    english: 'orange',
    russian: 'апельсин',
    deck: 'food',
    example: 'This orange is very juicy and sweet.'
  },
  {
    id: 'food-8',
    english: 'milk',
    russian: 'молоко',
    deck: 'food',
    example: 'Children need milk for strong bones.'
  },
  {
    id: 'food-9',
    english: 'meat',
    russian: 'мясо',
    deck: 'food',
    example: 'We are having meat for dinner tonight.'
  },
  {
    id: 'food-10',
    english: 'rice',
    russian: 'рис',
    deck: 'food',
    example: 'Rice is a staple food in many countries.'
  },
  {
    id: 'food-11',
    english: 'egg',
    russian: 'яйцо',
    deck: 'food',
    example: 'I like to eat eggs for breakfast.'
  },
  {
    id: 'food-12',
    english: 'potato',
    russian: 'картофель',
    deck: 'food',
    example: 'Potatoes can be cooked in many ways.'
  },
  
  // Verbs (expanded)
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
  },
  {
    id: 'verb-6',
    english: 'eat',
    russian: 'есть',
    deck: 'verbs',
    example: 'We eat dinner at 7 PM every day.'
  },
  {
    id: 'verb-7',
    english: 'drink',
    russian: 'пить',
    deck: 'verbs',
    example: 'I drink water throughout the day.'
  },
  {
    id: 'verb-8',
    english: 'sleep',
    russian: 'спать',
    deck: 'verbs',
    example: 'Children need to sleep 8-10 hours per night.'
  },
  {
    id: 'verb-9',
    english: 'work',
    russian: 'работать',
    deck: 'verbs',
    example: 'I work from 9 AM to 5 PM.'
  },
  {
    id: 'verb-10',
    english: 'play',
    russian: 'играть',
    deck: 'verbs',
    example: 'Children love to play in the playground.'
  },
  {
    id: 'verb-11',
    english: 'listen',
    russian: 'слушать',
    deck: 'verbs',
    example: 'I listen to music while studying.'
  },
  {
    id: 'verb-12',
    english: 'watch',
    russian: 'смотреть',
    deck: 'verbs',
    example: 'We watch movies on weekends.'
  },

  // Family
  {
    id: 'family-1',
    english: 'mother',
    russian: 'мать',
    deck: 'family',
    example: 'My mother cooks delicious meals.'
  },
  {
    id: 'family-2',
    english: 'father',
    russian: 'отец',
    deck: 'family',
    example: 'My father works in an office.'
  },
  {
    id: 'family-3',
    english: 'sister',
    russian: 'сестра',
    deck: 'family',
    example: 'My sister is younger than me.'
  },
  {
    id: 'family-4',
    english: 'brother',
    russian: 'брат',
    deck: 'family',
    example: 'My brother plays football very well.'
  },
  {
    id: 'family-5',
    english: 'grandmother',
    russian: 'бабушка',
    deck: 'family',
    example: 'My grandmother tells wonderful stories.'
  },
  {
    id: 'family-6',
    english: 'grandfather',
    russian: 'дедушка',
    deck: 'family',
    example: 'My grandfather taught me how to fish.'
  },
  {
    id: 'family-7',
    english: 'son',
    russian: 'сын',
    deck: 'family',
    example: 'Their son is studying at university.'
  },
  {
    id: 'family-8',
    english: 'daughter',
    russian: 'дочь',
    deck: 'family',
    example: 'Their daughter loves to paint.'
  },
  {
    id: 'family-9',
    english: 'husband',
    russian: 'муж',
    deck: 'family',
    example: 'Her husband is a doctor.'
  },
  {
    id: 'family-10',
    english: 'wife',
    russian: 'жена',
    deck: 'family',
    example: 'His wife is a teacher.'
  },

  // Colors
  {
    id: 'color-1',
    english: 'red',
    russian: 'красный',
    deck: 'colors',
    example: 'The apple is red and shiny.'
  },
  {
    id: 'color-2',
    english: 'blue',
    russian: 'синий',
    deck: 'colors',
    example: 'The sky is blue today.'
  },
  {
    id: 'color-3',
    english: 'green',
    russian: 'зелёный',
    deck: 'colors',
    example: 'The grass is green in spring.'
  },
  {
    id: 'color-4',
    english: 'yellow',
    russian: 'жёлтый',
    deck: 'colors',
    example: 'The sun looks yellow in the sky.'
  },
  {
    id: 'color-5',
    english: 'black',
    russian: 'чёрный',
    deck: 'colors',
    example: 'I have a black cat.'
  },
  {
    id: 'color-6',
    english: 'white',
    russian: 'белый',
    deck: 'colors',
    example: 'Snow is white and cold.'
  },
  {
    id: 'color-7',
    english: 'orange',
    russian: 'оранжевый',
    deck: 'colors',
    example: 'The orange sunset is beautiful.'
  },
  {
    id: 'color-8',
    english: 'purple',
    russian: 'фиолетовый',
    deck: 'colors',
    example: 'She is wearing a purple dress.'
  },
  {
    id: 'color-9',
    english: 'pink',
    russian: 'розовый',
    deck: 'colors',
    example: 'The flowers are pink and fragrant.'
  },
  {
    id: 'color-10',
    english: 'brown',
    russian: 'коричневый',
    deck: 'colors',
    example: 'The tree has a brown trunk.'
  },

  // Numbers
  {
    id: 'number-1',
    english: 'one',
    russian: 'один',
    deck: 'numbers',
    example: 'I have one apple.'
  },
  {
    id: 'number-2',
    english: 'two',
    russian: 'два',
    deck: 'numbers',
    example: 'There are two cats in the garden.'
  },
  {
    id: 'number-3',
    english: 'three',
    russian: 'три',
    deck: 'numbers',
    example: 'I bought three books yesterday.'
  },
  {
    id: 'number-4',
    english: 'four',
    russian: 'четыре',
    deck: 'numbers',
    example: 'The table has four legs.'
  },
  {
    id: 'number-5',
    english: 'five',
    russian: 'пять',
    deck: 'numbers',
    example: 'I have five fingers on each hand.'
  },
  {
    id: 'number-6',
    english: 'ten',
    russian: 'десять',
    deck: 'numbers',
    example: 'There are ten students in the class.'
  },
  {
    id: 'number-7',
    english: 'twenty',
    russian: 'двадцать',
    deck: 'numbers',
    example: 'I am twenty years old.'
  },
  {
    id: 'number-8',
    english: 'fifty',
    russian: 'пятьдесят',
    deck: 'numbers',
    example: 'The speed limit is fifty kilometers per hour.'
  },
  {
    id: 'number-9',
    english: 'hundred',
    russian: 'сто',
    deck: 'numbers',
    example: 'There are one hundred people at the party.'
  },
  {
    id: 'number-10',
    english: 'thousand',
    russian: 'тысяча',
    deck: 'numbers',
    example: 'This book has one thousand pages.'
  },

  // Body Parts
  {
    id: 'body-1',
    english: 'head',
    russian: 'голова',
    deck: 'body',
    example: 'I have a headache in my head.'
  },
  {
    id: 'body-2',
    english: 'eye',
    russian: 'глаз',
    deck: 'body',
    example: 'I can see with my eyes.'
  },
  {
    id: 'body-3',
    english: 'nose',
    russian: 'нос',
    deck: 'body',
    example: 'I can smell flowers with my nose.'
  },
  {
    id: 'body-4',
    english: 'mouth',
    russian: 'рот',
    deck: 'body',
    example: 'I eat food with my mouth.'
  },
  {
    id: 'body-5',
    english: 'hand',
    russian: 'рука',
    deck: 'body',
    example: 'I write with my right hand.'
  },
  {
    id: 'body-6',
    english: 'foot',
    russian: 'нога',
    deck: 'body',
    example: 'I walk with my feet.'
  },
  {
    id: 'body-7',
    english: 'ear',
    russian: 'ухо',
    deck: 'body',
    example: 'I listen to music with my ears.'
  },
  {
    id: 'body-8',
    english: 'hair',
    russian: 'волосы',
    deck: 'body',
    example: 'She has beautiful long hair.'
  },
  {
    id: 'body-9',
    english: 'finger',
    russian: 'палец',
    deck: 'body',
    example: 'I have ten fingers in total.'
  },
  {
    id: 'body-10',
    english: 'leg',
    russian: 'нога',
    deck: 'body',
    example: 'I run fast with my strong legs.'
  },

  // Clothing
  {
    id: 'clothes-1',
    english: 'shirt',
    russian: 'рубашка',
    deck: 'clothes',
    example: 'He is wearing a white shirt.'
  },
  {
    id: 'clothes-2',
    english: 'pants',
    russian: 'брюки',
    deck: 'clothes',
    example: 'These pants are very comfortable.'
  },
  {
    id: 'clothes-3',
    english: 'dress',
    russian: 'платье',
    deck: 'clothes',
    example: 'She looks beautiful in that dress.'
  },
  {
    id: 'clothes-4',
    english: 'shoes',
    russian: 'туфли',
    deck: 'clothes',
    example: 'I need new shoes for running.'
  },
  {
    id: 'clothes-5',
    english: 'hat',
    russian: 'шляпа',
    deck: 'clothes',
    example: 'I wear a hat to protect from the sun.'
  },
  {
    id: 'clothes-6',
    english: 'jacket',
    russian: 'куртка',
    deck: 'clothes',
    example: 'It\'s cold, so I\'m wearing a jacket.'
  },
  {
    id: 'clothes-7',
    english: 'socks',
    russian: 'носки',
    deck: 'clothes',
    example: 'I wear warm socks in winter.'
  },
  {
    id: 'clothes-8',
    english: 'skirt',
    russian: 'юбка',
    deck: 'clothes',
    example: 'She is wearing a red skirt.'
  },
  {
    id: 'clothes-9',
    english: 'sweater',
    russian: 'свитер',
    deck: 'clothes',
    example: 'This sweater keeps me warm.'
  },
  {
    id: 'clothes-10',
    english: 'gloves',
    russian: 'перчатки',
    deck: 'clothes',
    example: 'I wear gloves when it\'s cold outside.'
  },

  // House & Home
  {
    id: 'house-1',
    english: 'house',
    russian: 'дом',
    deck: 'house',
    example: 'We live in a big house.'
  },
  {
    id: 'house-2',
    english: 'room',
    russian: 'комната',
    deck: 'house',
    example: 'My room is on the second floor.'
  },
  {
    id: 'house-3',
    english: 'kitchen',
    russian: 'кухня',
    deck: 'house',
    example: 'We cook meals in the kitchen.'
  },
  {
    id: 'house-4',
    english: 'bedroom',
    russian: 'спальня',
    deck: 'house',
    example: 'I sleep in my bedroom every night.'
  },
  {
    id: 'house-5',
    english: 'bathroom',
    russian: 'ванная',
    deck: 'house',
    example: 'I brush my teeth in the bathroom.'
  },
  {
    id: 'house-6',
    english: 'door',
    russian: 'дверь',
    deck: 'house',
    example: 'Please close the door behind you.'
  },
  {
    id: 'house-7',
    english: 'window',
    russian: 'окно',
    deck: 'house',
    example: 'I can see the garden through the window.'
  },
  {
    id: 'house-8',
    english: 'table',
    russian: 'стол',
    deck: 'house',
    example: 'We eat dinner at the dining table.'
  },
  {
    id: 'house-9',
    english: 'chair',
    russian: 'стул',
    deck: 'house',
    example: 'Please sit on this comfortable chair.'
  },
  {
    id: 'house-10',
    english: 'bed',
    russian: 'кровать',
    deck: 'house',
    example: 'I sleep on a soft bed.'
  },

  // Weather
  {
    id: 'weather-1',
    english: 'sun',
    russian: 'солнце',
    deck: 'weather',
    example: 'The sun is shining brightly today.'
  },
  {
    id: 'weather-2',
    english: 'rain',
    russian: 'дождь',
    deck: 'weather',
    example: 'It\'s raining outside, so take an umbrella.'
  },
  {
    id: 'weather-3',
    english: 'snow',
    russian: 'снег',
    deck: 'weather',
    example: 'Children love to play in the snow.'
  },
  {
    id: 'weather-4',
    english: 'wind',
    russian: 'ветер',
    deck: 'weather',
    example: 'The wind is blowing the leaves around.'
  },
  {
    id: 'weather-5',
    english: 'cloud',
    russian: 'облако',
    deck: 'weather',
    example: 'There are dark clouds in the sky.'
  },
  {
    id: 'weather-6',
    english: 'hot',
    russian: 'жарко',
    deck: 'weather',
    example: 'It\'s very hot in summer.'
  },
  {
    id: 'weather-7',
    english: 'cold',
    russian: 'холодно',
    deck: 'weather',
    example: 'It\'s cold in winter, so wear warm clothes.'
  },
  {
    id: 'weather-8',
    english: 'warm',
    russian: 'тепло',
    deck: 'weather',
    example: 'Spring weather is warm and pleasant.'
  },
  {
    id: 'weather-9',
    english: 'cool',
    russian: 'прохладно',
    deck: 'weather',
    example: 'Autumn evenings are cool and refreshing.'
  },
  {
    id: 'weather-10',
    english: 'storm',
    russian: 'буря',
    deck: 'weather',
    example: 'The storm brought heavy rain and strong winds.'
  }
];

export const getCardsByDeck = (deckId: string): Card[] => {
  return cards.filter(card => card.deck === deckId);
};

export const getDeckById = (deckId: string): Deck | undefined => {
  return decks.find(deck => deck.id === deckId);
}; 
Add 7 new categories and expand content
