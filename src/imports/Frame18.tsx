import { CLOUDINARY_ASSETS as C } from '../constants/cloudinaryAssets';

const imgIPhone16Pro1 = C['7ea8ae0c5f02d1ab87e06688297a8f1b9e1ca1b7'];

export default function Frame() {
  return (
    <div className="bg-black relative size-full">
      <div className="absolute h-[784px] left-[275px] top-[271px] w-[1057px]" data-name="iPhone 16 Pro 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone16Pro1} />
      </div>
      <p className="absolute font-['Hiragino_Kaku_Gothic_Std:W8',sans-serif] leading-[normal] left-[130px] not-italic text-[200px] text-white top-[162px] whitespace-nowrap" dir="auto">
        A WEATHER
      </p>
    </div>
  );
}