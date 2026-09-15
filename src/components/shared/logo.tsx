import { Link } from "@tanstack/react-router";
import { LogoIcon } from "./custom-icons";

export function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <LogoIcon className="size-11 sm:size-12 lg:size-14" />
        <div className="font-bold tracking-tight">
          <div className="text-primary text-2xl lg:text-3xl">Pixel</div>
          <div className="text-foreground/90 -mt-2 text-xl lg:text-2xl">
            Mathematics
          </div>
        </div>
      </div>
    </Link>
  );
}
