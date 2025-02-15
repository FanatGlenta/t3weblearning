"use client";

import { useState } from "react";
import { uploadImage, updateNews } from "~/services/getNews";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

interface EditNewsFormProps {
  newsItem: {
    id: string;
    title: string;
    description: string;
    previewImageUrl: string;
    images: string[];
  };
  onClose: () => void;
  onNewsUpdated: (updatedNews: any) => void;
}

export default function EditNewsForm({
  newsItem,
  onClose,
  onNewsUpdated,
}: EditNewsFormProps) {
  const [title, setTitle] = useState(newsItem.title);
  const [description, setDescription] = useState(newsItem.description);
  const [previewImage, setPreviewImage] = useState(
    newsItem.previewImageUrl || "",
  );
  const [images, setImages] = useState<string[]>(newsItem.images || []);
  const [newPreviewImageFile, setNewPreviewImageFile] = useState<File | null>(
    null,
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Функция загрузки изображения
  const handleImageUpload = async (file: File) => {
    const uploadedImageUrl = await uploadImage(file);
    return uploadedImageUrl;
  };

  // Функция удаления превью
  const handleRemovePreviewImage = () => {
    setPreviewImage(""); // Убираем превью
    setNewPreviewImageFile(null);
  };

  // Функция удаления существующего изображения
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Функция удаления нового изображения перед загрузкой
  const handleRemoveNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    let updatedPreviewImageUrl = previewImage;
    if (newPreviewImageFile) {
      const uploadedPreview = await handleImageUpload(newPreviewImageFile);
      if (uploadedPreview) {
        updatedPreviewImageUrl = uploadedPreview;
      }
    }

    // Загружаем новые изображения и фильтруем null значения
    const uploadedNewImages = await Promise.all(
      newImages.map((file) => handleImageUpload(file)),
    );
    const validNewImages = uploadedNewImages.filter(
      (img): img is string => img !== null,
    );

    const updatedImages = [...images, ...validNewImages];

    // Отправляем обновленные данные
    const updatedNews = await updateNews(newsItem.id, {
      title,
      description,
      previewImageUrl: updatedPreviewImageUrl,
      images: updatedImages,
    });

    if (updatedNews) {
      onNewsUpdated(updatedNews);
      onClose();
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <label>Название</label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Описание</label>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Превью изображение */}
      <label>Превью изображение</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewPreviewImageFile(e.target.files?.[0] || null)}
      />
      {previewImage && (
        <div className="relative mt-2 w-fit">
          <img
            src={previewImage}
            alt="Preview"
            className="h-32 w-32 rounded-md shadow-md"
          />
          <button
            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            onClick={handleRemovePreviewImage}
          >
            ✕
          </button>
        </div>
      )}

      {/* Существующие изображения */}
      <label>Изображения новости</label>
      <div className="flex flex-wrap gap-2">
        {images.map((img, index) => (
          <div key={index} className="relative w-fit">
            <img
              src={img}
              alt={`Image ${index}`}
              className="h-24 w-24 rounded-md shadow-md"
            />
            <button
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              onClick={() => handleRemoveImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Новые загруженные изображения (до сохранения) */}
      <label>Добавить новые изображения</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setNewImages(Array.from(e.target.files || []))}
      />

      <div className="flex flex-wrap gap-2">
        {newImages.map((file, index) => (
          <div key={index} className="relative w-fit">
            <img
              src={URL.createObjectURL(file)}
              alt={`New Image ${index}`}
              className="h-24 w-24 rounded-md shadow-md"
            />
            <button
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              onClick={() => handleRemoveNewImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Сохранение..." : "Сохранить изменения"}
      </Button>
    </div>
  );
}
