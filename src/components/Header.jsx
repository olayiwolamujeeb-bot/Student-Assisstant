import React from 'react';
import { Sparkles, Sun, Moon, Flame } from 'lucide-react';

export default function Header({ darkMode, setDarkMode, streak }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-container">
          <Sparkles className="logo-icon" />
        </div>
        <div className="title-container">
          <h1>AI Study Assistant</h1>
          <p className="subtitle">Learn any topic in simple language</p>
        </div>
      </div>
      <div className="header-right">
        {streak > 0 && (
          <div className="streak-badge" title="Daily Study Streak">
            <Flame className="streak-icon" />
            <span className="streak-count">{streak} Day Streak</span>
          </div>
        )}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="theme-toggle" 
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
        </button>
      </div>
    </header>
  );
}
