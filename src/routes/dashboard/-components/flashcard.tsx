import { useState } from "react";
import { Loader2Icon, Volume2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FlashcardDeckDetail } from "@/queries/courses";
import { MarkdownContent } from "./markdown-content";

interface FlashcardProps {
  flashcard: FlashcardDeckDetail["flashcards"][0];
}

export function Flashcard({ flashcard }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Fallback đọc bằng trình duyệt nếu API lỗi hoặc không tìm thấy (thường là với cụm từ dài)
  const speakWithBrowser = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find(
        (v) => v.lang === "en-GB" || v.lang === "en_GB"
      );
      if (ukVoice) utterance.voice = ukVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Hàm xử lý lấy mp3 từ Free Dictionary API
  const playAudio = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Chặn lật thẻ

    // Đang tải thì không cho bấm liên tục
    if (isLoadingAudio) return;

    setIsLoadingAudio(true);

    try {
      // Xử lý từ vựng: cắt khoảng trắng thừa để gọi API
      const wordToFetch = flashcard.front_content.trim();
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToFetch}`
      );

      if (!response.ok) {
        throw new Error("Word not found in API");
      }

      const data = await response.json();

      // Tìm link audio trong mảng phonetics của kết quả trả về
      const phonetics = data[0]?.phonetics || [];
      let audioUrl = "";

      // Ưu tiên 1: Tìm audio của Anh (UK)
      const ukPhonetic = phonetics.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: any) => p.audio && p.audio.includes("-uk.mp3")
      );
      if (ukPhonetic) {
        audioUrl = ukPhonetic.audio;
      } else {
        // Ưu tiên 2: Lấy bất kỳ audio nào có sẵn (US, AU...) nếu không có UK
        const anyPhonetic = phonetics.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (p: any) => p.audio && p.audio !== ""
        );
        if (anyPhonetic) {
          audioUrl = anyPhonetic.audio;
        }
      }

      // Phát file MP3
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        // API có từ này nhưng không có file âm thanh
        speakWithBrowser(wordToFetch);
      }
    } catch (err) {
      console.error(err);
      // Nếu lỗi (ví dụ 404 do là cụm từ "break time", "boarding school") -> Dùng trình duyệt đọc
      console.log("Chuyển sang dùng giọng đọc trình duyệt...");
      speakWithBrowser(flashcard.front_content);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  return (
    <div
      className="group h-128 cursor-pointer select-none [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "border-border relative h-full w-full rounded-xl border transition-transform duration-500 [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        )}
      >
        {/* MẶT TRƯỚC */}
        <Card className="absolute inset-0 flex h-full w-full items-center justify-center bg-white shadow-lg transition-shadow [backface-visibility:hidden] hover:shadow-xl">
          <CardContent className="p-6 text-center">
            {/* Nút phát âm ở góc trên bên phải */}
            <Button
              variant="ghost"
              className="hover:bg-primary/10 text-primary hover:text-primary absolute top-4 right-4 size-12 rounded-full"
              onClick={playAudio}
              disabled={isLoadingAudio}
            >
              {isLoadingAudio ? (
                <Loader2Icon className="h-5 w-5 animate-spin text-blue-500" />
              ) : (
                <Volume2Icon className="h-5 w-5" />
              )}
            </Button>
            <h2 className="text-2xl font-bold text-slate-800">
              {flashcard.front_content}
            </h2>
            <p className="mt-4 text-sm text-slate-400">(Nhấn để lật thẻ)</p>
          </CardContent>
        </Card>

        {/* MẶT SAU */}
        <Card className="absolute inset-0 flex h-full w-full [transform:rotateY(180deg)] items-center justify-center border-blue-200 shadow-lg [backface-visibility:hidden]">
          <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
            <p className="text-lg font-medium whitespace-pre-line text-slate-700">
              <MarkdownContent content={flashcard.back_content} />
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
