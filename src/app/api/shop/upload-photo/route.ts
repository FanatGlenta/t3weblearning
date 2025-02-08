import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: true, // Оставляем встроенный парсер
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, filename } = body; // Получаем base64-строку и имя файла

    if (!image || !filename) {
      return NextResponse.json(
        { error: "Отсутствуют данные изображения" },
        { status: 400 },
      );
    }

    // Декодируем base64 и создаем файл
    const imageBuffer = Buffer.from(image, "base64");
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, imageBuffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ filePath: fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Ошибка сохранения файла:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
