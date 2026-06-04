import React, { useEffect, useRef } from 'react';
import { CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';

const hero =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775817963/withtext2_sbjcyk.png';
const conceptFirst =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818067/Screenshot_2026-01-28_at_12.45.35_2_wkst7t.png';
const conceptLast =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818068/Screenshot_2026-01-28_at_12.54.45_2_xyttg9.png';
const experienceStill =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818126/Screenshot_2026-01-28_at_12.50.53_2_dodmdl.png';
/** Style frames section — ceramic tile composite (still). */
const styleFramesComposite =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775840518/Frame_297_kzvmkb.png';

export default function TheKiteRunnerDetiales() {
  const finalVideoWrapRef = useRef<HTMLDivElement>(null);
  const finalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = finalVideoWrapRef.current;
    const video = finalVideoRef.current;
    if (!wrap || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="relative h-[6316px] w-[1400px] max-w-full min-w-0 overflow-hidden bg-white"
      data-name="the kite runner detiales"
    >
      {/* Intro + metadata: under ~496px hero; equal space above/below headline; 10px above shell bottom (863px). */}
      <div className="absolute left-[31px] top-[496px] box-border flex h-[367px] w-[1159.52px] flex-col pb-[10px]">
        <div className="min-h-0 flex-1" aria-hidden />
        <div className="shrink-0 self-stretch justify-start font-['Satoshi'] text-5xl font-bold leading-[51.5px] text-black">
          This project presents an opening sequence for a series adaptation of The Kite Runner.
        </div>
        <div className="min-h-0 flex-1" aria-hidden />
        <div className="inline-flex shrink-0 -translate-y-[10px] items-center justify-start gap-20">
          <div className="inline-flex w-24 flex-col items-start justify-start gap-4">
            <div className="self-stretch justify-start font-['Satoshi'] text-2xl font-bold text-neutral-500">YEAR</div>
            <div className="self-stretch justify-start font-['Satoshi'] text-3xl font-black text-black">2026</div>
          </div>
          <div className="inline-flex w-64 flex-col items-start justify-start gap-4">
            <div className="self-stretch justify-start font-['Satoshi'] text-2xl font-bold text-neutral-500">CLIENT</div>
            <div className="self-stretch justify-start font-['Satoshi'] text-3xl font-black text-black">
              Student Project{' '}
            </div>
          </div>
          <div className="inline-flex w-72 flex-col items-start justify-start gap-4">
            <div className="self-stretch justify-start font-['Satoshi'] text-2xl font-bold text-neutral-500">
              DESIGN FIELD{' '}
            </div>
            <div className="self-stretch justify-start font-['Satoshi'] text-3xl font-black text-black">Motion</div>
          </div>
        </div>
      </div>

      <div className="absolute left-[31px] top-[1517px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-black">
        Inspiration
      </div>
      <div className="absolute left-[-10px] top-[1957px] z-[1] h-[524px] w-[1420px] overflow-hidden bg-black">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://res.cloudinary.com/drqk65xwl/image/upload/v1775840223/Screenshot_2026-04-10_at_19.53.12_pno2nv.png"
          alt=""
        />
      </div>
      <div className="absolute left-[31px] top-[2570px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-black">
        Concept
      </div>
      <div className="absolute left-[825px] top-[3487px] justify-start">
        <span className="font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-black">Experience</span>
        <span className="font-['Roboto'] text-6xl font-extrabold text-black"> </span>
      </div>

      <div className="absolute left-[31px] top-[3943px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-black">
        Style frames
      </div>
      <div className="absolute left-[31px] top-[5235px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-black">
        Final Video
      </div>

      <div className="absolute left-[31px] top-[1608px] w-[672px] justify-start font-['Satoshi'] text-2xl font-normal text-black">
        The visual language draws from Afghan ceramic tilework, found in both domestic spaces and religious architecture,
        such as the Blue Mosque.
        <br />
        At first, the tiles reflect order, beauty, and stability. As the sequence progresses, they begin to deteriorate
        becoming worn and fragmented.
        <br />
        This erosion gradually reveals what lies beneath: raw clay surfaces, inspired by the materiality of homes in
        Kabul.
      </div>

      <div className="absolute left-[31px] top-[2650px] w-[697px] justify-start">
        <span className="font-['Satoshi'] text-2xl font-bold text-black">
          Memory and Loss. What Once Was, and Is No More
          <br />
        </span>
        <span className="font-['Satoshi'] text-2xl font-normal text-black">
          The tiles act as both a visual and conceptual system.
          <br />
          They represent something structured and enduring, yet inherently fragile.
          <br />
          Their gradual erosion reflects the nature of memory, fading over time, becoming distorted, and remaining only in
          fragments.
          <br />
          Rather than telling a linear story, the sequence presents memory as something subjective blurred, layered, and
          emotionally charged.
        </span>
      </div>

      <div className="absolute left-[825px] top-[3581px] w-[533px] justify-start font-['Satoshi'] text-2xl font-medium text-black">
        The sequence moves from calm and harmony into subtle decay.
        <br />A slow pace allows the transformation to unfold gradually, while Afghan music introduces softness and
        restraint creating a contrast between visual deterioration and emotional control.
      </div>

      <div className="absolute left-[832px] top-[2582px] w-40 justify-start font-['Satoshi'] text-2xl font-medium text-black">
        First sense{' '}
      </div>
      <div className="absolute left-[834px] top-[2949px] w-40 justify-start font-['Satoshi'] text-2xl font-medium text-black">
        Last sense
      </div>

      <div className="absolute left-0 top-0 h-[496.28px] w-full max-w-[1400px] overflow-hidden bg-white">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={hero}
          alt="The Kite Runner"
        />
      </div>

      <img
        className="absolute left-[833.53px] top-[2627.95px] h-72 w-[508.88px] rounded-sm shadow-[0px_1.1974267959594727px_3.592280626296997px_0px_rgba(0,0,0,0.10)] shadow-[0px_0px_1.1974267959594727px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_0px_0.5987133979797363px_rgba(0,0,0,0.20)]"
        src={conceptFirst}
        alt=""
      />
      <img
        className="absolute left-[835.53px] top-[2993.42px] h-72 w-[505.31px] rounded-sm shadow-[0px_1.1974267959594727px_3.592280626296997px_0px_rgba(0,0,0,0.10)] shadow-[0px_0px_1.1974267959594727px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_0px_0.5987133979797363px_rgba(0,0,0,0.20)]"
        src={conceptLast}
        alt=""
      />

      <img
        className="absolute left-[48px] top-[3408px] h-96 w-[745.95px] rounded-sm shadow-[0px_1.1974267959594727px_3.592280626296997px_0px_rgba(0,0,0,0.10)] shadow-[0px_0px_1.1974267959594727px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_0px_0.5987133979797363px_rgba(0,0,0,0.20)]"
        src={experienceStill}
        alt=""
      />

      <div className="absolute left-[31px] top-[4030px] flex w-[1338px] justify-center">
        <img
          src={styleFramesComposite}
          alt="The Kite Runner style frames — ceramic tile composite"
          className="max-h-[1100px] w-full max-w-[1280px] rounded-sm object-contain"
        />
      </div>

      <div className="absolute left-[-4px] top-[986px] h-[454px] w-[1407px] overflow-hidden bg-zinc-300">
        <video autoPlay muted loop playsInline className="size-full object-cover object-top">
          <source src="https://res.cloudinary.com/drqk65xwl/video/upload/v1775768813/thekiterunner1_fnjtj8.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        ref={finalVideoWrapRef}
        className="absolute left-[94px] top-[5365px] h-[724px] w-[1211px] overflow-hidden rounded-md bg-zinc-300"
      >
        <video
          ref={finalVideoRef}
          controls
          playsInline
          preload="metadata"
          poster={styleFramesComposite}
          className="size-full object-cover object-center"
        >
          <source src={CLOUDINARY_VIDEOS.thekiterunner2} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
