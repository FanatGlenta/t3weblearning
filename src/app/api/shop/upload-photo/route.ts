import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, filename } = body; // Получаем base64-строку и оригинальное имя файла

    if (!image || !filename) {
      return NextResponse.json(
        { error: "Отсутствуют данные изображения или имя файла" },
        { status: 400 },
      );
    }

    // Удаляем потенциально опасные символы из имени файла
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Проверяем, существует ли директория
    await fs.mkdir(uploadDir, { recursive: true });

    // Генерируем путь для сохранения файла
    const filePath = path.join(uploadDir, safeFilename);

    // Декодируем base64 и записываем файл
    const imageBuffer = Buffer.from(image, "base64");
    await fs.writeFile(filePath, imageBuffer);

    const fileUrl = `/uploads/${safeFilename}`;

    return NextResponse.json({ filePath: fileUrl }, { status: 201 });
  } catch (error) {
    console.error("Ошибка сохранения файла:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
