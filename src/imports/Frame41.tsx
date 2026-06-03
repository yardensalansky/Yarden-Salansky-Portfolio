import svgPaths from "./svg-ey4l8rln67";
import { CLOUDINARY_ASSETS as C } from '../constants/cloudinaryAssets';

const imgScreenshot20260318At1209271 = C['a13c0a1d2183c49766cf5beff8da0c8ee7d2cbd3'];

function Frame() {
  return (
    <div className="absolute bg-white inset-[28.71%_58.63%_20.28%_0] overflow-clip">
      <div className="absolute h-[925.442px] left-[-73.43px] top-[-33.8px] w-[1628.49px]" data-name="Screenshot 2026-03-18 at 12.09.27 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot20260318At1209271} />
      </div>
      <p className="absolute font-['Hiragino_Kaku_Gothic_Std:W8',sans-serif] leading-[normal] left-[155.03px] not-italic text-[104.88px] text-white top-[185.33px] whitespace-nowrap" dir="auto">
        Yarden’s brain
      </p>
      <p className="absolute font-['Hiragino_Kaku_Gothic_Std:W8',sans-serif] leading-[normal] left-[732.01px] not-italic text-[104.88px] text-white top-[289.07px] whitespace-nowrap" dir="auto">
        portfolio
      </p>
      <div className="absolute font-['Hiragino_Kaku_Gothic_Pro:W6',sans-serif] h-[208.647px] leading-[0] left-[155.03px] not-italic text-[34.97px] text-white top-[468.58px] tracking-[-0.6994px] w-[873.053px]">
        <p className="leading-[normal] mb-0" dir="auto">
          Welcome to a piece of my mind.
        </p>
        <p className="leading-[normal]" dir="auto">{`I’m a graphic designer who loves working from the sofa, but I'll give it up for a good job.`}</p>
      </div>
      <button className="absolute block cursor-pointer font-['Hiragino_Kaku_Gothic_Pro:W6',sans-serif] h-[51.287px] leading-[0] left-[542.02px] not-italic text-[34.97px] text-left text-white top-[785.63px] tracking-[-0.6994px] w-[357.847px]">
        <p className="leading-[normal]" dir="auto">{`Explore my works `}</p>
      </button>
      <div className="absolute h-0 left-[720.36px] top-[277.42px] w-[369.868px]">
        <div className="absolute inset-[-12.24px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 369.868 24.4781">
            <path d={svgPaths.p24ec1380} fill="var(--stroke-0, #CF1D1D)" id="Vector 1" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[464.101px] left-[1420.41px] top-[-347.3px] w-[422.309px]">
        <div className="absolute inset-[-0.28%_-0.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 424.864 466.657">
            <path d={svgPaths.p39f70dc0} id="Vector 4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.55502" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#8c4a4a] h-[4389px] left-[-1851px] overflow-clip top-[-1466px] w-[6822px]">
      <div className="absolute h-[1748px] left-[1950px] top-[1100px] w-[3448.915px]" data-name="Component 1">
        <Frame />
      </div>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="bg-[#dadada] relative size-full">
      <Frame1 />
    </div>
  );
}