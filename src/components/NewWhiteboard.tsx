import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import AlphabetSelector from './AlphabetSelector';
import Toolbar from './Toolbar';

interface NewWhiteboardProps {
  onResult: (result: boolean) => void;
}

const NewWhiteboard: React.FC<NewWhiteboardProps> = ({ onResult }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true, 
      });

      // Set default brush settings
      if (fabricRef.current.freeDrawingBrush) {
        fabricRef.current.freeDrawingBrush.color = '#000000'; 
        fabricRef.current.freeDrawingBrush.width = 5; 
      }
    }
    return () => {
      fabricRef.current?.dispose();
    };
  }, []);

  const handleClearCanvas = () => {
    fabricRef.current?.clear();
    setFeedbackMessage(null);
  };

  const handleCheckDrawing = () => {
    if (fabricRef.current) {
      const canvasImage = fabricRef.current.toDataURL();
      const isCorrect = Math.random() > 0.5; // Replace with real validation logic
      setFeedbackMessage(isCorrect ? 'Success! You drew the letter correctly.' : 'Incorrect! Try again.');
      onResult(isCorrect);
    }
  };

  const handleSelectLetter = (letter: string) => {
    setSelectedLetter(letter);
    if (fabricRef.current) {
      const existingLetter = fabricRef.current.getObjects('text').find((obj) => obj.type === 'text');
      if (existingLetter) {
        fabricRef.current.remove(existingLetter);
      }
      const letterText = new fabric.Text(letter, {
        left: 400,
        top: 300,
        fontSize: 150,
        fill: '#cccccc',
        selectable: false,
        opacity: 0.5,
      });
      fabricRef.current.add(letterText);
      fabricRef.current.renderAll();
    }
  };

  const handleModeChange = (mode: 'draw' | 'erase') => {
    if (fabricRef.current) {
      fabricRef.current.isDrawingMode = mode === 'draw';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <Toolbar
        onBrushSizeChange={(size) => {
          if (fabricRef.current && fabricRef.current.freeDrawingBrush) {
            fabricRef.current.freeDrawingBrush.width = size;
          }
        }}
        onBrushColorChange={(color) => {
          if (fabricRef.current && fabricRef.current.freeDrawingBrush) {
            fabricRef.current.freeDrawingBrush.color = color;
          }
        }}
        onBrushTypeChange={() => {}}
        onModeChange={handleModeChange}
        onSave={handleCheckDrawing}
      />
      <AlphabetSelector selectedLetter={selectedLetter} onSelectLetter={handleSelectLetter} />
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-gray-300 shadow-lg z-10"
      ></canvas>
      <div className="flex space-x-4">
        <button
          onClick={handleCheckDrawing}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 dark:bg-green-700"
        >
          Check Drawing
        </button>
        <button
          onClick={handleClearCanvas}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 dark:bg-gray-700"
        >
          Clear Canvas
        </button>
      </div>
      {feedbackMessage && (
        <div
          className={`p-4 rounded-lg shadow ${
            feedbackMessage.includes('Success')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default NewWhiteboard;
