import React, { useState, useEffect } from 'react';
import { Copy, Check, Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';

export default function ExplanationCard({ topic }) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Reset speak state if topic changes
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCopied(false);
  }, [topic]);

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      const textToCopy = `${topic.title}\n\nExplanation:\n${topic.explanation}\n\nExample:\n${topic.example}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any ongoing speech first
      const speakText = `${topic.title}. Here is the explanation: ${topic.explanation} For example: ${topic.example}`;
      const utterance = new SpeechSynthesisUtterance(speakText);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="study-card explanation-card">
      <div className="card-header">
        <div className="title-area">
          <BookOpen className="card-icon-main" />
          <h3>{topic.title}</h3>
        </div>
        <span className="badge-ai">
          <Sparkles className="badge-icon" />
          AI Generated
        </span>
      </div>
      
      <div className="card-body">
        <p className="explanation-text">{topic.explanation}</p>
        
        {topic.example && (
          <div className="example-box">
            <span className="example-label">Real-World Analogy</span>
            <p className="example-text">"{topic.example}"</p>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button 
          onClick={handleCopy} 
          className={`action-btn ${copied ? 'copied' : ''}`}
          title="Copy to Clipboard"
        >
          {copied ? (
            <>
              <Check className="action-icon text-success" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="action-icon" />
              <span>Copy Guide</span>
            </>
          )}
        </button>
        
        <button 
          onClick={handleSpeak} 
          className={`action-btn ${isSpeaking ? 'speaking' : ''}`}
          title={isSpeaking ? "Stop Reading" : "Read Aloud"}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="action-icon text-warning animate-pulse" />
              <span>Stop Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="action-icon" />
              <span>Read Aloud</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
