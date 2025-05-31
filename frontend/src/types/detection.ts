export interface DetectionResult {
    id: number;
    people_count: number;
    timestamp: Date;
    visualized_image_path: string;
    visualized_image_url: string;
    visualized_image_base64: Base64URLString;
}

export interface DetectionControlsProps {
    onDetectAndSave: () => void;
    isLoading: boolean;
    imageAvailable: boolean;
}

