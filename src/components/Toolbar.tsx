import React, { useState } from 'react';

interface ToolbarProps {
  onBrushSizeChange: (size: number) => void;
  onBrushColorChange: (color: string) => void;
  onBrushTypeChange: (type: string) => void;
  onModeChange: (mode: 'draw' | 'erase') => void;
  onSave: () => void;  
}

const Toolbar: React.FC<ToolbarProps> = ({
  onBrushSizeChange,
  onBrushColorChange,
  onBrushTypeChange,
  onModeChange,
  onSave,
}) => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushType, setBrushType] = useState('PencilBrush');

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-6 shadow-2xl rounded-lg w-full max-w-5xl mx-auto">
      {/* Brush Size Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <label
            htmlFor="brushSize"
            className="text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Brush Size
          </label>
          <input
            id="brushSize"
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => {
              const size = Number(e.target.value);
              setBrushSize(size);
              onBrushSizeChange(size);
            }}
            className="w-36 accent-blue-500"
          />
        </div>
        {/* Preview Circle for Brush Size */}
        <div
          className="flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-600"
          style={{
            width: `${brushSize * 2}px`,
            height: `${brushSize * 2}px`,
            backgroundColor: brushColor,
          }}
        ></div>
      </div>

      {/* Brush Color Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <label
            htmlFor="brushColor"
            className="text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Brush Color
          </label>
          <input
            id="brushColor"
            type="color"
            value={brushColor}
            onChange={(e) => {
              const color = e.target.value;
              setBrushColor(color);
              onBrushColorChange(color);
            }}
            className="h-10 w-10 cursor-pointer rounded-full border border-gray-300 dark:border-gray-700"
          />
        </div>
      </div>

      {/* Brush Type Selector */}
      <div className="flex flex-col items-center space-y-2">
        <label
          htmlFor="brushType"
          className="text-sm font-semibold text-gray-800 dark:text-gray-200"
        >
          Brush Type
        </label>
        <select
          id="brushType"
          value={brushType}
          onChange={(e) => {
            const type = e.target.value;
            setBrushType(type);
            onBrushTypeChange(type);
          }}
          className="border dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
        >
          <option value="PencilBrush">Pencil</option>
          <option value="CircleBrush">Circle</option>
          <option value="SprayBrush">Spray</option>
        </select>
      </div>

      {/* Mode Selector */}
      <div className="flex space-x-4">
        <button
          onClick={() => onModeChange('draw')}
          className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 transition-transform transform hover:scale-105"
        >
          Draw
        </button>
        <button
          onClick={() => onModeChange('erase')}
          className="flex items-center justify-center px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 focus:ring-2 focus:ring-red-300 transition-transform transform hover:scale-105"
        >
          Erase
        </button>
      </div>

      {/* Save Button */}
      <div className="flex items-center">
        <button
          onClick={onSave}
          className="flex items-center justify-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 focus:ring-2 focus:ring-green-300 transition-transform transform hover:scale-105"
        >
          Get Answer
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
