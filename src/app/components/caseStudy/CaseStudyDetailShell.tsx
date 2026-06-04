import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface CaseStudyDetailShellProps {
  children: ReactNode;
  backgroundColor?: string;
}

/** Shared 1400px detail card chrome for all desktop case studies. */
export function CaseStudyDetailShell({
  children,
  backgroundColor = '#ffffff',
}: CaseStudyDetailShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="box-border h-full min-h-0 w-[1400px] max-w-full min-w-0 overflow-hidden rounded-3xl shadow-2xl"
      style={{
        pointerEvents: 'auto',
        backgroundColor,
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="h-full w-full min-w-0 overflow-x-hidden overflow-y-auto">{children}</div>
    </motion.div>
  );
}
