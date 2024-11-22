import React, { useState } from 'react';

interface ToolbarProps {
  onBrushSizeChange: (size: number) => void;
  onBrushColorChange: (color: string) => void;
  onBrushTypeChange: (type: string) => void;
  onModeChange: (mode: 'draw' | 'erase') => void;
  onSave: () => void; // Save handler
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
    <div className="flex flex-wrap items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 shadow-lg rounded">
      {/* Brush Size Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="brushSize" className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Brush Size:
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
          className="w-32"
        />
      </div>

      {/* Brush Color Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="brushColor" className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Brush Color:
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
        />
      </div>

      {/* Brush Type Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="brushType" className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Brush Type:
        </label>
        <select
          id="brushType"
          value={brushType}
          onChange={(e) => {
            const type = e.target.value;
            setBrushType(type);
            onBrushTypeChange(type);
          }}
          className="border dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          <option value="PencilBrush">Pencil</option>
          <option value="CircleBrush">Circle</option>
          <option value="SprayBrush">Spray</option>
        </select>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onModeChange('draw')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Draw
        </button>
        <button
          onClick={() => onModeChange('erase')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
        >
          Erase
        </button>
      </div>

      {/* Save Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
