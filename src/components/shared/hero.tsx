import { cn } from "@/lib/utils";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  highlightText?: string;
  quote?: string;
}

export function Hero({ className, text, highlightText, quote, ...props }: HeroProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[20vh] items-center justify-center bg-[url('/hero.svg')] bg-cover md:min-h-[30vh]",
        className
      )}
      {...props}
    >
      <div className="mx-4 flex flex-col items-center gap-1 text-center md:mx-0 md:gap-4">
        <div className="text-2xl font-bold sm:text-3xl md:text-4xl">
          <span className="text-white">{text}</span>{" "}
          <span className="text-teal-400">{highlightText}</span>
        </div>
        {quote && (
          <div className="text-base text-slate-300 md:text-lg">
            <span className="text-muted-foreground">[[</span> {quote}{" "}
            <span className="text-muted-foreground">]]</span>
          </div>
        )}
      </div>
    </div>
  );
}
