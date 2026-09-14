import { cn } from "@/lib/utils";

export function Heading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h2
      className={cn("text-primary mb-4 text-2xl font-bold", className)}
      {...props}
    />
  );
}
