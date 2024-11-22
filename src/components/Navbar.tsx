import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-300/60 dark:bg-gray-800/60 backdrop-blur-md p-4 shadow-lg z-10">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-gray-800 dark:text-white text-xl font-bold">
          <Link to="/">SmartBoard</Link>
        </h1>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-gray-800 dark:text-gray-300 hover:underline">
            Home
          </Link>
          <Link to="/whiteboard" className="text-gray-800 dark:text-gray-300 hover:underline">
            Whiteboard
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
