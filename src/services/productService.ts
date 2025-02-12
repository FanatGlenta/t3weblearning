export const fetchProducts = async (userId: string) => {
  try {
    const response = await fetch(`/api/shop/product-user?userId=${userId}`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    return [];
  }
};

export const addProduct = async (
  name: string,
  description: string,
  price: string,
  image: File,
  shopId: number,
  userId: string,
) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const base64String = reader.result?.toString().split(",")[1];
        if (!base64String) return reject("Ошибка чтения файла.");

        try {
          // Загрузка изображения
          const uploadResponse = await fetch("/api/shop/upload-photo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64String, filename: image.name }),
          });

          const uploadData = await uploadResponse.json();
          if (!uploadData.filePath)
            return reject("Ошибка загрузки изображения.");

          // Добавление продукта
          const productResponse = await fetch("/api/shop/create-products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              description,
              price,
              imageUrl: uploadData.filePath,
              shopId,
              userId,
            }),
          });

          if (productResponse.ok) {
            resolve(await productResponse.json());
          } else {
            reject("Ошибка создания товара.");
          }
        } catch (error) {
          console.error("Ошибка загрузки товара:", error);
          reject(error);
        }
      };
    });
  } catch (error) {
    console.error("Ошибка загрузки файла:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: number, userId: string) => {
  try {
    const response = await fetch("/api/shop/create-products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, userId }),
    });

    return response.ok;
  } catch (error) {
    console.error("Ошибка удаления товара:", error);
    return false;
  }
};

export const updateProduct = async (
  productId: number,
  userId: string,
  name: string,
  description: string,
  price: string,
  imageUrl?: string, // Опциональный параметр
) => {
  const response = await fetch(`/api/shop/create-products`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId,
      userId,
      name,
      description,
      price,
      imageUrl,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Ошибка обновления товара");
  }

  return response.json();
};
