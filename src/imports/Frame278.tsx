export default function Frame() {
  return (
    <div className="bg-black relative w-full h-full">
      <p className="absolute font-['Hiragino_Kaku_Gothic_Std:W8',sans-serif] leading-[normal] left-[calc(50%-350px)] not-italic text-[100px] text-white top-[81px] whitespace-nowrap" dir="auto">
        A WEATHER
      </p>
      <div className="absolute font-['Neue_Haas_Grotesk_Display_Pro:65_Medium',sans-serif] leading-[0] left-[80px] not-italic text-[57px] text-white top-[245px] tracking-[5.7px] w-[540px]">
        <p className="leading-[1.03] mb-0" dir="auto">
          DON'T BE LIKE EVERYBODY ELSE
        </p>
        <p className="leading-[1.03]" dir="auto">
          WEATHER FOR THOSE WHO KNOW BETTER.
        </p>
      </div>
      <div className="absolute flex h-[3.66px] items-center justify-center left-[81px] top-[227px] w-[540px]">
        <div className="flex-none rotate-[0.3deg]">
          <div className="h-0 relative w-[540px]">
            <div className="absolute inset-[-1.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 540 3">
                <line stroke="white" strokeWidth="3" x2="540" y1="1.5" y2="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}