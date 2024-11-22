import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import AlphabetSelector from './AlphabetSelector';
import ToolbarKids from './ToolbarKids';

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
        if (fabricRef.current) {
            fabricRef.current.clear();
            setFeedbackMessage(null);

            // Re-add the letter reference after clearing
            handleSelectLetter(selectedLetter);
        }
    };

    const handleCheckDrawing = () => {
        if (fabricRef.current) {
            const objects = fabricRef.current.getObjects();

            if (objects.length === 0) {
                // No drawing detected
                setFeedbackMessage('Please draw something on the canvas before checking.');
                return;
            }

            const isCorrect = Math.random() > 0.5;
            setFeedbackMessage(isCorrect ? 'Success! You drew the letter correctly.' : 'Incorrect! Try again.');
            onResult(isCorrect);
        }
    };


    const handleSelectLetter = (letter: string) => {
        setSelectedLetter(letter);

        if (fabricRef.current) {
            const canvas = fabricRef.current;

            // Remove existing letter reference
            const existingLetter = canvas.getObjects('text').find((obj) => obj.type === 'text');
            if (existingLetter) {
                canvas.remove(existingLetter);
            }

            // Add the new letter reference
            const letterText = new fabric.Text(letter, {
                fontSize: 150,
                fill: '#cccccc',
                selectable: false,
                opacity: 0.5,
            });

            // Add the letter to the canvas
            canvas.add(letterText);

            // Scale and center the letter
            const canvasWidth = canvas.getWidth();
            const canvasHeight = canvas.getHeight();

            // Scale the letter to fit the canvas
            const maxWidth = canvasWidth * 0.8; // Leave some padding
            const maxHeight = canvasHeight * 0.8;
            const scale = Math.min(maxWidth / letterText.width!, maxHeight / letterText.height!);

            letterText.scale(scale);

            // Center the letter
            letterText.set({
                left: canvasWidth / 2,
                top: canvasHeight / 2,
                originX: 'center',
                originY: 'center',
            });

            // Render the canvas
            canvas.renderAll();
        }
    };


    return (
        <div className="flex flex-col items-center space-y-6">
            {/* Toolbar */}
            <ToolbarKids
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
                onBrushTypeChange={(type) => {
                    if (fabricRef.current) {
                        const canvas = fabricRef.current;

                        if (type === 'PencilBrush') {
                            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                        } else if (type === 'CircleBrush') {
                            canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
                        } else if (type === 'SprayBrush') {
                            canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
                        }
                    }
                }}
                onModeChange={(mode) => {
                    if (fabricRef.current) {
                        fabricRef.current.isDrawingMode = mode === 'draw';
                    }
                }}
            />

            {/* Alphabet Selector */}
            <AlphabetSelector selectedLetter={selectedLetter} onSelectLetter={handleSelectLetter} />

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border-2 border-gray-300 shadow-lg"
            ></canvas>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={handleCheckDrawing}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                >
                    Check Drawing
                </button>
                <button
                    onClick={handleClearCanvas}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
                >
                    Clear Canvas
                </button>
            </div>

            {/* Feedback Message */}
            {feedbackMessage && (
                <div
                    className={`p-4 rounded-lg shadow ${feedbackMessage.includes('Success')
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
