export const uploadImage = async (file: File): Promise<string | null> => {
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
            resolve(data.filePath);
          } else {
            reject("Ошибка загрузки изображения");
          }
        }
      };
      reader.onerror = () => reject("Ошибка чтения файла");
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error("Ошибка при загрузке:", error);
    return null;
  }
};

export const addNews = async (newsData: {
  title: string;
  description: string;
  previewImageUrl: string;
  images: string[];
}) => {
  try {
    const response = await fetch("/api/iknt/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newsData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Ошибка добавления новости");
      return null;
    }
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    return null;
  }
};

export async function deleteNews(newsId: string | number): Promise<boolean> {
  try {
    const response = await fetch("/api/iknt/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(newsId) }), // Приводим к числу
    });

    if (!response.ok) {
      console.error("Ошибка при удалении новости");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Ошибка сети при удалении новости:", error);
    return false;
  }
}

export const updateNews = async (
  newsId: string,
  updatedData: {
    title: string;
    description: string;
    previewImageUrl: string;
    images: string[]; // Добавили images
  },
) => {
  try {
    const response = await fetch("/api/iknt/news", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: newsId, ...updatedData }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Ошибка обновления новости");
      return null;
    }
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    return null;
  }
};
