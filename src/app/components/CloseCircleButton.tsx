import { X } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type CloseCircleSize = 'sm' | 'md' | 'lg';

const SIZE = {
  sm: { button: 'h-8 w-8', icon: 16 },
  md: { button: 'h-9 w-9', icon: 18 },
  lg: { button: 'h-10 w-10', icon: 20 },
} as const satisfies Record<CloseCircleSize, { button: string; icon: number }>;

export interface CloseCircleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: CloseCircleSize;
}

/** Circular close control with a centered Lucide X (shared across detail / about / play). */
export function CloseCircleButton({
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: CloseCircleButtonProps) {
  const { button, icon } = SIZE[size];
  return (
    <button
      type={type}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-black/15 bg-white/92 p-0 text-black shadow-md backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 ${button} ${className}`.trim()}
      {...props}
    >
      <X size={icon} strokeWidth={2.25} className="block shrink-0" aria-hidden />
    </button>
  );
}
