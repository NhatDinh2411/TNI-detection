import { HistoryTableProps } from '@/types/history';
import HistoryTableItem from './HistoryTableItem';


export default function HistoryTable({ items }: HistoryTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-slate-800/50 border-b border-slate-700">
                        <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Tên ảnh
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Ảnh đã xử lý
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Số người
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Thời gian
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                    {items.map((item) => (
                        <HistoryTableItem key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}