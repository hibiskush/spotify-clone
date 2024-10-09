import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const progress = (currentTime / duration) * 100;

  const handleSeek = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    onSeek(newTime);
  };

  return (
    <div className="relative w-1/3 h-4 flex items-center mx-auto" onClick={handleSeek}>
      {/* Wrapper for progress bar */}
      <div className="relative w-full h-2 bg-[#4D4D4D] mx-2">
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-full bg-white group-hover:bg-green-500" 
          style={{ width: `${progress}%` }}
        >
          {/* Thumb */}
          <div className="hidden group-hover:block absolute right-[-0.5rem] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
