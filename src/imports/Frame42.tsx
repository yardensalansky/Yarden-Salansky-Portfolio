import svgPaths from "./svg-1tccii76mk";

export default function Frame() {
  return (
    <div className="bg-black relative size-full">
      <p className="absolute font-['Hiragino_Kaku_Gothic_Std:W8',sans-serif] leading-[normal] left-[77.19px] not-italic text-[52.221px] text-white top-[92.28px] whitespace-nowrap" dir="auto">
        Yarden’s brain
      </p>
      <p className="absolute font-['Hiragino_Kaku_Gothic_Std:W8',sans-serif] leading-[normal] left-[364.49px] not-italic text-[52.221px] text-white top-[143.94px] whitespace-nowrap" dir="auto">
        portfolio
      </p>
      <div className="absolute font-['Hiragino_Kaku_Gothic_Pro:W6',sans-serif] h-[103.89px] leading-[0] left-[77.19px] not-italic text-[17.412px] text-white top-[233.32px] tracking-[-0.3482px] w-[434.714px]">
        <p className="leading-[normal] mb-0" dir="auto">
          Welcome to a piece of my mind.
        </p>
        <p className="leading-[normal]" dir="auto">{`I’m a graphic designer who loves working from the sofa, but I'll give it up for a good job.`}</p>
      </div>
      <div className="absolute h-0 left-[358.68px] top-[138.13px] w-[184.166px]">
        <div className="absolute inset-[-6.09px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 184.166 12.1882">
            <path d={svgPaths.p3d0b2800} fill="var(--stroke-0, #CF1D1D)" id="Vector 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}