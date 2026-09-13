import type { LucideProps } from "lucide-react";

export function LogoIcon({ size = 24, className, ...props }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Nền xanh đen */}
      <rect width="240" height="240" rx="40" fill="#1D293D" />

      {/* Các khối màu Cyan */}
      <path d="M113 40H43V60H113V40Z" fill="#00D5BE" />
      <path d="M73 60H53V140H73V60Z" fill="#00D5BE" />
      <path d="M103 60H83V160H103V60Z" fill="#00D5BE" />

      {/* Các khối màu Vàng */}
      <path d="M178 40H158V100H178V40Z" fill="#FFD230" />
      <path d="M198 60H138V80H198V60Z" fill="#FFD230" />

      {/* Các khối màu Tím */}
      <path d="M198 120H138V136H198V120Z" fill="#615FFF" />
      <path d="M198 144H138V160H198V144Z" fill="#615FFF" />

      {/* Các chấm màu ở dưới */}
      <path d="M91 180H71V200H91V180Z" fill="#F6339A" />
      <path d="M131 180H111V200H131V180Z" fill="#00D5BE" />
      <path d="M171 180H151V200H171V180Z" fill="#FFB900" />
    </svg>
  );
}
