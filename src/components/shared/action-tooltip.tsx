import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ActionTooltipProps extends React.ComponentPropsWithoutRef<typeof Tooltip> {
  children: React.ReactNode;
  label: string | React.ReactNode;
}

export function ActionTooltip({ children, label, ...props }: ActionTooltipProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger render={<div>{children}</div>} />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
