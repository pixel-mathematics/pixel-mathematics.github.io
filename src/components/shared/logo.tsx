import { LogoIcon } from "./custom-icons";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon className="size-8 md:size-10" />
      <div className="font-bold tracking-tight">
        <div className="text-primary text-xl md:text-2xl">Pixel</div>
        <div className="text-foreground/90 -mt-2.5 text-lg md:text-xl">Mathematics</div>
      </div>
    </div>
  );
}
