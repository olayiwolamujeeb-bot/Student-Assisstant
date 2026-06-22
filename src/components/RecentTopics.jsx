import React from 'react';
import { History, Trash2, Award, Flame, CheckCircle, BarChart2 } from 'lucide-react';

export default function RecentTopics({ 
  topics, 
  onSelectTopic, 
  onClearHistory, 
  stats, 
  streak 
}) {
  const accuracy = stats.totalQuizzes > 0 
    ? Math.round((stats.correctAnswers / stats.totalQuizzes) * 100) 
    : 0;

  return (
    <div className="sidebar-container">
      {/* Daily Learning Streak Widget */}
      <div className="sidebar-widget streak-widget">
        <div className="widget-header">
          <Flame className="widget-icon text-warning animate-bounce-slow" />
          <h4>Daily Streak</h4>
        </div>
        <div className="streak-body">
          <div className="streak-value">{streak} {streak === 1 ? 'Day' : 'Days'}</div>
          <p className="streak-sub">
            {streak > 0 
              ? "🔥 Keep the fire burning! Learn every day." 
              : "Start reading guides to begin your daily learning streak!"}
          </p>
        </div>
      </div>

      {/* Study Statistics Widget */}
      <div className="sidebar-widget stats-widget">
        <div className="widget-header">
          <BarChart2 className="widget-icon text-primary" />
          <h4>Study Statistics</h4>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Topics Explored</span>
            <span className="stat-val">{stats.topicsExplored || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Quiz Accuracy</span>
            <span className="stat-val">{accuracy}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Correct Answers</span>
            <span className="stat-val">{stats.correctAnswers || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Quizzes</span>
            <span className="stat-val">{stats.totalQuizzes || 0}</span>
          </div>
        </div>
      </div>

      {/* Recent Topics */}
      <div className="sidebar-widget recent-widget">
        <div className="widget-header flex-between">
          <div className="flex-align">
            <History className="widget-icon text-secondary" />
            <h4>Recent Topics</h4>
          </div>
          {topics.length > 0 && (
            <button 
              onClick={onClearHistory} 
              className="btn-clear-history"
              title="Clear all history"
            >
              <Trash2 className="trash-icon" />
            </button>
          )}
        </div>
        
        {topics.length === 0 ? (
          <p className="no-history-text">No recently studied topics yet.</p>
        ) : (
          <ul className="recent-list">
            {topics.map((topic, index) => (
              <li key={index} className="recent-item animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <button 
                  onClick={() => onSelectTopic(topic)}
                  className="recent-topic-btn"
                >
                  <span className="dot">•</span>
                  <span className="topic-text-truncate">{topic}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
