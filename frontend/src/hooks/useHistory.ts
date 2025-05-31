import { useState, useEffect, useCallback } from 'react';
import { getHistory } from '@/lib/api';
import { DetectionResult } from '@/types/detection';

export function useHistory() {
    const [filteredHistory, setFilteredHistory] = useState<DetectionResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCount, setFilterCount] = useState<number | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const fetchHistory = useCallback(async () => {
        try {
            const response = await getHistory({
                page: currentPage,
                size: itemsPerPage,
                search: searchTerm || undefined,
                min_people: filterCount || undefined,
                max_people: filterCount === 6 ? undefined : filterCount || undefined,
                start_date: startDate || undefined,
                end_date: endDate || undefined
            });
            setFilteredHistory(response.items);
            setTotalPages(response.pages);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, searchTerm, filterCount, startDate, endDate, itemsPerPage]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return {
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
    };
}
