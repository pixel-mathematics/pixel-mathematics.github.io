import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get("text");
  const lang = searchParams.get("lang") || "en-GB";

  if (!text) {
    return new NextResponse("Missing text parameter", { status: 400 });
  }

  // URL gốc của Google
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;

  try {
    // Gọi Google API từ Server Next.js (Không bị chặn CORS)
    const response = await fetch(url, {
      headers: {
        // Giả lập User-Agent để Google không chặn request từ bot/server
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Google TTS Error: ${response.status}`);
    }

    // Chuyển đổi dữ liệu âm thanh thành Buffer
    const arrayBuffer = await response.arrayBuffer();

    // Trả âm thanh về cho Client kèm Header chuẩn
    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        // Cache lại file audio này trên trình duyệt 1 năm để giảm tải cho Server nếu học viên nghe lại từ này
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("TTS Proxy Error:", error);
    return new NextResponse("Failed to fetch audio", { status: 500 });
  }
}
