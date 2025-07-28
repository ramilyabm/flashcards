import type { FC } from 'react';

interface StudyProps {
  onNavigateHome: () => void;
}

const Study: FC<StudyProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Study Mode
        </h1>
        <p className="text-gray-600 mb-8">
          This feature will be implemented in Phase 2
        </p>
        
        <button
          onClick={onNavigateHome}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Study; 