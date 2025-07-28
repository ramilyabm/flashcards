import type { FC } from 'react';

interface HomeProps {
  onNavigate: (page: 'study' | 'quiz' | 'stats') => void;
}

const Home: FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center border border-white/20">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          🎓 English Flashcards ✨
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Learn English vocabulary with Russian translations
        </p>
        
        <div className="space-y-5 flex flex-col items-center">
          <button
            onClick={() => onNavigate('study')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 w-60 transition duration-200 shadow-md hover:shadow-lg"
          >
            📚 Study Mode
          </button>
          
          <button
            onClick={() => onNavigate('quiz')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-12 w-60 transition duration-200 shadow-md hover:shadow-lg"
          >
            🧩 Quiz Mode
          </button>
          
          <button
            onClick={() => onNavigate('stats')}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-12 w-60 transition duration-200 shadow-md hover:shadow-lg"
          >
            📊 Stats Page
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Practice vocabulary with flashcards and quizzes</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 