import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Edit2, Trash2, Maximize2, Sparkles, Loader2 } from 'lucide-react';
import PhotoEditor from './PhotoEditor';
import { analyzeWeldImage } from '../services/mockAIService';

const PhotoUploadWithMarkup = ({ label, onImageChange }) => {
    const [image, setImage] = useState(null); // The finalized (possibly annotated) image blob/url
    const [originalImage, setOriginalImage] = useState(null); // Keep original in case they want to reset? For MVP, reusing image logic
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiAnnotations, setAiAnnotations] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        if (file) {
            setOriginalImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setImage(file); // Default to original
            setAiAnnotations([]); // Reset previous analysis
            if (onImageChange) onImageChange(file);
        }
    }, [onImageChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    const handleSaveAnnotation = (dataUrl) => {
        setPreviewUrl(dataUrl);
        // Convert dataUrl back to Blob if needed for upload, or keep as string
        // For MVP, we'll keep the view url updated
        setIsEditorOpen(false);

        // Update parent with new base64 string or blob
        // fetch(dataUrl).then(res => res.blob()).then(blob => onImageChange(blob));
    };

    const handleAnalyze = async () => {
        if (!originalImage) return;
        setIsAnalyzing(true);
        try {
            const result = await analyzeWeldImage(originalImage);
            if (result.success) {
                setAiAnnotations(result.detections);
                setIsEditorOpen(true); // Open editor immediately with detections
            }
        } catch (error) {
            console.error("AI Analysis failed", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const clearImage = (e) => {
        e.stopPropagation();
        setImage(null);
        setOriginalImage(null);
        setPreviewUrl(null);
        setAiAnnotations([]);
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>

            {!previewUrl ? (
                <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragActive ? 'border-cyan-500 bg-cyan-500/5' : 'border-zinc-700 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-zinc-500'}`}>
                    <input {...getInputProps()} />
                    <Camera className="text-zinc-500 mb-2" size={32} />
                    <p className="text-sm font-medium text-zinc-400">Tap to Capture or Upload</p>
                    <p className="text-xs text-zinc-600 mt-1">Supports JPG, PNG</p>
                </div>
            ) : (
                <div className="relative group rounded-lg overflow-hidden border border-zinc-700 bg-black">
                    <img src={previewUrl} alt="Upload preview" className="w-full h-48 object-contain" />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        {/* Analysis Button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-transform hover:scale-110 shadow-lg flex items-center justify-center"
                            title="AI Analyze"
                        >
                            {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                        </button>

                        <button
                            onClick={() => setIsEditorOpen(true)}
                            className="p-3 bg-cyan-600 rounded-full text-white hover:bg-cyan-500 transition-transform hover:scale-110 shadow-lg"
                            title="Annotate"
                        >
                            <Edit2 size={20} />
                        </button>
                        <button
                            onClick={clearImage}
                            className="p-3 bg-zinc-800 rounded-full text-rose-500 hover:bg-zinc-700 transition-transform hover:scale-110 shadow-lg"
                            title="Remove"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur rounded text-[10px] text-white font-medium border border-white/10">
                        {aiAnnotations.length > 0 ? 'Analyzed' : 'Ready to Sync'}
                    </div>
                </div>
            )}

            {isEditorOpen && originalImage && (
                <PhotoEditor
                    imageFile={originalImage instanceof Blob ? originalImage : null} // Handle edge case where we might pass a URL string later
                    onSave={handleSaveAnnotation}
                    onCancel={() => setIsEditorOpen(false)}
                    initialAnnotations={aiAnnotations}
                />
            )}
        </div>
    );
};

export default PhotoUploadWithMarkup;
