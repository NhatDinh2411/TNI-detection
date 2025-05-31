import { Eye } from 'lucide-react';
import { DetectionControlsProps } from '@/types/detection';


export default function DetectionControls({ onDetectAndSave, isLoading, imageAvailable }: DetectionControlsProps) {
    return (
        <button
            onClick={onDetectAndSave}
            disabled={isLoading || !imageAvailable}
            className="mt-8 w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center mx-auto text-lg"
        >
            {isLoading ? (
                <>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                    Đang xử lý...
                </>
            ) : (
                <>
                    <Eye className="mr-2.5 h-6 w-6" /> Phát Hiện & Lưu Kết Quả
                </>
            )}
        </button>
    )
};