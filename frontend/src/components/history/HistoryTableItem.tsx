import { ImageIcon, Users, Clock } from "lucide-react";
import { HistoryTableItemProps } from '@/types/history';
import Image from "next/image";



export default function HistoryTableItem({ item }: HistoryTableItemProps) {

    return (
        <>
            <tr className="hover:bg-slate-700/70 transition-colors duration-200 group">
                <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <ImageIcon className="h-5 w-5 text-slate-400 group-hover:text-sky-400 mr-2.5 transition-colors" />
                        <span className="text-sm text-slate-300 group-hover:text-slate-100 truncate max-w-xs" title={item.visualized_image_path}>
                            {item.visualized_image_path || 'Không có tên'}
                        </span>
                    </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                    <div className="inline-block rounded-md overflow-hidden border-2 border-slate-600 group-hover:border-sky-500 transition-all duration-200 transform group-hover:scale-105">
                        <Image
                            src={item.visualized_image_base64}
                            alt="Ảnh đã xử lý"
                            className="h-16 w-28 object-cover"
                            loading="lazy"
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.parentElement?.appendChild(document.createElement('div'));
                                if (placeholder) {
                                    placeholder.className = "h-16 w-28 bg-slate-700 flex items-center justify-center text-xs text-slate-500";
                                    placeholder.innerText = "Lỗi ảnh";
                                }
                            }}
                        />
                    </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <Users className="h-5 w-5 text-yellow-400 mr-1.5" />
                        <span className="text-sm font-semibold text-yellow-300 group-hover:text-yellow-200">{item.people_count}</span>
                    </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 text-slate-400 group-hover:text-sky-400 mr-1.5 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-slate-200">
                            {new Date(item.timestamp).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                    </div>
                </td>
            </tr>
        </>
    );
}