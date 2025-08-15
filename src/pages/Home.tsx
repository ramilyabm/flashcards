import type { FC } from 'react';
import AppButton from '../components/AppButton';

interface HomeProps {
  onNavigate: (page: 'study' | 'quiz' | 'stats' | 'deck-manager') => void;
}

const Home: FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border border-white/20">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">🎓 English Flashcards ✨</h1>
        <p className="text-gray-600 mb-10 text-lg">Learn English vocabulary with Russian translations</p>

        <div className="space-y-5 flex flex-col items-center">
          <AppButton intent="primary" onClick={() => onNavigate('study')} className="py-4 px-12 w-60">
            📚 Study Mode
          </AppButton>

          <AppButton intent="success" onClick={() => onNavigate('quiz')} className="py-4 px-12 w-60">
            🧩 Quiz Mode
          </AppButton>

          <AppButton intent="danger" onClick={() => onNavigate('stats')} className="py-4 px-12 w-60">
            📊 Stats Page
          </AppButton>

          <AppButton intent="secondary" onClick={() => onNavigate('deck-manager')} className="py-4 px-12 w-60">
            🛠️ Manage Decks
          </AppButton>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Practice vocabulary with flashcards and quizzes</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 