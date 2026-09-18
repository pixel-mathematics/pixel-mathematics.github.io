"use client";

import { useState } from "react";
import type { FlashcardDeckDetail } from "@/data/courses/queries";
import { Loader2Icon, Volume2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarkdownContent } from "@/components/shared/markdown-content";

interface FlashcardProps {
  flashcard: FlashcardDeckDetail["flashcards"][0];
}

export function Flashcard({ flashcard }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Fallback: Dùng giọng đọc trình duyệt nếu Google TTS gặp sự cố
  const speakWithBrowser = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find((v) => v.lang === "en-GB" || v.lang === "en_GB");
      if (ukVoice) utterance.voice = ukVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Xử lý phát âm bằng Google Translate TTS
  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Chặn sự kiện lật thẻ
    if (isLoadingAudio) return;

    setIsLoadingAudio(true);
    const wordToFetch = flashcard.front_content;

    try {
      // Gọi URL của Google Translate (client=tw-ob giúp đọc tốt qua thẻ Audio)
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en-GB&client=tw-ob&q=${encodeURIComponent(wordToFetch)}`;

      const audio = new Audio(url);

      // Tắt icon loading khi phát xong
      audio.onended = () => setIsLoadingAudio(false);

      // Nếu lỗi mạng, fallback về giọng trình duyệt
      audio.onerror = () => {
        speakWithBrowser(wordToFetch);
        setIsLoadingAudio(false);
      };

      // Play audio, nếu bị trình duyệt block thì fallback
      audio.play().catch(() => {
        speakWithBrowser(wordToFetch);
        setIsLoadingAudio(false);
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      speakWithBrowser(wordToFetch);
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
        <Card className="absolute inset-0 flex h-full w-full [transform:translateZ(1px)] items-center justify-center bg-white antialiased shadow-lg transition-shadow [-webkit-backface-visibility:hidden] [backface-visibility:hidden] hover:shadow-xl">
          <CardContent className="p-6 text-center">
            {/* Nút phát âm ở góc trên bên phải */}
            <Button
              variant="ghost"
              className="hover:bg-primary/10 text-primary hover:text-primary absolute top-4 right-4 size-12 rounded-full"
              onClick={playAudio}
              disabled={isLoadingAudio}
            >
              {isLoadingAudio ? (
                <Loader2Icon className="text-primary size-5 animate-spin" />
              ) : (
                <Volume2Icon className="size-5" />
              )}
            </Button>
            <h2 className="text-2xl font-bold text-slate-800">{flashcard.front_content}</h2>
            <p className="mt-4 text-sm text-slate-400">(Nhấn để lật thẻ)</p>
          </CardContent>
        </Card>

        {/* MẶT SAU */}
        <Card className="absolute inset-0 flex h-full w-full [transform:rotateY(180deg)_translateZ(1px)] items-center justify-center border-blue-200 shadow-lg [backface-visibility:hidden]">
          <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
            <MarkdownContent content={flashcard.back_content} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
