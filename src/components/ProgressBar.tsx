import type { FC } from 'react';

interface ProgressBarProps {
  currentIndex: number; // zero-based index
  total: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ currentIndex, total }) => {
  const percent = total > 0 ? Math.min(100, Math.max(0, Math.round(((currentIndex + 1) / total) * 100))) : 0;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;