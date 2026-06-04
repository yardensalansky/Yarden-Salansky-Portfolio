import { CLOUDINARY_ASSETS as C } from '../../constants/cloudinaryAssets';
import { ScaledFigmaCaseStudy } from './ScaledFigmaCaseStudy';

/** Mobile Figma artboard — `w-96` (384px). */
const W = 384;
/** Total height — wireframe. */
const H = 4788;

/** Slot 1 — overview / first large image (wireframe `top: 783`). */
const imgOverview = C['baa51197c9d32d0b48a2e85d0a42bf14e6462dfb'];
/** Gallery row — slots match your wireframe order (full, then two halves). */
const imgGalleryRow1 = C['cfd7b1f5e90dffebe4b2a85038f4dc09ead87710'];
const imgGalleryRow2 = C['f0d6b6967df287adfff81409accd73d3f8015af7'];
const imgGalleryRow3 =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756258/5c1c2f30e081cf6af41fdc76c18e71c45244275d_gmrmiw.jpg';
/** Wide strip — wireframe `top: 1972` (+38px so goals copy does not run into the photo). */
const imgEmotion =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756266/d814f663320e2e4fa2db0c78fda37a584fab5585_hks5b7.png';
/** Black column — three stacked slots (wireframe positions unchanged). */
const imgBlack1 =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756263/a6bbf11e62097685360dd84128d5d2ac402524cb_ubqlhg.jpg';
const imgBlack2 = 'https://res.cloudinary.com/drqk65xwl/image/upload/v1775805100/S_D04554_1_zfjqc4.png';
const imgBlack3 = C['f0d6b6967df287adfff81409accd73d3f8015af7'];
/** Catalog — wireframe `top: 3982`. */
const imgCatalog =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775811144/FullSizeRender_zhcvjj.png';

/**
 * War Diary — mobile case study, 384×4788. Image URLs stay in the same slots as your wireframe;
 * children are in **strict top order** for paint order (no z-index).
 */
function MobileWarDiaryArtboard() {
  return (
    <div className="relative overflow-hidden bg-white" style={{ width: W, height: H }}>
      <div className="absolute left-0 top-0 h-60 w-96 overflow-hidden bg-zinc-300">
        <div className="absolute left-[11px] top-[170px] justify-start drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
          <span className="font-['Clash_Grotesk'] text-3xl font-bold tracking-widest text-white">
            WAR DIARY
            <br />
          </span>
          <span className="font-['Clash_Grotesk'] text-lg font-medium tracking-wide text-white">Shahar Dekel</span>
        </div>
      </div>

      <div className="absolute left-[12px] top-[299px] h-56 w-96 justify-start font-['Satoshi'] text-base font-medium text-stone-950">
        War Diary is an archival project based on photographs and texts by Shahar Dekel, a reserve tank soldier during
        the early stages of the&nbsp;Iron Swords War.
        <br />
        Rather than portraying soldiers as heroes, the project focuses on the person behind the uniform the emotions,
        moments, and relationships within war. The project translates raw, personal documentation into a structured
        visual experience both as a digital archive and a printed catalog.
      </div>

      <div className="absolute left-[12px] top-[549px] flex h-48 w-48 flex-col items-start justify-center gap-3">
        <div className="flex w-14 flex-col items-start justify-start gap-2.5">
          <div className="self-stretch justify-start font-['Satoshi'] text-base font-bold text-neutral-500">YEAR</div>
          <div className="self-stretch justify-start font-['Satoshi'] text-lg font-black text-black">2025</div>
        </div>
        <div className="flex w-40 flex-col items-start justify-start gap-2.5">
          <div className="self-stretch justify-start font-['Satoshi'] text-base font-bold text-neutral-500">CLIENT</div>
          <div className="w-48 justify-start font-['Satoshi'] text-lg font-black text-black">Student Project </div>
        </div>
        <div className="flex w-48 flex-col items-start justify-start gap-2.5">
          <div className="self-stretch justify-start font-['Satoshi'] text-base font-bold text-neutral-500">
            DESIGN FIELD{' '}
          </div>
          <div className="self-stretch justify-start font-['Satoshi'] text-lg font-black text-black">Web & Print</div>
        </div>
      </div>

      <img
        className="absolute left-[-13px] top-[783px] h-52 w-96 object-cover"
        src={imgOverview}
        alt=""
        loading="lazy"
      />

      <div className="absolute left-[12px] top-[1034px] w-96 justify-start font-['Satoshi'] text-lg font-medium text-black">
        This project explores the emotional experience of war focusing on memory, uncertainty, and repetition. Rather
        than documenting events, it reflects how moments are experienced, fragmented, and internalized by the people
        living them.
      </div>

      <div className="absolute left-0 top-[1221.89px] inline-flex w-96 flex-wrap content-end items-end justify-start gap-4">
        <img className="h-56 w-96 object-cover" src={imgGalleryRow1} alt="" loading="lazy" />
        <img className="h-64 w-48 object-cover" src={imgGalleryRow2} alt="" loading="lazy" />
        <img className="h-64 w-48 object-cover" src={imgGalleryRow3} alt="" loading="lazy" />
      </div>

      <div className="absolute left-[8px] top-[1769px] w-96 bg-white pb-1 font-['Satoshi'] text-xl font-bold leading-6 text-black">
        To make personal wartime experiences accessible while preserving their emotional depth.
        <br />
        The project aims to create a space for connection,
        <br />
        where viewers can relate, reflect, and feel less alone.
      </div>

      <img
        className="absolute left-[-57px] top-[2010px] h-60 w-[516px] max-w-none object-cover"
        src={imgEmotion}
        alt=""
        loading="lazy"
      />

      <div className="absolute left-[8px] top-[2253px] inline-flex w-96 flex-col items-start justify-start">
        <div className="h-16 self-stretch justify-start font-['Clash_Grotesk'] text-4xl font-semibold text-black">
          Design choice{' '}
        </div>
        <div className="min-h-80 self-stretch justify-start font-['Satoshi'] text-base font-normal text-black">
          To transform raw wartime documentation into an accessible digital archive, I designed a time based navigation
          system. The interface allows users to filter content chronologically (by months and specific dates) while
          transitioning from a structured, macro level overview into an intimate, immersive view of individual diary
          entries.
          <br />
          <br />
          The UX challenges included balancing heavy media load with a seamless, intuitive browsing experience.
        </div>
      </div>

      {/* Wireframe: empty zinc band only (no image). */}
      <div className="absolute left-[-19px] top-[2691px] h-72 w-96 bg-zinc-300" aria-hidden />

      <div className="absolute left-[92.16px] top-[2805.39px] justify-start font-['Clash_Grotesk'] text-2xl font-bold text-black">
        wardiary_video1.mp4
      </div>

      <div className="absolute left-0 top-[3000px] h-[716px] w-96 bg-black" aria-hidden />

      <img
        className="absolute left-[41px] top-[3021px] h-52 w-80 object-cover"
        src={imgBlack1}
        alt=""
        loading="lazy"
      />
      <img
        className="absolute left-[41px] top-[3237.01px] h-52 w-80 object-cover"
        src={imgBlack2}
        alt=""
        loading="lazy"
      />
      <img
        className="absolute left-[41px] top-[3453.51px] h-52 w-80 object-cover"
        src={imgBlack3}
        alt=""
        loading="lazy"
      />

      <div className="absolute left-[11px] top-[4344px] justify-start font-['Clash_Grotesk'] text-4xl font-semibold text-black">
        Catalog{' '}
      </div>

      <div className="absolute left-[11px] top-[4401px] w-96 justify-start font-['Satoshi'] text-base font-normal text-black">
        The printed catalog translates the digital archive into a physical format. It preserves the same sense of
        intimacy allowing moments to be held, revisited, and experienced at a slower pace.
        <br />
        The sequence of images and texts creates a quiet rhythm, where each spread becomes a fragment of a larger
        narrative.
      </div>

      <img className="absolute left-0 top-[4584px] h-80 w-96 object-cover" src={imgCatalog} alt="" loading="lazy" />

      <div className="absolute left-[11px] top-[3742px] justify-start font-['Clash_Grotesk'] text-4xl font-semibold text-black">
        Full Website
      </div>

      {/* Wireframe: empty zinc only, no video. */}
      <div className="absolute left-0 top-[3818px] h-64 w-96 bg-zinc-300" aria-hidden />

      <div className="absolute left-[79px] top-[3935px] justify-start font-['Clash_Grotesk'] text-xl font-bold text-black">
        wardiary_video22-2.mp4
      </div>
    </div>
  );
}

export function MobileWarDiaryDetail({ onNextProject }: { onNextProject?: () => void }) {
  return (
    <ScaledFigmaCaseStudy
      designWidth={W}
      designHeight={H}
      innerClassName="bg-white"
      onNextProject={onNextProject}
    >
      <MobileWarDiaryArtboard />
    </ScaledFigmaCaseStudy>
  );
}
