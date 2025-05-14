import React, { useState, useEffect, useCallback } from "react";

interface CheckInCountdownProps {
  scheduledTime: Date;
  onComplete: () => void;
  onCancel: () => void;
}

const CheckInCountdown: React.FC<CheckInCountdownProps> = ({ 
  scheduledTime, 
  onComplete,
  onCancel
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  // Calculate time remaining in seconds
  const calculateTimeLeft = useCallback(() => {
    // Fixed current time at 9:34 PM
    const currentTime = new Date();
    currentTime.setHours(21, 34, 0); // Set to 9:34 PM

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

  // Calculate percentage for progress circle
  const calculatePercentage = (): number => {
    const totalDuration = Math.floor((scheduledTime.getTime() - new Date(new Date().setHours(21, 34, 0)).getTime()) / 1000);
    return (timeLeft / totalDuration) * 100;
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="wa-bg-dark rounded-xl w-5/6 p-5 max-w-xs text-center">
        <h2 className="text-xl font-bold mb-2">Check-In Scheduled</h2>
        <p className="mb-6 text-sm wa-text-secondary">
          A safety check will be requested when the timer reaches 00:00:00
        </p>
        
        {/* Timer Circle */}
        <div className="relative mx-auto w-48 h-48 mb-6">
          {/* Background Circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#1F2C34" 
              strokeWidth="8"
            />
            
            {/* Progress Circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45"
              fill="none" 
              stroke="#25D366" 
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * calculatePercentage() / 100)}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Timer Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={onCancel}
            className="wa-bg-bubble-in py-3 flex-1 rounded-lg font-semibold"
          >
            Cancel
          </button>
          <button 
            onClick={onComplete}
            className="wa-bg-green text-white py-3 flex-1 rounded-lg font-semibold"
          >
            Check Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInCountdown;