import { useState } from 'react';
import { uploadAndDetectImage } from '@/lib/api';
import { DetectionResult } from '@/types/detection';

export function useDetection(imageSrc: string, imageFile: File, originalFileName: string, showModal: (title: string, message: string, type: 'success' | 'error') => void) {
    const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const detectPeopleAndDraw = async (imageFile: File) => {
        return uploadAndDetectImage(imageFile);
    };

    const handleDetectAndSave = async () => {
        if (!imageSrc) {
            showModal("Chưa có ảnh", "Vui lòng tải lên một hình ảnh trước khi phát hiện.", "error");
            return;
        }

        setIsLoading(true);
        try {
            const result = await detectPeopleAndDraw(imageFile);
            if (!result) {
                showModal("Phát hiện thất bại", "Không thể phát hiện người trong ảnh.", "error");
                return;
            }

            setDetectionResult(result);

            showModal("Thành công!", `Đã phát hiện ${result.people_count} người và lưu kết quả.`, "success");
        } catch (error) {
            console.error("Lỗi khi phát hiện:", error);
            showModal("Lỗi Xử Lý", `Đã xảy ra lỗi: ${error}`, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        detectionResult,
        isLoading,
        handleDetectAndSave
    };
}