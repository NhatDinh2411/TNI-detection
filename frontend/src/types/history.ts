import { DetectionResult } from "./detection";
export interface HistoryResponse {
    items: DetectionResult[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface HistoryFiltersProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    filterCount: number | null;
    onFilterCountChange: (value: number | null) => void;
    startDate: string;
    onStartDateChange: (value: string) => void;
    endDate: string;
    onEndDateChange: (value: string) => void;
}


export interface HistoryTableProps {
    items: DetectionResult[];
}

export interface HistoryTableItemProps {
    item: DetectionResult;
}