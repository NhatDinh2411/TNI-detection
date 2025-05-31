export interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    type?: 'info' | 'error' | 'success';
}

export interface PageSpinnerProps {
    message?: string;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface ImagePreviewProps {
    src: string;
    alt: string;
}

export interface ImageDropzoneProps {
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}