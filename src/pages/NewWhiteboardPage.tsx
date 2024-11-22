import React, { useState } from 'react';
import NewWhiteboard from '../components/NewWhiteboard';

const NewWhiteboardPage: React.FC = () => {
  const [result, setResult] = useState<boolean | null>(null);

  const handleResult = (isCorrect: boolean) => {
    setResult(isCorrect);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Draw the Letter</h1>
      <NewWhiteboard onResult={handleResult} />
    </div>
  );
};

export default NewWhiteboardPage;
