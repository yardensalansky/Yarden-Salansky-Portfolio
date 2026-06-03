import React from "react";
import { CLOUDINARY_ASSETS } from "../constants/cloudinaryAssets";

export default function Frame() {
  return (
    <div className="bg-[#cacacb] relative size-full overflow-hidden">
      <img
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover object-right"
        src={CLOUDINARY_ASSETS['aweather-bg-right']}
      />
    </div>
  );
}