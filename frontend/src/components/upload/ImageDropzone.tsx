import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { ImageDropzoneProps } from "@/types/type";


export default function ImageDropzone({ onImageUpload }: ImageDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const input = document.createElement('input');
            input.type = 'file';
            input.files = files;
            const event = { target: input } as unknown as React.ChangeEvent<HTMLInputElement>;
            onImageUpload(event);
        }
    };

    return (
        <div
            className={`mt-1 flex flex-col items-center justify-center px-6 pt-10 pb-10 border-2 ${isDragging
                ? 'border-sky-400 bg-sky-900/30'
                : 'border-slate-600 hover:border-sky-500'
                } border-dashed rounded-xl transition-all duration-300 ease-in-out`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <UploadCloud className={`mx-auto h-16 w-16 mb-4 ${isDragging
                ? 'text-sky-300 animate-bounce'
                : 'text-slate-500 group-hover:text-sky-400'
                }`} />
            <div className="flex text-sm text-slate-400">
                <label
                    htmlFor="imageUploadInput"
                    className="relative cursor-pointer bg-slate-700 hover:bg-slate-600 rounded-md font-medium text-sky-400 hover:text-sky-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-sky-500 px-4 py-2 transition-colors"
                >
                    <span>Tải lên một tệp</span>
                    <input
                        id="imageUploadInput"
                        name="imageUpload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={onImageUpload}
                    />
                </label>
                <p className="pl-2 self-center">hoặc kéo và thả</p>
            </div>
            <p className="text-xs text-slate-500 mt-3">PNG, JPG, GIF, WEBP, AVIF tối đa 5MB</p>
        </div>
    );
}