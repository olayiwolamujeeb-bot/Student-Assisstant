import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const MESSAGES = [
  "Analyzing topic...",
  "Simplifying concepts...",
  "Creating quiz...",
  "Finding fun facts...",
  "Preparing study guide..."
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="spinner-wrapper">
          <Loader2 className="spinner-icon" />
          <div className="spinner-pulse"></div>
        </div>
        <p className="loading-message">{MESSAGES[messageIndex]}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((messageIndex + 1) / MESSAGES.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
