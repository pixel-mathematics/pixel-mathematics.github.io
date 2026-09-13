import { cn } from "@/lib/utils";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  highlightText?: string;
  quote?: string;
}

export function Hero({
  className,
  text,
  highlightText,
  quote,
  ...props
}: HeroProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[30vh] items-center justify-center bg-[url('/hero.svg')] bg-cover md:min-h-[40vh]",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-3xl font-bold sm:text-4xl md:text-5xl">
          <span className="text-white">{text}</span>{" "}
          <span className="text-teal-400">{highlightText}</span>
        </div>
        <div className="text-base text-slate-300 md:text-lg">{quote}</div>
      </div>
    </div>
  );
}
