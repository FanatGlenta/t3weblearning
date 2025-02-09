import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db"; // Adjust the import path
import { shops } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, ownerId } = body;

    if (!name || !ownerId) {
      return NextResponse.json(
        { error: "Имя магазина и ownerId обязательны" },
        { status: 400 },
      );
    }

    // Проверяем, есть ли уже магазин у пользователя
    const existingShop = await db
      .select()
      .from(shops)
      .where(eq(shops.ownerId, ownerId));

    if (existingShop.length > 0) {
      return NextResponse.json(
        { error: "У вас уже есть магазин" },
        { status: 400 },
      );
    }

    // Создаем новый магазин
    const newShop = await db
      .insert(shops)
      .values({ name, ownerId })
      .returning();

    return NextResponse.json(newShop[0], { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании магазина:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
