import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db"; // Adjust this path if needed
import { shops } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Получаем параметры запроса
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");

    if (!ownerId) {
      return NextResponse.json({ error: "Не указан ownerId" }, { status: 400 });
    }

    // Ищем магазин по ownerId
    const shop = await db
      .select()
      .from(shops)
      .where(eq(shops.ownerId, ownerId))
      .limit(1);

    if (shop.length === 0) {
      return NextResponse.json({ error: "Магазин не найден" }, { status: 404 });
    }

    return NextResponse.json(shop[0], { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении магазина:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
