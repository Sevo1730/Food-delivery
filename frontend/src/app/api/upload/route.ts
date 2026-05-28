import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл олдсонгүй" }, { status: 400 });
    }

    // TODO: Upload to Cloudinary
    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);
    // const result = await cloudinary.uploader.upload(...)

    return NextResponse.json({
      url: `https://placeholder.com/${file.name}`,
      message: "Файл амжилттай байршуулагдлаа",
    });
  } catch {
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
