import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '@/types/type';


export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) {
            endPage = 3;
        }
        if (currentPage >= totalPages - 2) {
            startPage = totalPages - 2;
        }

        if (startPage > 2) pageNumbers.push('...');
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
    }


    return (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <span className="text-sm text-slate-400 mb-3 sm:mb-0">
                Trang {currentPage} trên {totalPages}
            </span>
            <nav className="flex items-center space-x-1.5">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-md bg-slate-700 hover:bg-sky-700 disabled:bg-slate-600/50 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-200 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                {pageNumbers.map((page, index) =>
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2.5 py-2 text-slate-500">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(Number(page))}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === page ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-700 hover:bg-sky-700 text-slate-200'
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-md bg-slate-700 hover:bg-sky-700 disabled:bg-slate-600/50 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-200 transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </nav>
        </div>
    );
};
