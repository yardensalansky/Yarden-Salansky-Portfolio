interface NextProjectFooterProps {
  onNextProject: () => void;
  /** Tailwind text size class (desktop vs mobile). */
  textClassName?: string;
  backgroundClassName?: string;
  className?: string;
}

export function NextProjectFooter({
  onNextProject,
  textClassName = "text-4xl text-white",
  backgroundClassName = "bg-black",
  className = "",
}: NextProjectFooterProps) {
  return (
    <div
      className={`flex w-full shrink-0 justify-center border-0 py-14 ${backgroundClassName} ${className}`.trim()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onNextProject();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className={`cursor-pointer border-0 bg-transparent font-['Clash_Grotesk'] font-semibold tracking-wider transition-opacity hover:opacity-60 ${textClassName}`}
      >
        NEXT PROJECT &gt;&gt;
      </button>
    </div>
  );
}
