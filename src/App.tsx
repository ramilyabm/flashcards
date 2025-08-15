import { useState } from 'react';
import Home from './pages/Home';
import Study from './pages/Study';
import Quiz from './pages/Quiz';
import Stats from './pages/Stats';
import DeckManager from './pages/DeckManager';

type Page = 'home' | 'study' | 'quiz' | 'stats' | 'deck-manager';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
  };

  switch (currentPage) {
    case 'study':
      return <Study onNavigateHome={handleNavigateHome} />;
    case 'quiz':
      return <Quiz onNavigateHome={handleNavigateHome} />;
    case 'stats':
      return <Stats onNavigateHome={handleNavigateHome} />;
    case 'deck-manager':
      return <DeckManager onNavigateHome={handleNavigateHome} />;
    default:
      return <Home onNavigate={handleNavigate} />;
  }
}

export default App;
