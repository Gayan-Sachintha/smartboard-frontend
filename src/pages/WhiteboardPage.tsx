import React from 'react';
import { useDispatch } from 'react-redux';
import { saveWhiteboardData } from '../store/whiteboardSlice';
import Whiteboard from '../components/Whiteboard';

const WhiteboardPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSave = async (data: string) => {
    // Save the whiteboard data to Redux
    dispatch(saveWhiteboardData(data));

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:5000/api/process-whiteboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }), // Pass whiteboard data to the backend
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Processed Data (From Backend):', result);
      } else {
        console.error('Error processing data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Interactive Whiteboard</h1>
      <Whiteboard onSave={handleSave} />
    </div>
  );
};

export default WhiteboardPage;
