export const fetchOrders = async (userId: string) => {
  try {
    const response = await fetch(`/api/shop/orders?userId=${userId}`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Ошибка загрузки заказов:", error);
    return [];
  }
};

export const deleteOrder = async (orderId: number) => {
  try {
    const response = await fetch("/api/shop/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    return response.ok;
  } catch (error) {
    console.error("Ошибка удаления заказа:", error);
    return false;
  }
};
