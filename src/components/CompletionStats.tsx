import type { FC } from 'react';

interface CompletionStatsProps {
  accuracyPercent: number;
  correctCount: number;
  incorrectCount: number;
  totalCount: number;
}

const CompletionStats: FC<CompletionStatsProps> = ({ accuracyPercent, correctCount, incorrectCount, totalCount }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="text-2xl font-bold text-gray-800 mb-2">
        {accuracyPercent}% Accuracy
      </div>
      <div className="text-gray-600">
        <div className="flex justify-between mb-1">
          <span>✅ Correct:</span>
          <span className="font-semibold text-green-600">{correctCount}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>❌ Incorrect:</span>
          <span className="font-semibold text-red-600">{incorrectCount}</span>
        </div>
        <div className="flex justify-between">
          <span>📊 Total:</span>
          <span className="font-semibold">{totalCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CompletionStats;