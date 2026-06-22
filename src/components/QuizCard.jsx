import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Award, RefreshCw } from 'lucide-react';

export default function QuizCard({ quiz, topicTitle, onCorrectAnswer, onIncorrectAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset quiz state when topic changes
  useEffect(() => {
    setSelectedOption(null);
    setHasAnswered(false);
  }, [quiz, topicTitle]);

  const handleOptionSelect = (option) => {
    if (hasAnswered) return;
    
    setSelectedOption(option);
    setHasAnswered(true);
    
    if (option === quiz.answer) {
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setHasAnswered(false);
  };

  return (
    <div className="study-card quiz-card">
      <div className="card-header">
        <div className="title-area">
          <Award className="card-icon-main" />
          <h3>Quiz Challenge</h3>
        </div>
      </div>
      
      <div className="card-body">
        <p className="quiz-question">{quiz.question}</p>
        
        <div className="quiz-options">
          {quiz.options.map((option, idx) => {
            let btnClass = "option-btn";
            
            if (hasAnswered) {
              if (option === quiz.answer) {
                // Correct answer is always highlighted in green after submission
                btnClass += " correct-option";
              } else if (option === selectedOption) {
                // Wrong selected answer is highlighted in red
                btnClass += " wrong-option";
              } else {
                btnClass += " disabled-option";
              }
            } else {
              btnClass += " active-option";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className={btnClass}
                disabled={hasAnswered}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>
        
        {hasAnswered && (
          <div className={`quiz-feedback-box ${selectedOption === quiz.answer ? 'correct' : 'incorrect'}`}>
            {selectedOption === quiz.answer ? (
              <>
                <CheckCircle2 className="feedback-icon text-success" />
                <div className="feedback-content">
                  <h4>✅ Correct! Great job.</h4>
                  <p>You understood this concept perfectly!</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="feedback-icon text-danger" />
                <div className="feedback-content flex-grow">
                  <h4>❌ Not quite.</h4>
                  <p>The correct answer is <strong>{quiz.answer}</strong>.</p>
                  <button onClick={handleRetry} className="btn-retry">
                    <RefreshCw className="retry-icon" /> Try Again
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
