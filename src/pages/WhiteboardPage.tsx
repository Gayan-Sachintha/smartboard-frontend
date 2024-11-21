import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveWhiteboardData } from '../store/whiteboardSlice';
import Whiteboard from '../components/Whiteboard';

const WhiteboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const [detectedText, setDetectedText] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const handleSave = async (data: string) => {
    // Save the whiteboard data to Redux
    dispatch(saveWhiteboardData(data));

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:5000/api/process-whiteboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Processed Data (From Backend):', result);

        setDetectedText(result.detectedText);
        setSteps(result.steps || []);
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

      {/* Display Detected Text */}
      {detectedText && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Detected Text:</h3>
          <p>{detectedText}</p>
        </div>
      )}

      {/* Display Steps for Formula Solving */}
      {steps.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Formula Solving Steps:</h3>
          <ul className="list-disc pl-5">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WhiteboardPage;
