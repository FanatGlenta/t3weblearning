export const fetchShop = async (ownerId: string) => {
  try {
    const response = await fetch(`/api/shop/get-shop?ownerId=${ownerId}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error("Ошибка загрузки магазина:", error);
    return null;
  }
};

export const createShop = async (
  shopName: string,
  shopDescription: string,
  ownerId: string,
) => {
  try {
    const response = await fetch("/api/shop/create-shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: shopName,
        description: shopDescription,
        ownerId,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Ошибка создания магазина:", error);
    throw error;
  }
};
