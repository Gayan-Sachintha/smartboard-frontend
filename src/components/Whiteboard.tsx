import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

interface WhiteboardProps {
  onSave: (data: string) => void; 
}

const Whiteboard: React.FC<WhiteboardProps> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');

  useEffect(() => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
      });

      const canvas = fabricRef.current;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.width = 5;
      canvas.freeDrawingBrush.color = 'black';
    }

    return () => {
      fabricRef.current?.dispose();
    };
  }, []);

  const handleModeChange = (newMode: 'draw' | 'erase') => {
    setMode(newMode);

    if (fabricRef.current) {
      if (newMode === 'draw') {
        fabricRef.current.isDrawingMode = true;
        fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
        fabricRef.current.freeDrawingBrush.color = 'black';
        fabricRef.current.freeDrawingBrush.width = 5;
      } else if (newMode === 'erase') {
        fabricRef.current.isDrawingMode = false;
        fabricRef.current.on('mouse:down', (opt) => {
          const canvas = fabricRef.current;
          const pointer = canvas?.getPointer(opt.e);
          const objects = canvas?.getObjects().filter((object) => object.containsPoint(pointer!));

          objects?.forEach((object) => canvas?.remove(object));
        });
      }
    }
  };

  const handleSave = () => {
    if (fabricRef.current) {
      const jsonData = fabricRef.current.toJSON();
      onSave(JSON.stringify(jsonData));
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => handleModeChange('draw')}
          className={`px-4 py-2 rounded ${
            mode === 'draw' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Draw
        </button>
        <button
          onClick={() => handleModeChange('erase')}
          className={`px-4 py-2 rounded ${
            mode === 'erase' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Erase
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded bg-green-500 text-white"
        >
          Save
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-gray-300 shadow-lg"
      ></canvas>
    </div>
  );
};

export default Whiteboard;
