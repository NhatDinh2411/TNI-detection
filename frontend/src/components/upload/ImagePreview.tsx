import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { ImagePreviewProps } from '@/types/type';

export default function ImagePreview({ src, alt }: ImagePreviewProps) {

    return (
        <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-sky-300 mb-3">Xem trước ảnh gốc:</h3>
            <div className="relative group inline-block rounded-lg overflow-hidden shadow-xl border-2 border-slate-700 hover:border-sky-500 transition-all duration-300">
                <Image src={src} alt={alt} className="max-w-full md:max-w-lg mx-auto rounded-md" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <ExternalLink className="h-10 w-10 text-white/80 transform scale-150 group-hover:scale-100 transition-transform duration-300" />
                </div>
            </div>
        </div>
    )
}

