"use client";

import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { addTeacher, uploadTeacherImage } from "~/services/getTeachers";

interface AddTeacherFormProps {
  onClose: () => void;
  onTeacherAdded: (teacher: Teacher) => void;
}

interface Teacher {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

export default function AddTeacherForm({
  onClose,
  onTeacherAdded,
}: AddTeacherFormProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Превью
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !position || !image) {
      alert("Заполните все поля и выберите фото");
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrl = await uploadTeacherImage(image);
      if (!uploadedImageUrl) {
        alert("Ошибка при загрузке фото");
        setLoading(false);
        return;
      }

      const newTeacher = await addTeacher({
        name,
        position,
        imageUrl: uploadedImageUrl,
      });

      if (newTeacher) {
        onTeacherAdded(newTeacher);
        setName("");
        setPosition("");
        setImage(null);
        setImageUrl("");
        onClose();
      }
    } catch (error) {
      console.error("Ошибка:", error);
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
          placeholder="Введите имя"
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
          placeholder="Введите должность"
          required
        />
      </div>

      {/* Drag-and-Drop фото */}
      <div
        className={`flex h-32 cursor-pointer items-center justify-center border-2 border-dashed p-2 transition ${
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
        {image ? (
          <div className="text-center">
            <p className="text-sm text-gray-700">Выбрано фото:</p>
            <p className="text-sm font-medium">{image.name}</p>
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
        {loading ? "Загрузка..." : "Добавить преподавателя"}
      </Button>
    </form>
  );
}
