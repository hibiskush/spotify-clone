import React, { useState } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const [dragTime, setDragTime] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const progress = ((dragTime ?? currentTime) / duration) * 100;

  const handleSeek = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    let newTime = (offsetX / rect.width) * duration;
    newTime = Math.max(0, Math.min(newTime, duration));
    setDragTime(newTime);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    handleSeek(event);
  };

  const handleMouseUp = () => {
    if (dragTime !== null) {
      onSeek(dragTime);
    }
    setIsDragging(false);
    setDragTime(null);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative w-full flex items-center">
      <span className="text-white text-xs w-12 text-right" style={{ userSelect: 'none' }}>
        {formatTime(isDragging && dragTime !== null ? dragTime : currentTime)}
      </span>
      <div
        className="relative flex-1 h-2 bg-[#4D4D4D] mx-2 rounded-full group"
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleSeek : undefined}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute top-0 left-0 h-full bg-white group-hover:bg-green-500 rounded-full"
          style={{ width: `${progress}%` }}
        >
          <div className="hidden group-hover:block absolute right-[-0.5rem] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
      <span className="text-white text-xs w-12" style={{ userSelect: 'none' }}>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
