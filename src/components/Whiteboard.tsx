import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import Toolbar from './Toolbar';

interface WhiteboardProps {
  onSave: (data: string) => void;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushType, setBrushType] = useState('PencilBrush');
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');

  useEffect(() => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
      });

      const canvas = fabricRef.current;
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      }

      canvas.freeDrawingBrush.width = brushSize;
      canvas.freeDrawingBrush.color = brushColor;
    }

    return () => {
      fabricRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricRef.current) {
      const canvas = fabricRef.current;

      if (brushType === 'PencilBrush') {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      } else if (brushType === 'CircleBrush') {
        canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
      } else if (brushType === 'SprayBrush') {
        canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
      }

      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushSize;
      }
    }
  }, [brushSize, brushColor, brushType]);

  useEffect(() => {
    if (fabricRef.current) {
      const canvas = fabricRef.current;

      if (mode === 'draw') {
        canvas.isDrawingMode = true;
      } else if (mode === 'erase') {
        canvas.isDrawingMode = false;

        canvas.on('mouse:down', (opt) => {
          const pointer = canvas.getPointer(opt.e);
          const objects = canvas.getObjects().filter((object) => object.containsPoint(pointer));

          objects.forEach((object) => canvas.remove(object));
        });
      }
    }
  }, [mode]);

  const handleSave = () => {
    if (fabricRef.current) {
      // Get the whiteboard image as base64
      const base64Image = fabricRef.current.toDataURL({
        format: 'png', // Set image format to PNG
        quality: 1, // Optional: Adjust quality if needed
        multiplier: 2, // Adjust resolution
      });

      // Send the base64 image to the parent component
      onSave(base64Image);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Toolbar for controls */}
      <Toolbar
        onBrushSizeChange={setBrushSize}
        onBrushColorChange={setBrushColor}
        onBrushTypeChange={setBrushType}
        onModeChange={setMode}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-gray-300 shadow-lg"
      ></canvas>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
      >
        Save
      </button>
    </div>
  );
};

export default Whiteboard;
