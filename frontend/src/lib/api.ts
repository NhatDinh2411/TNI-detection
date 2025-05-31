import axios, { AxiosError } from 'axios';
import { DetectionResult } from '@/types/detection';
import { HistoryResponse } from '@/types/history';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


export async function uploadAndDetectImage(file: File): Promise<DetectionResult> {
    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
        const response = await api.post("/detections/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail ||
                error.message ||
                "Lỗi không xác định"
            );
        }
        throw error;
    }
}


export async function getHistory(params?: {
    page?: number;
    size?: number;
    search?: string;
    min_people?: number;
    max_people?: number;
    start_date?: string;
    end_date?: string;
}): Promise<HistoryResponse> {
    try {
        const response = await api.get("/detections/history", { params });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail ||
                error.message ||
                "Lỗi không xác định"
            );
        }
        throw error;
    }
}


