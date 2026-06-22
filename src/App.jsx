import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LoadingScreen from './components/LoadingScreen';
import ExplanationCard from './components/ExplanationCard';
import QuizCard from './components/QuizCard';
import FunFactCard from './components/FunFactCard';
import RecentTopics from './components/RecentTopics';
import { studyData } from './data/studyData';
import { BookOpen, AlertCircle, RefreshCw, GraduationCap, Flame, BarChart2 } from 'lucide-react';
import './styles/app.css';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark mode for premium aesthetics!
  });

  // Study content state
  const [currentTopic, setCurrentTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [failedQuery, setFailedQuery] = useState('');

  // History state
  const [recentTopics, setRecentTopics] = useState(() => {
    const saved = localStorage.getItem('recentTopics');
    return saved ? JSON.parse(saved) : [];
  });

  // Streak state
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Stats state
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('studyStats');
    return saved ? JSON.parse(saved) : { topicsExplored: 0, correctAnswers: 0, totalQuizzes: 0 };
  });

  // Apply dark mode class to document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync recent topics to localStorage
  useEffect(() => {
    localStorage.setItem('recentTopics', JSON.stringify(recentTopics));
  }, [recentTopics]);

  // Sync stats to localStorage
  useEffect(() => {
    localStorage.setItem('studyStats', JSON.stringify(stats));
  }, [stats]);

  // Mock AI resolution function
  const handleSearch = (topicName) => {
    setIsLoading(true);
    setNotFound(false);
    setCurrentTopic(null);

    // Simulate AI generation lag
    setTimeout(() => {
      const normalizedQuery = topicName.trim().toLowerCase();
      const topicObj = studyData[normalizedQuery];

      if (topicObj) {
        setCurrentTopic(topicObj);
        
        // Add to history if it's not already at the top
        setRecentTopics((prev) => {
          const filtered = prev.filter((t) => t.toLowerCase() !== normalizedQuery);
          return [topicObj.title, ...filtered].slice(0, 8); // Keep last 8 searches
        });

        // Update stats: Explored topics (unique count)
        setStats((prev) => {
          const isNew = !recentTopics.some((t) => t.toLowerCase() === normalizedQuery);
          return {
            ...prev,
            topicsExplored: isNew ? prev.topicsExplored + 1 : prev.topicsExplored
          };
        });

        // Update streak
        updateDailyStreak();
      } else {
        setNotFound(true);
        setFailedQuery(topicName);
      }
      setIsLoading(false);
    }, 2500);
  };

  // Streak logic
  const updateDailyStreak = () => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastStudyDate');
    const storedStreak = parseInt(localStorage.getItem('streak') || '0', 10);
    
    if (lastDate === today) {
      // Already studied today, keep current streak
      setStreak(storedStreak);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();
      
      let newStreak = 1;
      if (lastDate === yesterdayStr) {
        newStreak = storedStreak + 1;
      }
      
      setStreak(newStreak);
      localStorage.setItem('streak', newStreak.toString());
      localStorage.setItem('lastStudyDate', today);
    }
  };

  // Clear history and stats
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your search history and study statistics?")) {
      setRecentTopics([]);
      setStreak(0);
      setStats({ topicsExplored: 0, correctAnswers: 0, totalQuizzes: 0 });
      localStorage.removeItem('recentTopics');
      localStorage.removeItem('streak');
      localStorage.removeItem('lastStudyDate');
      localStorage.removeItem('studyStats');
    }
  };

  // Quiz callbacks
  const handleCorrectAnswer = () => {
    setStats((prev) => ({
      ...prev,
      correctAnswers: prev.correctAnswers + 1,
      totalQuizzes: prev.totalQuizzes + 1
    }));
  };

  const handleIncorrectAnswer = () => {
    setStats((prev) => ({
      ...prev,
      totalQuizzes: prev.totalQuizzes + 1
    }));
  };

  // Quick reload function for suggestions or sidebar history clicks
  const loadTopic = (topicName) => {
    handleSearch(topicName);
  };

  return (
    <div className="app-wrapper">
      <div className="background-decorations">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="app-container">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} streak={streak} />
        
        <main className="app-main-layout">
          <div className="main-content-column">
            {/* Search/Hero Card */}
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            
            {/* Content Area states */}
            {isLoading && <LoadingScreen />}
            
            {!isLoading && notFound && (
              <div className="state-card error-card animate-fade-in">
                <AlertCircle className="state-icon text-warning" />
                <h3>We couldn't find study materials for "{failedQuery}"</h3>
                <p>Mock AI databases only contain specific preloaded topics. Try one of our suggested topics below:</p>
                <div className="suggestions-grid">
                  <button onClick={() => loadTopic('Photosynthesis')} className="suggest-btn">Photosynthesis</button>
                  <button onClick={() => loadTopic('Algebra')} className="suggest-btn">Algebra</button>
                  <button onClick={() => loadTopic('Solar System')} className="suggest-btn">Solar System</button>
                  <button onClick={() => loadTopic('Electricity')} className="suggest-btn">Electricity</button>
                  <button onClick={() => loadTopic('Human Heart')} className="suggest-btn">Human Heart</button>
                  <button onClick={() => loadTopic('Computer Programming')} className="suggest-btn">Computer Programming</button>
                </div>
              </div>
            )}

            {!isLoading && !notFound && !currentTopic && (
              <div className="state-card empty-card animate-fade-in">
                <div className="illustration-wrapper">
                  <GraduationCap className="empty-state-icon" />
                  <div className="pulse-ring"></div>
                </div>
                <h3>Enter a topic to start learning</h3>
                <p>Type a topic in the search bar above or click one of our popular tags to generate an instant study guide.</p>
              </div>
            )}

            {!isLoading && !notFound && currentTopic && (
              <div className="results-container">
                <ExplanationCard topic={currentTopic} />
                
                <div className="results-grid">
                  <QuizCard 
                    quiz={currentTopic.quiz} 
                    topicTitle={currentTopic.title}
                    onCorrectAnswer={handleCorrectAnswer}
                    onIncorrectAnswer={handleIncorrectAnswer}
                  />
                  <FunFactCard funFact={currentTopic.funFact} />
                </div>
                
                <div className="results-actions-footer">
                  <button onClick={() => handleSearch(currentTopic.title)} className="btn-regenerate">
                    <RefreshCw className="regen-icon" />
                    Regenerate Guide (Test Loader)
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <aside className="sidebar-column">
            <RecentTopics 
              topics={recentTopics} 
              onSelectTopic={loadTopic} 
              onClearHistory={handleClearHistory}
              stats={stats}
              streak={streak}
            />
          </aside>
        </main>
      </div>
    </div>
  );
}
