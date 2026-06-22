import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

export default function FunFactCard({ funFact }) {
  return (
    <div className="study-card fun-fact-card animate-fade-in">
      <div className="card-header">
        <div className="title-area">
          <Info className="card-icon-main" />
          <h3>Did You Know?</h3>
        </div>
      </div>
      
      <div className="card-body fun-fact-body">
        <div className="lightbulb-glow-container">
          <div className="lightbulb-pulse"></div>
          <Lightbulb className="lightbulb-icon" />
        </div>
        <p className="fun-fact-text">{funFact}</p>
      </div>
    </div>
  );
}
