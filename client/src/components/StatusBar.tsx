import React, { useState, useEffect } from "react";

const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flex justify-between items-center px-4 py-2 text-sm bg-black bg-opacity-30">
      <span>{formattedTime}</span>
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sm">
          <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6"></path>
          <path d="M17 17v1a1 1 0 0 0 1 1h1"></path>
          <path d="M20 17v1a1 1 0 0 1 -1 1h-1"></path>
          <path d="M17 21v1a1 1 0 0 1 -1 1h-1"></path>
          <path d="M20 21v1a1 1 0 0 0 1 1h1"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sm">
          <path d="M12 18l.01 0"></path>
          <path d="M9.172 15.172a4 4 0 0 1 5.656 0"></path>
          <path d="M6.343 12.343a8 8 0 0 1 11.314 0"></path>
          <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"></path>
        </svg>
        <span>20</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sm">
          <path d="M6 7h11a2 2 0 0 1 2 2v.5a0 0.5 0 0 0 0 .5a0 0.5 0 0 1 0 .5v.5a2 2 0 0 1 -2 2a2 2 0 0 1 2 2v.5a0 0.5 0 0 1 0 .5a0 0.5 0 0 0 0 .5v.5a2 2 0 0 1 -2 2h-11"></path>
          <path d="M7 10v4"></path>
          <path d="M10 10v4"></path>
          <path d="M13 10v4"></path>
          <path d="M16 10v4"></path>
        </svg>
      </div>
    </div>
  );
};

export default StatusBar;