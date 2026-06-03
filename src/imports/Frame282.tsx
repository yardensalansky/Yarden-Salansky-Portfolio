import { CLOUDINARY_ASSETS as C } from '../constants/cloudinaryAssets';

const imgInstagramStory1011 = C['ab6c4162df8d7fdd41e43890ff410ebcbe7fa944'];

export default function Frame() {
  return (
    <div className="bg-[#cacacb] relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-end pr-0" data-name="Instagram story - 101 1">
        <img alt="A Weather app on iPhone" className="h-full w-auto object-contain pointer-events-none" src={imgInstagramStory1011} />
      </div>
    </div>
  );
}