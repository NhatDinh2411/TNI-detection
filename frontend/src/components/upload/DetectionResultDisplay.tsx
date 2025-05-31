import { CheckCircle, Users, ExternalLink } from "lucide-react"
import { DetectionResult } from "@/types/detection"
import Image from "next/image";

interface DetectionResultDisplayProps {
    result: DetectionResult;
}

export default function DetectionResultDisplay({ result }: DetectionResultDisplayProps) {
    return (
        <div className="mt-10 p-6 bg-slate-700/50 rounded-xl shadow-inner border border-slate-600">
            <h3 className="text-2xl font-semibold text-sky-300 mb-4 flex items-center">
                <CheckCircle className="h-7 w-7 text-green-400 mr-2" /> Kết quả phát hiện:
            </h3>
            <p className="text-lg text-slate-200 mb-4 flex items-center">
                <Users className="inline-block mr-2.5 mb-0.5 h-6 w-6 text-yellow-400" /> Số người phát hiện: <span className="font-bold text-yellow-300 text-xl ml-2">{result.people_count}</span>
            </p>
            <h4 className="text-lg font-medium text-sky-300 mb-2">Ảnh đã xử lý:</h4>
            <div className="relative group rounded-lg overflow-hidden shadow-xl border-2 border-sky-600 hover:border-sky-400 transition-all duration-300">
                <Image src={result.visualized_image_base64} alt="Ảnh đã xử lý" className="max-w-full md:max-w-lg mx-auto rounded-md" />
                <a href={result.visualized_image_path} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer">
                    <ExternalLink className="h-10 w-10 text-white/80 transform scale-150 group-hover:scale-100 transition-transform duration-300" />
                </a>
            </div>
        </div>
    )
}