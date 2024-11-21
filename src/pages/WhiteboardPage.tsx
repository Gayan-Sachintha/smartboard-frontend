import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveWhiteboardData } from '../store/whiteboardSlice';
import Whiteboard from '../components/Whiteboard';

const WhiteboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const [detectedText, setDetectedText] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (data: string) => {
    // Save the whiteboard data to Redux
    dispatch(saveWhiteboardData(data));
    setLoading(true);
    setError(null);

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:5000/api/process-whiteboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: data }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Processed Data (From Backend):', result);

        setDetectedText(result.detectedText);
        setSteps(result.analysisResult?.steps || []);
      } else {
        setError('Error processing data: ' + response.statusText);
      }
    } catch (error) {
      setError('Error communicating with the backend.');
      console.error('Error sending data to backend:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Interactive Whiteboard</h1>
      <Whiteboard onSave={handleSave} />

      {/* Loading Indicator */}
      {loading && <p className="text-blue-500">Processing the whiteboard data... Please wait.</p>}

      {/* Error Message */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Display Detected Text */}
      {detectedText && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Detected Text:</h3>
          <p>{detectedText}</p>
        </div>
      )}

      {/* Display Analysis Steps */}
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
