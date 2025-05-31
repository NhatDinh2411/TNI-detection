import { Search, Filter, Calendar } from "lucide-react";
import { HistoryFiltersProps } from "@/types/history";


export default function HistoryFilters({
    searchTerm,
    onSearchTermChange,
    filterCount,
    onFilterCountChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange
}: HistoryFiltersProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex-1">
                <div className="flex items-center mb-1.5">
                    <Search className="h-4 w-4 text-sky-400 mr-1.5" />
                    <label className="text-sm text-slate-300">Tìm kiếm</label>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                    placeholder="Tìm kiếm theo tên file..."
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-slate-200 placeholder-slate-400"
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1.5">
                    <Filter className="h-4 w-4 text-sky-400 mr-1.5" />
                    <label className="text-sm text-slate-300">Số người</label>
                </div>
                <select
                    value={filterCount?.toString() || ''}
                    onChange={(e) => onFilterCountChange(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-slate-200"
                >
                    <option value="">Tất cả</option>
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người</option>
                    <option value="5">5 người</option>
                    <option value="6">6+ người</option>
                </select>
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1.5">
                    <Calendar className="h-4 w-4 text-sky-400 mr-1.5" />
                    <label className="text-sm text-slate-300">Từ ngày</label>
                </div>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-slate-200"
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1.5">
                    <Calendar className="h-4 w-4 text-sky-400 mr-1.5" />
                    <label className="text-sm text-slate-300">Đến ngày</label>
                </div>
                <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-slate-200"
                />
            </div>
        </div>
    );
}