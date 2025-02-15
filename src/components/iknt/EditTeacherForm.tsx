"use client";

import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  updateTeacher,
  uploadTeacherImage,
  Teacher,
} from "~/services/getTeachers";
import { Trash2 } from "lucide-react";

interface EditTeacherFormProps {
  teacher: Teacher;
  onClose: () => void;
  onTeacherUpdated: (updatedTeacher: Teacher) => void;
}

export default function EditTeacherForm({
  teacher,
  onClose,
  onTeacherUpdated,
}: EditTeacherFormProps) {
  const [name, setName] = useState(teacher.name);
  const [position, setPosition] = useState(teacher.position);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(teacher.imageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Показываем превью
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl(""); // Очищаем фото
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageUrl = imageUrl;

      if (!imageUrl) {
        uploadedImageUrl = "";
      }

      if (image) {
        const uploadedUrl = await uploadTeacherImage(image);
        if (uploadedUrl) uploadedImageUrl = uploadedUrl;
      }

      const updatedTeacher = await updateTeacher(teacher.id, {
        name,
        position,
        imageUrl: uploadedImageUrl,
      });

      if (updatedTeacher) {
        onTeacherUpdated(updatedTeacher);
        onClose();
      }
    } catch (error) {
      console.error("Ошибка при обновлении преподавателя:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="position">Должность</Label>
        <Input
          id="position"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>

      {/* Фото с кнопкой удаления */}
      <div
        className={`relative flex h-32 cursor-pointer items-center justify-center border-2 border-dashed p-2 transition ${
          isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleImageChange(file);
        }}
        onClick={() => imageInputRef.current?.click()}
      >
        {imageUrl ? (
          <div className="relative text-center">
            <img src={imageUrl} alt="Превью" className="mt-2 h-24 rounded" />
            {/* Кнопка удаления прямо на фото */}
            <button
              type="button"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-700"
              onClick={(e) => {
                e.stopPropagation(); // Чтобы не срабатывал клик по контейнеру
                handleRemoveImage();
              }}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Перетащите изображение или кликните для выбора (Фото преподавателя)
          </p>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Сохранение..." : "Сохранить изменения"}
      </Button>
    </form>
  );
}
