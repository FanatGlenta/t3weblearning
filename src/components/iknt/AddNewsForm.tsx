import { useState, FormEvent, useRef } from "react";
import { addNews, uploadImage } from "~/services/getNews";

interface AddNewsFormProps {
  onNewsAdded: (news: {
    id: string;
    title: string;
    description: string;
    previewImageUrl: string;
    images: string[];
  }) => void;
  onClose: () => void; // Новый пропс для закрытия формы
}

export default function AddNewsForm({
  onNewsAdded,
  onClose,
}: AddNewsFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [isDraggingPreview, setIsDraggingPreview] = useState(false);
  const [isDraggingImages, setIsDraggingImages] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const previewInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const handlePreviewChange = (file: File | null) => {
    if (file) {
      setPreviewImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (files: FileList | null) => {
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let uploadedPreviewUrl = previewImageUrl;
      let uploadedImagesUrls: string[] = [];

      if (previewImage) {
        const uploadedUrl = await uploadImage(previewImage);
        if (uploadedUrl) uploadedPreviewUrl = uploadedUrl;
      }

      for (const image of images) {
        const uploadedUrl = await uploadImage(image);
        if (uploadedUrl) uploadedImagesUrls.push(uploadedUrl);
      }

      const data = await addNews({
        title,
        description,
        previewImageUrl: uploadedPreviewUrl,
        images: uploadedImagesUrls,
      });

      if (data) {
        onNewsAdded(data.news);
        setTitle("");
        setDescription("");
        setPreviewImage(null);
        setPreviewImageUrl("");
        setImages([]);
        onClose(); // Закрываем форму после успешного добавления
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="rounded border p-2"
      />

      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="rounded border p-2"
      />

      {/* Drag-and-Drop превью изображения */}
      <div
        className={`flex h-32 cursor-pointer items-center justify-center border-2 border-dashed p-2 transition ${
          isDraggingPreview ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingPreview(true);
        }}
        onDragLeave={() => setIsDraggingPreview(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingPreview(false);
          const file = e.dataTransfer.files[0];
          if (file) handlePreviewChange(file);
        }}
        onClick={() => previewInputRef.current?.click()}
      >
        {previewImage ? (
          <div className="text-center">
            <p className="text-sm text-gray-700">Выбрано превью:</p>
            <p className="text-sm font-medium">{previewImage.name}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Перетащите изображение или кликните для выбора (превью)
          </p>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={previewInputRef}
        onChange={(e) => handlePreviewChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      {/* Drag-and-Drop для дополнительных изображений */}
      <div
        className={`flex h-32 cursor-pointer flex-col items-center justify-center border-2 border-dashed p-2 transition ${
          isDraggingImages ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingImages(true);
        }}
        onDragLeave={() => setIsDraggingImages(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingImages(false);
          handleImagesChange(e.dataTransfer.files);
        }}
        onClick={() => imagesInputRef.current?.click()}
      >
        {images.length > 0 ? (
          <p className="text-sm text-gray-700">
            Выбраны изображения ({images.length})
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            Перетащите файлы или кликните для выбора (доп. изображения)
          </p>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={imagesInputRef}
        multiple
        onChange={(e) => handleImagesChange(e.target.files)}
        className="hidden"
      />

      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
        disabled={isUploading}
      >
        {isUploading ? "Загрузка..." : "Добавить новость"}
      </button>
    </form>
  );
}
