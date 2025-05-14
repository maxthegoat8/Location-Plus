import React, { useState, useEffect, useCallback } from "react";

interface InlineCheckInTimerProps {
  scheduledTime: Date;
  message: string;
  onComplete: () => void;
  onCancel: () => void;
}

const InlineCheckInTimer: React.FC<InlineCheckInTimerProps> = ({ 
  scheduledTime, 
  message,
  onComplete,
  onCancel
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  // Calculate time remaining in seconds
  const calculateTimeLeft = useCallback(() => {
    const currentTime = new Date();
    const difference = Math.floor((scheduledTime.getTime() - currentTime.getTime()) / 1000);
    return difference > 0 ? difference : 0;
  }, [scheduledTime]);

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Set up interval to update countdown
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining <= 0 && !isComplete) {
        clearInterval(timer);
        setIsComplete(true);
        onComplete();
      }
    }, 1000);

    // Clean up interval
    return () => clearInterval(timer);
  }, [calculateTimeLeft, isComplete, onComplete]);

  // Format seconds into HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="wa-bg-bubble-in p-4 rounded-xl mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold">Scheduled Check-In</h3>
          <p className="text-sm wa-text-secondary">
            {message ? message : "I'll let you know when I arrive..."}
          </p>
        </div>
        <div className="flex items-center">
          <div className="bg-wa-light-green rounded-full px-3 py-1 text-white text-sm font-bold">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-2 bg-gray-700 rounded-full mb-3">
        <div 
          className="absolute left-0 top-0 h-full bg-wa-light-green rounded-full"
          style={{ 
            width: `${(timeLeft / calculateTimeLeft()) * 100}%` 
          }}
        ></div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={onCancel}
          className="flex-1 py-2 rounded-lg bg-wa-bg-bubble-out text-white text-sm"
        >
          Cancel
        </button>
        <button 
          onClick={onComplete}
          className="flex-1 py-2 rounded-lg bg-wa-light-green text-white text-sm"
        >
          Check Now
        </button>
      </div>
    </div>
  );
};

export default InlineCheckInTimer;