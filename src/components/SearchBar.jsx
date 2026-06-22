import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSearch(input.trim());
  };

  const handleQuickSuggestion = (suggestion) => {
    if (isLoading) return;
    setInput(suggestion);
    onSearch(suggestion);
  };

  return (
    <div className="hero-search-card">
      <div className="hero-content">
        <h2>What are you studying today?</h2>
        <p className="hero-sub">Enter any topic below, and our mock AI will craft an easy-to-understand study guide, a quiz challenge, and fun facts.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try Photosynthesis, Algebra, Human Heart, Electricity..."
            disabled={isLoading}
            className="search-input"
            maxLength={100}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          className="btn-generate"
        >
          {isLoading ? (
            <>Generating...</>
          ) : (
            <>
              <Sparkles className="btn-icon" />
              Generate Study Guide
            </>
          )}
        </button>
      </form>
      
      <div className="popular-tags">
        <span className="tags-label">Popular topics:</span>
        <button onClick={() => handleQuickSuggestion('Photosynthesis')} disabled={isLoading} className="tag-btn">Photosynthesis</button>
        <button onClick={() => handleQuickSuggestion('Algebra')} disabled={isLoading} className="tag-btn">Algebra</button>
        <button onClick={() => handleQuickSuggestion('Solar System')} disabled={isLoading} className="tag-btn">Solar System</button>
        <button onClick={() => handleQuickSuggestion('Electricity')} disabled={isLoading} className="tag-btn">Electricity</button>
      </div>
    </div>
  );
}
