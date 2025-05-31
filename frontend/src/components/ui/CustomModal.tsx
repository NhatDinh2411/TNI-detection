import React from 'react';
import { AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { CustomModalProps } from '@/types/type';

export default function CustomModal({
    isOpen,
    onClose,
    title,
    children,
    type = 'info'
}: CustomModalProps) {

    let icon;
    let titleColor;

    switch (type) {
        case 'error':
            icon = <AlertTriangle className="h-10 w-10 text-red-400 mr-3" />;
            titleColor = 'text-red-400';
            break;
        case 'success':
            icon = <CheckCircle className="h-10 w-10 text-green-400 mr-3" />;
            titleColor = 'text-green-400';
            break;
        default:
            icon = <Eye className="h-10 w-10 text-sky-400 mr-3" />;
            titleColor = 'text-sky-400';
    }

    return isOpen ? (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm h-full">
            <div className="bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-md border border-slate-700 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modal-pop-in">
                <div className="flex items-center mb-5">
                    {icon}
                    <h3 className={`text-2xl font-semibold ${titleColor}`}>{title}</h3>
                </div>
                <div className="text-slate-300 mb-6">{children}</div>
                <button
                    onClick={onClose}
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    Đã hiểu
                </button>
            </div>
        </div>
    ) : null;
}