import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { teachers } from "~/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Получает список преподавателей
 */
export async function GET() {
  try {
    const result = await db.select().from(teachers);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении преподавателей:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}

/**
 * Добавляет нового преподавателя
 */
export async function POST(req: NextRequest) {
  try {
    const { name, position, imageUrl } = await req.json();

    if (!name || !position || !imageUrl) {
      return NextResponse.json(
        { message: "Заполните все поля" },
        { status: 400 },
      );
    }

    const newTeacher = await db
      .insert(teachers)
      .values({ name, position, imageUrl })
      .returning();

    return NextResponse.json(newTeacher[0], { status: 201 });
  } catch (error) {
    console.error("Ошибка при добавлении преподавателя:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}

/**
 * Удаляет преподавателя
 */
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "ID преподавателя не указан" },
        { status: 400 },
      );
    }

    await db.delete(teachers).where(eq(teachers.id, id));

    return NextResponse.json(
      { message: "Преподаватель удален" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка при удалении преподавателя:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}

/**
 * Обновляет данные преподавателя
 */
export async function PUT(req: NextRequest) {
  try {
    const { id, name, position, imageUrl } = await req.json();

    if (!id || !name || !position || !imageUrl) {
      return NextResponse.json(
        { message: "Все поля обязательны" },
        { status: 400 },
      );
    }

    const updatedTeacher = await db
      .update(teachers)
      .set({ name, position, imageUrl })
      .where(eq(teachers.id, id))
      .returning();

    return NextResponse.json(updatedTeacher[0], { status: 200 });
  } catch (error) {
    console.error("Ошибка при обновлении преподавателя:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
