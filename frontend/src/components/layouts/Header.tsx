'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Eye, UploadCloud, FileText } from 'lucide-react';


export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const navigation = [
        { key: '/', label: 'Tải Lên', icon: UploadCloud },
        { key: '/history', label: 'Lịch Sử', icon: FileText },
    ];

    return (
        <header className="w-full max-w-6xl mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-b-2 border-sky-700/50">
                <div className="flex items-center mb-3 sm:mb-0">
                    <Eye className="h-10 w-10 text-sky-400 mr-3 animate-pulse-slow" />
                    <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
                        TNI Detection
                    </h1>
                </div>
                <nav className="flex space-x-3">
                    {navigation.map(item => (
                        <button
                            key={item.key}
                            onClick={() => router.push(item.key)}
                            className={`group relative px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center
                        ${pathname === item.key
                                    ? 'bg-sky-600 text-white shadow-xl shadow-sky-600/30'
                                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-sky-300'}`}
                        >
                            <span className={`absolute left-0 top-0 h-full w-0.5 bg-sky-400 transition-all duration-300 group-hover:h-full ${pathname === item.key ? 'h-full' : 'h-0'}`}></span>
                            <item.icon className={`mr-2 h-5 w-5 transition-colors ${pathname === item.key ? 'text-white' : 'text-slate-400 group-hover:text-sky-300'}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
}