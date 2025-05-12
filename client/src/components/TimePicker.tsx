import React, { useState, useEffect } from "react";

interface TimePickerProps {
  onTimeSelected: (hour: number, minute: number) => void;
  initialHour?: number;
  initialMinute?: number;
}

const TimePicker: React.FC<TimePickerProps> = ({ 
  onTimeSelected, 
  initialHour = new Date().getHours(),
  initialMinute = new Date().getMinutes()
}) => {
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [period, setPeriod] = useState<"AM" | "PM">(initialHour >= 12 ? "PM" : "AM");

  useEffect(() => {
    // Convert to 24 hour format if needed
    const hour24 = period === "AM" 
      ? (hour === 12 ? 0 : hour) 
      : (hour === 12 ? 12 : hour + 12);
    
    onTimeSelected(hour24, minute);
  }, [hour, minute, period, onTimeSelected]);

  const displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);

  const increaseHour = () => {
    setHour(prev => {
      const newHour = (prev + 1) % 24;
      setPeriod(newHour >= 12 ? "PM" : "AM");
      return newHour;
    });
  };

  const decreaseHour = () => {
    setHour(prev => {
      const newHour = prev === 0 ? 23 : prev - 1;
      setPeriod(newHour >= 12 ? "PM" : "AM");
      return newHour;
    });
  };

  const increaseMinute = () => {
    setMinute(prev => (prev + 1) % 60);
  };

  const decreaseMinute = () => {
    setMinute(prev => prev === 0 ? 59 : prev - 1);
  };

  const togglePeriod = () => {
    setPeriod(prev => {
      const newPeriod = prev === "AM" ? "PM" : "AM";
      // Adjust hour value when toggling
      if (newPeriod === "AM" && hour >= 12) {
        setHour(hour - 12);
      } else if (newPeriod === "PM" && hour < 12) {
        setHour(hour + 12);
      }
      return newPeriod;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">Set Check-In Time</h3>
        <p className="text-sm wa-text-secondary">Select when you want to check in</p>
      </div>

      <div className="flex items-center justify-center space-x-4 my-6">
        {/* Hour */}
        <div className="flex flex-col items-center">
          <button 
            className="p-2 wa-bg-bubble-in rounded-full mb-2"
            onClick={increaseHour}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
          </button>
          <div className="w-20 h-20 wa-bg-green rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold">{displayHour}</span>
          </div>
          <button 
            className="p-2 wa-bg-bubble-in rounded-full mt-2"
            onClick={decreaseHour}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <span className="text-sm mt-1">Hour</span>
        </div>

        <span className="text-4xl font-bold mt-2">:</span>

        {/* Minute */}
        <div className="flex flex-col items-center">
          <button 
            className="p-2 wa-bg-bubble-in rounded-full mb-2"
            onClick={increaseMinute}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
          </button>
          <div className="w-20 h-20 wa-bg-green rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold">{minute.toString().padStart(2, '0')}</span>
          </div>
          <button 
            className="p-2 wa-bg-bubble-in rounded-full mt-2"
            onClick={decreaseMinute}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <span className="text-sm mt-1">Minute</span>
        </div>

        {/* AM/PM */}
        <div className="flex flex-col items-center ml-2">
          <button 
            className={`w-16 py-2 rounded mb-2 ${period === "AM" ? "wa-bg-green" : "wa-bg-bubble-in"}`}
            onClick={togglePeriod}
          >
            AM
          </button>
          <button 
            className={`w-16 py-2 rounded ${period === "PM" ? "wa-bg-green" : "wa-bg-bubble-in"}`}
            onClick={togglePeriod}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;