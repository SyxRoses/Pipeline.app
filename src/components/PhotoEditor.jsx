import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric'; // v6 import style
import { X, Check, Undo, Type, Square, Circle as CircleIcon, PenTool, MousePointer2 } from 'lucide-react';

const PhotoEditor = ({ imageFile, onSave, onCancel, initialAnnotations = [] }) => {
    const canvasEl = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [activeTool, setActiveTool] = useState('select'); // select, draw, text, rect, circle
    const [color, setColor] = useState('#ea580c'); // Orange default
    const [brushSize, setBrushSize] = useState(5);

    // Initialize Canvas
    useEffect(() => {
        if (!canvasEl.current || !imageFile) return;

        // Create fabric canvas
        const newCanvas = new fabric.Canvas(canvasEl.current, {
            isDrawingMode: false,
            selection: true,
        });

        // Load Image
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = (e) => {
            const imgObj = new Image();
            imgObj.src = e.target.result;
            imgObj.onload = () => {
                const fImg = new fabric.Image(imgObj);

                // Scale image to fit within max dimensions (e.g., 800x600 or window size)
                const maxWidth = window.innerWidth * 0.9;
                const maxHeight = window.innerHeight * 0.8;
                const scale = Math.min(maxWidth / fImg.width, maxHeight / fImg.height);

                fImg.scale(scale);

                newCanvas.setWidth(fImg.width * scale);
                newCanvas.setHeight(fImg.height * scale);
                newCanvas.backgroundImage = fImg;
                newCanvas.renderAll();

                // Render Initial Annotations (AI Detections)
                if (initialAnnotations && initialAnnotations.length > 0) {
                    initialAnnotations.forEach(ann => {
                        if (ann.type === 'rect') {
                            const rect = new fabric.Rect({
                                left: ann.left,
                                top: ann.top,
                                width: ann.width,
                                height: ann.height,
                                fill: 'transparent',
                                stroke: ann.color || 'red',
                                strokeWidth: 4
                            });
                            newCanvas.add(rect);

                            // Add Label
                            if (ann.label) {
                                const text = new fabric.IText(ann.label, {
                                    left: ann.left,
                                    top: ann.top - 25,
                                    fontSize: 16,
                                    fill: ann.color || 'red',
                                    fontFamily: 'Inter',
                                    backgroundColor: 'rgba(0,0,0,0.7)'
                                });
                                newCanvas.add(text);
                            }
                        }
                    });
                    newCanvas.renderAll();
                }
            };
        };

        setCanvas(newCanvas);

        return () => {
            newCanvas.dispose();
        };
    }, [imageFile]);

    // Handle Tool Changes
    useEffect(() => {
        if (!canvas) return;

        canvas.isDrawingMode = activeTool === 'draw';

        if (activeTool === 'draw') {
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            canvas.freeDrawingBrush.color = color;
            canvas.freeDrawingBrush.width = brushSize;
        }

        canvas.selection = activeTool === 'select';
        canvas.defaultCursor = activeTool === 'select' ? 'default' : 'crosshair';

        // Deselect objects when switching tools
        if (activeTool !== 'select') {
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }

    }, [activeTool, color, brushSize, canvas]);

    // Helper to add shapes/text
    const addText = () => {
        if (!canvas) return;
        const text = new fabric.IText('Tap to Edit', {
            left: canvas.width / 2 - 50,
            top: canvas.height / 2,
            fontFamily: 'Inter',
            fill: color,
            fontSize: 24
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        setActiveTool('select');
    };

    const addRect = () => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            left: canvas.width / 2 - 50,
            top: canvas.height / 2 - 50,
            fill: 'transparent',
            stroke: color,
            strokeWidth: 4,
            width: 100,
            height: 100
        });
        canvas.add(rect);
        canvas.setActiveObject(rect);
        setActiveTool('select');
    };

    const addCircle = () => {
        if (!canvas) return;
        const circle = new fabric.Circle({
            left: canvas.width / 2 - 50,
            top: canvas.height / 2 - 50,
            fill: 'transparent',
            stroke: color,
            strokeWidth: 4,
            radius: 50
        });
        canvas.add(circle);
        canvas.setActiveObject(circle);
        setActiveTool('select');
    };

    const handleSave = () => {
        if (!canvas) return;
        // Export to data URL
        const dataUrl = canvas.toDataURL({
            format: 'png',
            quality: 0.8
        });
        onSave(dataUrl);
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col animate-fade-in">
            {/* Toolbar */}
            <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-900">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                    <div className="h-6 w-px bg-zinc-700 mx-2"></div>

                    {/* Tools */}
                    <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                        <ToolButton icon={MousePointer2} active={activeTool === 'select'} onClick={() => setActiveTool('select')} />
                        <ToolButton icon={PenTool} active={activeTool === 'draw'} onClick={() => setActiveTool('draw')} />
                        <ToolButton icon={Type} active={activeTool === 'text'} onClick={addText} />
                        <ToolButton icon={Square} active={activeTool === 'rect'} onClick={addRect} />
                        <ToolButton icon={CircleIcon} active={activeTool === 'circle'} onClick={addCircle} />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <ColorSwatch color="#ea580c" active={color === '#ea580c'} onClick={() => setColor('#ea580c')} />
                        <ColorSwatch color="#10b981" active={color === '#10b981'} onClick={() => setColor('#10b981')} />
                        <ColorSwatch color="#f43f5e" active={color === '#f43f5e'} onClick={() => setColor('#f43f5e')} />
                        <ColorSwatch color="#ffffff" active={color === '#ffffff'} onClick={() => setColor('#ffffff')} />
                    </div>
                    <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium transition-colors">
                        <Check size={18} /> Save & Close
                    </button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-8">
                <canvas ref={canvasEl} className="border border-zinc-800 shadow-2xl" />
            </div>
        </div>
    );
};

const ToolButton = ({ icon: Icon, active, onClick }) => (
    <button
        onClick={onClick}
        className={`p - 2 rounded - md transition - all ${active ? 'bg-zinc-800 text-orange-500 shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'} `}
    >
        <Icon size={20} />
    </button>
);

const ColorSwatch = ({ color, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w - 6 h - 6 rounded - full border - 2 transition - transform ${active ? 'scale-110 border-white' : 'border-transparent hover:scale-105'} `}
        style={{ backgroundColor: color }}
    />
);

export default PhotoEditor;
