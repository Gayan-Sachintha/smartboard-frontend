import React, { useState } from 'react';

interface ToolbarKidsProps {
  onBrushSizeChange: (size: number) => void;
  onBrushColorChange: (color: string) => void;
  onBrushTypeChange: (type: string) => void;
  onModeChange: (mode: 'draw' | 'erase') => void;
}

const ToolbarKids: React.FC<ToolbarKidsProps> = ({
  onBrushSizeChange,
  onBrushColorChange,
  onBrushTypeChange,
  onModeChange,
}) => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushType, setBrushType] = useState('PencilBrush');
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');

  const handleModeChange = (selectedMode: 'draw' | 'erase') => {
    setMode(selectedMode);
    onModeChange(selectedMode);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900 p-6 shadow-xl rounded-lg w-full max-w-5xl mx-auto">
      {/* Brush Size Selector */}
      <div className="flex flex-col items-center">
        <label htmlFor="brushSize" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
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
        <div
          className="mt-2 rounded-full border border-gray-400 dark:border-gray-600"
          style={{
            width: `${brushSize * 2}px`,
            height: `${brushSize * 2}px`,
            backgroundColor: brushColor,
          }}
        ></div>
      </div>

      {/* Brush Color Selector */}
      <div className="flex flex-col items-center">
        <label htmlFor="brushColor" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
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

      {/* Brush Type Selector */}
      <div className="flex flex-col items-center">
        <label htmlFor="brushType" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
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
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Mode</label>
        <div className="flex space-x-2">
          <button
            onClick={() => handleModeChange('draw')}
            className={`px-6 py-2 rounded-lg shadow ${
              mode === 'draw'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Draw
          </button>
          <button
            onClick={() => handleModeChange('erase')}
            className={`px-6 py-2 rounded-lg shadow ${
              mode === 'erase'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Erase
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolbarKids;
