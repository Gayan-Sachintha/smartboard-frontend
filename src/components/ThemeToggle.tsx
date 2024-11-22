import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Apply theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        // Sun icon for light theme
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21m8.485-8.485H19.5M4.5 12H3m15.364-6.364l-1.06 1.06M6.364 17.636l-1.06-1.06m12.727 0l-1.06 1.06M6.364 6.364l-1.06-1.06M12 6a6 6 0 100 12 6 6 0 000-12z"
          />
        </svg>
      ) : (
        // Moon icon for dark theme
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0112.45 21c-5.523 0-10-4.477-10-10a9.718 9.718 0 015.998-9.302 7.5 7.5 0 1013.304 13.304z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
