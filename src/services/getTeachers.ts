export interface Teacher {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

/**
 * Получает список преподавателей с сервера
 */
export async function fetchTeachers(): Promise<Teacher[]> {
  try {
    const response = await fetch("/api/iknt/teachers");
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении данных преподавателей:", error);
    return [];
  }
}

/**
 * Загружает фото преподавателя и возвращает URL
 */
export const uploadTeacherImage = async (
  file: File,
): Promise<string | null> => {
  try {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        if (typeof reader.result === "string") {
          const base64Image = reader.result.split(",")[1];

          const response = await fetch("/api/shop/upload-photo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64Image, filename: file.name }),
          });

          if (response.ok) {
            const data = await response.json();
            resolve(data.filePath); // URL загруженного фото
          } else {
            reject("Ошибка загрузки изображения");
          }
        }
      };
      reader.onerror = () => reject("Ошибка чтения файла");
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error("Ошибка при загрузке изображения:", error);
    return null;
  }
};

/**
 * Добавляет нового преподавателя
 */
export const addTeacher = async (teacherData: {
  name: string;
  position: string;
  imageUrl: string;
}): Promise<Teacher | null> => {
  try {
    const response = await fetch("/api/iknt/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacherData),
    });

    if (!response.ok) {
      throw new Error("Ошибка при добавлении преподавателя");
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при добавлении преподавателя:", error);
    return null;
  }
};

/**
 * Удаляет преподавателя по ID
 */
export const deleteTeacher = async (teacherId: string): Promise<boolean> => {
  try {
    const response = await fetch("/api/iknt/teachers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: teacherId }),
    });

    if (!response.ok) {
      console.error("Ошибка при удалении преподавателя");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Ошибка сети при удалении преподавателя:", error);
    return false;
  }
};

/**
 * Обновляет данные преподавателя
 */
export const updateTeacher = async (
  teacherId: string,
  updatedData: {
    name: string;
    position: string;
    imageUrl: string;
  },
): Promise<Teacher | null> => {
  try {
    const response = await fetch("/api/iknt/teachers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: teacherId, ...updatedData }),
    });

    if (!response.ok) {
      console.error("Ошибка при обновлении преподавателя");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    return null;
  }
};
