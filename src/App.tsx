import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import WhiteboardPage from './pages/WhiteboardPage';
import NewWhiteboardPage from './pages/NewWhiteboardPage';
import './index.css';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard" element={<WhiteboardPage />} />
        <Route path="/whiteboardkids" element={<NewWhiteboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
