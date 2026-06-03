import { CLOUDINARY_ASSETS as C } from '../constants/cloudinaryAssets';

const imgInstagramStory1011 = C['ab6c4162df8d7fdd41e43890ff410ebcbe7fa944'];

export default function Frame() {
  return (
    <div className="bg-[#cacacb] relative w-full h-full overflow-hidden">
      <div className="absolute h-[562.5px] left-[554.5px] top-[301px] w-[450px]" data-name="Instagram story - 101 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgInstagramStory1011} />
      </div>
    </div>
  );
}
