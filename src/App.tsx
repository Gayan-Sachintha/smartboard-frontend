import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import WhiteboardPage from './pages/WhiteboardPage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/whiteboard">Whiteboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard" element={<WhiteboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
