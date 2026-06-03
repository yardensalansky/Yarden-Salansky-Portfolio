import { CLOUDINARY_ASSETS as C } from '../constants/cloudinaryAssets';

const imgSD068451 = C['a5720160641fbcb47a5023687c61d5e5748b3e7a'];

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[1138.391px] left-[-121.36px] top-0 w-[1982.504px]" data-name="S_D06845 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSD068451} />
      </div>
      <p className="absolute font-['Hiragino_Kaku_Gothic_Std:W8',sans-serif] leading-[normal] left-[188px] not-italic text-[200px] text-white top-[168px] whitespace-nowrap" dir="auto">
        WAR DIARY
      </p>
    </div>
  );
}