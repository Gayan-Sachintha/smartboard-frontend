import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveWhiteboardData } from '../store/whiteboardSlice';
import Whiteboard from '../components/Whiteboard';

const WhiteboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const [detectedText, setDetectedText] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSave = async (data: string) => {
    dispatch(saveWhiteboardData(data));
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/process-whiteboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: data }),
      });

      if (response.ok) {
        const result = await response.json();
        setDetectedText(result.detectedText);
        setResponseData(result.responseData || null);
        setIsSidebarOpen(true);
      } else {
        setError('Error processing data: ' + response.statusText);
      }
    } catch (error) {
      setError('Error communicating with the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center py-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Smart Whiteboard</h1>
        <Whiteboard onSave={handleSave} />

        {loading && <p className="text-blue-500 dark:text-blue-300">Processing the whiteboard data... Please wait.</p>}
        {error && <p className="text-red-500 dark:text-red-300">Error: {error}</p>}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg border-l border-gray-200 dark:border-gray-700
          transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Results</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
          >
            ✖
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-full">
          {detectedText && (
            <div>
              <h3 className="text-lg font-semibold">Detected Text</h3>
              <p>{detectedText}</p>
            </div>
          )}

          {responseData && responseData.contentType === 'math' && (
            <div>
              <h3 className="text-lg font-semibold">Math Equation</h3>
              <p><strong>Message:</strong> {responseData.message}</p>
              <p><strong>Original:</strong> {responseData.original}</p>
              <p><strong>Simplified:</strong> {responseData.simplified}</p>
              <p><strong>Evaluated:</strong> {responseData.evaluated}</p>
              <div>
                <h3 className="text-lg font-semibold">Steps</h3>
                <ul className="list-disc pl-5">
                  {responseData.steps.map((step: { step: string; result: string }, index: number) => (
                    <li key={index}>
                      <p><strong>{step.step}:</strong> {step.result}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {responseData && responseData.contentType === 'text' && (
            <div>
              <h3 className="text-lg font-semibold">Plain Text</h3>
              <p>{responseData.detectedText}</p>
            </div>
          )}

          {!responseData && (
            <p className="text-gray-500 dark:text-gray-400">No processed results available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhiteboardPage;
