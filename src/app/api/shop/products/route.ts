import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";

export async function GET(req: NextRequest) {
  try {
    const allProducts = await db.select().from(products);
    return NextResponse.json(allProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка получения товаров", error },
      { status: 500 },
    );
  }
}
