'use client';
import React from 'react';
import HistoryFilters from '@/components/history/HistoryFilters';
import HistoryTable from '@/components/history/HistoryTable';
import Pagination from '@/components/ui/Pagination';
import { useHistory } from '@/hooks/useHistory';
import { XCircle } from 'lucide-react';

export default function HistoryPage() {
    const {
        filteredHistory,
        isLoading,
        searchTerm,
        setSearchTerm,
        filterCount,
        setFilterCount,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        currentPage,
        setCurrentPage,
        totalPages
    } = useHistory();

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center p-10 min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-400 mb-4"></div>
                <p className="text-xl text-sky-300">Đang tải lịch sử phát hiện...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 sm:p-8 bg-slate-800/70 rounded-xl shadow-2xl border border-slate-700/50">
            <h2 className="text-3xl font-semibold text-sky-300 mb-2">Lịch sử Phát Hiện</h2>

            <HistoryFilters
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                filterCount={filterCount}
                onFilterCountChange={setFilterCount}
                startDate={startDate}
                onStartDateChange={setStartDate}
                endDate={endDate}
                onEndDateChange={setEndDate}
            />

            {filteredHistory.length === 0 && !isLoading ? (
                <div className="text-center py-12">
                    <XCircle className="mx-auto h-16 w-16 text-slate-500 mb-4" />
                    <p className="text-xl text-slate-400">Không tìm thấy bản ghi nào.</p>
                </div>
            ) : (
                <HistoryTable items={filteredHistory} />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}