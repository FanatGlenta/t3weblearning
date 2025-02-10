import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

import { eq, and } from "drizzle-orm";
import { carts, products } from "~/server/db/schema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "userId обязателен" }, { status: 400 });
  }

  try {
    const cartItems = await db
      .select({
        id: carts.productId,
        quantity: carts.quantity,
        name: products.name,
        price: products.price,
        imageUrl: products.imageUrl,
      })
      .from(carts)
      .leftJoin(products, eq(carts.productId, products.id))
      .where(eq(carts.userId, userId));

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка загрузки корзины", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId || !quantity) {
    return NextResponse.json(
      { message: "userId, productId и quantity обязательны" },
      { status: 400 },
    );
  }

  try {
    // Проверяем, есть ли товар уже в корзине
    const existingCartItem = await db
      .select()
      .from(carts)
      .where(and(eq(carts.userId, userId), eq(carts.productId, productId)))
      .limit(1);

    if (existingCartItem.length > 0 && existingCartItem[0]) {
      // Убедимся, что объект существует перед доступом к .quantity
      await db
        .update(carts)
        .set({ quantity: existingCartItem[0].quantity + quantity })
        .where(and(eq(carts.userId, userId), eq(carts.productId, productId)));
    } else {
      // Если товара нет, создаем новую запись
      await db.insert(carts).values({ userId, productId, quantity });
    }

    return NextResponse.json(
      { message: "Товар добавлен/обновлен в корзине" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка добавления товара", error },
      { status: 500 },
    );
  }
}

// PUT /api/shop/cart
export async function PUT(req: NextRequest) {
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId || !quantity) {
    return NextResponse.json(
      { message: "userId, productId и quantity обязательны" },
      { status: 400 },
    );
  }

  try {
    await db
      .update(carts)
      .set({ quantity })
      .where(and(eq(carts.userId, userId), eq(carts.productId, productId)));

    return NextResponse.json(
      { message: "Количество обновлено" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка обновления количества", error },
      { status: 500 },
    );
  }
}

// DELETE /api/shop/cart (удаление товара или всей корзины)
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const productId = searchParams.get("productId");

  if (!userId) {
    return NextResponse.json({ message: "userId обязателен" }, { status: 400 });
  }

  try {
    if (productId) {
      await db
        .delete(carts)
        .where(
          and(eq(carts.userId, userId), eq(carts.productId, Number(productId))),
        );
      return NextResponse.json({ message: "Товар удален" }, { status: 200 });
    } else {
      await db.delete(carts).where(eq(carts.userId, userId));
      return NextResponse.json({ message: "Корзина очищена" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка удаления", error },
      { status: 500 },
    );
  }
}
