import React from 'react';
import { Eye } from 'lucide-react';
import { PageSpinnerProps } from '@/types/type';


export default function PageSpinner({ message = "Đang tải..." }: PageSpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
            <div className="relative flex justify-center items-center">
                <div className="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-sky-500"></div>
                <Eye className="h-12 w-12 text-sky-400" />
            </div>
            <p className="mt-6 text-sky-300 text-xl tracking-wider">{message}</p>
        </div>
    );
}