'use client';
import React, { useState } from 'react';
import ImageDropzone from '@/components/upload/ImageDropzone';
import ImagePreview from '@/components/upload/ImagePreview';
import DetectionControls from '@/components/upload/DetectionControls';
import DetectionResultDisplay from '@/components/upload/DetectionResultDisplay';
import { useDetection } from '@/hooks/useDetection';
import CustomModal from '@/components/ui/CustomModal';

export default function UploadPage() {
  const [imageSrc, setImageSrc] = useState('');
  const [originalFileName, setOriginalFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as 'info' | 'error' | 'success'
  });

  const showModal = (title: string, message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setModalState({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };
  const {
    detectionResult,
    isLoading,
    handleDetectAndSave
  } = useDetection(imageSrc, selectedFile || new File([], ''), originalFileName, showModal);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showModal("Kích thước quá lớn", "Kích thước tệp quá lớn. Vui lòng chọn tệp nhỏ hơn 5MB.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImageSrc(e.target.result as string);
          setOriginalFileName(file.name);
        }
      };
      setSelectedFile(file);
      reader.readAsDataURL(file);
    }
  };
  console.log("API_URL =", process.env.NEXT_PUBLIC_API_URL);
  return (
    <div className="space-y-8 p-6 sm:p-8 bg-slate-800/70 rounded-xl shadow-2xl border border-slate-700/50">
      <div>
        <label className="block text-xl font-semibold text-sky-300 mb-3">
          Chọn hình ảnh để phân tích:
        </label>
        <ImageDropzone onImageUpload={handleImageUpload} />
        {originalFileName && (
          <p className="text-sm text-slate-400 mt-3 italic">
            Tệp đã chọn: {originalFileName}
          </p>
        )}
      </div>

      {imageSrc && (
        <>
          <ImagePreview src={imageSrc} alt="Ảnh tải lên" />
          <div className="text-center">
            <DetectionControls
              onDetectAndSave={handleDetectAndSave}
              isLoading={isLoading}
              imageAvailable={!!imageSrc}
            />
          </div>
        </>
      )}
      <CustomModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        type={modalState.type}
      >
        <p>{modalState.message}</p>
      </CustomModal>
      {detectionResult && <DetectionResultDisplay result={detectionResult} />}

    </div>
  );
}