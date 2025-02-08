import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { orders, orderItems, carts, products } from "~/server/db/schema";
import { eq } from "drizzle-orm";

interface CartItem {
  id: number;
  price: number;
  quantity: number;
}

// Создание заказа (POST)
export async function POST(req: NextRequest) {
  try {
    const { userId, cart }: { userId: string; cart: CartItem[] } =
      await req.json();

    if (!userId || !cart || cart.length === 0) {
      return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Создаём заказ и получаем его ID
    const createdOrders = await db
      .insert(orders)
      .values({ userId, total })
      .returning({ id: orders.id });

    if (!createdOrders || createdOrders.length === 0) {
      return NextResponse.json(
        { error: "Ошибка при создании заказа" },
        { status: 500 },
      );
    }

    const orderId = createdOrders[0]?.id;
    if (!orderId) {
      return NextResponse.json(
        { error: "Ошибка: orderId не найден" },
        { status: 500 },
      );
    }

    // Добавляем товары в заказ
    await db.insert(orderItems).values(
      cart.map((item) => ({
        orderId,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    );

    // Очищаем корзину пользователя
    await db.delete(carts).where(eq(carts.userId, userId));

    return NextResponse.json(
      { message: "Заказ успешно создан", orderId },
      { status: 201 },
    );
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// Получение заказов пользователя (GET)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Отсутствует userId" },
        { status: 400 },
      );
    }

    const userOrders = await db
      .select({
        id: orders.id,
        total: orders.total,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(eq(orders.userId, userId));

    if (!userOrders || userOrders.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Получаем товары для каждого заказа
    const ordersWithItems = await Promise.all(
      userOrders.map(async (order) => {
        const items = await db
          .select({
            name: products.name,
            quantity: orderItems.quantity,
          })
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id))
          .innerJoin(products, eq(orderItems.productId, products.id));

        return { ...order, items };
      }),
    );

    return NextResponse.json(ordersWithItems, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// Удаление заказа (DELETE)
export async function DELETE(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
    }

    await db.delete(orders).where(eq(orders.id, orderId));

    return NextResponse.json({ message: "Заказ удалён" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при удалении заказа:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
