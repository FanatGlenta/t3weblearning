import { NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";

export async function GET(req: NextRequest) {
  try {
    // Получаем параметры запроса
    const { searchParams } = new URL(req.url);
    let userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId обязателен" }, { status: 400 });
    }

    const userProducts = await db
      .select()
      .from(products)
      .where(eq(products.createdById, userId));

    return NextResponse.json(userProducts, { status: 200 });
  } catch (error) {
    console.error("Ошибка получения товаров:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
