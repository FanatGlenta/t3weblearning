import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

// POST method
export async function POST(req: NextRequest) {
  try {
    const { name, description, price, imageUrl, userId } = await req.json();

    const newProduct = await db
      .insert(products)
      .values({
        name,
        description,
        price: parseInt(price, 10),
        imageUrl,
        createdById: userId,
      })
      .returning();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// DELETE method
export async function DELETE(req: NextRequest) {
  try {
    const { productId, userId } = await req.json();

    console.log("Попытка удалить товар:", { productId, userId });

    const deletedProduct = await db
      .delete(products)
      .where(and(eq(products.id, productId), eq(products.createdById, userId)))
      .returning({ id: products.id });

    if (!deletedProduct.length) {
      return NextResponse.json(
        { error: "Нет прав на удаление" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { message: "Товар удалён", deletedProduct },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка удаления товара:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { productId, userId, name, description, price, imageUrl } =
      await req.json();

    console.log("Попытка обновить товар:", {
      productId,
      userId,
      name,
      description,
      price,
      imageUrl,
    });

    // Проверяем, что все необходимые данные переданы
    if (!productId || !userId || !name || !description || !price) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 },
      );
    }

    // Обновляем товар только если он принадлежит пользователю
    const updatedProduct = await db
      .update(products)
      .set({
        name,
        description,
        price: parseInt(price, 10),
        imageUrl,
      })
      .where(and(eq(products.id, productId), eq(products.createdById, userId)))
      .returning({ id: products.id });

    if (!updatedProduct.length) {
      return NextResponse.json(
        { error: "Нет прав на обновление или товар не найден" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { message: "Товар обновлён", updatedProduct },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка обновления товара:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
