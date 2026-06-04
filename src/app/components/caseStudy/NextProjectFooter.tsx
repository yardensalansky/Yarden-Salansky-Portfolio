interface NextProjectFooterProps {
  onNextProject: () => void;
  /** Tailwind text size class (desktop vs mobile). */
  textClassName?: string;
  backgroundClassName?: string;
}

export function NextProjectFooter({
  onNextProject,
  textClassName = "text-4xl",
  backgroundClassName = "bg-white",
}: NextProjectFooterProps) {
  return (
    <div className={`flex w-full shrink-0 justify-center py-14 ${backgroundClassName}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onNextProject();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className={`cursor-pointer border-0 bg-transparent font-['Clash_Grotesk'] font-semibold tracking-wide text-black transition-opacity hover:opacity-60 ${textClassName}`}
      >
        NEXT PROJECT &gt;&gt;
      </button>
    </div>
  );
}
