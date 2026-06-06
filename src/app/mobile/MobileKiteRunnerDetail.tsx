import { CLOUDINARY_ASSETS as C, CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';
import {
  MobileCaseStudyCopy,
  MobileCaseStudyHeading,
  MobileCaseStudyHero,
  MobileCaseStudyImage,
  MobileCaseStudyIntro,
  MobileCaseStudyLabel,
  MobileCaseStudyMeta,
  MobileCaseStudySection,
  MobileCaseStudyStack,
  MobileCaseStudyVideo,
} from './MobileCaseStudyLayout';

const hero = C.thekiterunner_bg;
const inspirationStill =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775840223/Screenshot_2026-04-10_at_19.53.12_pno2nv.png';
const conceptFirst =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818067/Screenshot_2026-01-28_at_12.45.35_2_wkst7t.png';
const conceptLast =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818068/Screenshot_2026-01-28_at_12.54.45_2_xyttg9.png';
const experienceStill =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818126/Screenshot_2026-01-28_at_12.50.53_2_dodmdl.png';
const styleFramesComposite =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775840518/Frame_297_kzvmkb.png';

const video1 = 'https://res.cloudinary.com/drqk65xwl/video/upload/v1775768813/thekiterunner1_fnjtj8.mp4';

export function MobileKiteRunnerDetail({ onNextProject }: { onNextProject?: () => void }) {
  return (
    <MobileCaseStudyStack onNextProject={onNextProject}>
      <MobileCaseStudyHero imageSrc={hero} title="The Kite Runner" />

      <MobileCaseStudyIntro>
        This project presents an opening sequence for a series adaptation of The Kite Runner.
      </MobileCaseStudyIntro>

      <MobileCaseStudyMeta year="2026" client="Student Project" field="Motion" />

      <MobileCaseStudyVideo src={video1} />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>Inspiration</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          The visual language draws from Afghan ceramic tilework, found in both domestic spaces and religious architecture,
          such as the Blue Mosque. At first, the tiles reflect order, beauty, and stability. As the sequence progresses,
          they begin to deteriorate becoming worn and fragmented. This erosion gradually reveals what lies beneath: raw
          clay surfaces, inspired by the materiality of homes in Kabul.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={inspirationStill} alt="Ceramic tile inspiration" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>Concept</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          <span className="font-bold">Memory and Loss. What Once Was, and Is No More</span>
          <br />
          <br />
          The tiles act as both a visual and conceptual system. They represent something structured and enduring, yet
          inherently fragile. Their gradual erosion reflects the nature of memory, fading over time, becoming distorted,
          and remaining only in fragments. Rather than telling a linear story, the sequence presents memory as something
          subjective — blurred, layered, and emotionally charged.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>

      <MobileCaseStudySection className="gap-2">
        <MobileCaseStudyLabel>First sense</MobileCaseStudyLabel>
        <MobileCaseStudyImage src={conceptFirst} alt="First sense frame" />
      </MobileCaseStudySection>
      <MobileCaseStudySection className="gap-2">
        <MobileCaseStudyLabel>Last sense</MobileCaseStudyLabel>
        <MobileCaseStudyImage src={conceptLast} alt="Last sense frame" />
      </MobileCaseStudySection>

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>Experience</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          The sequence moves from calm and harmony into subtle decay. A slow pace allows the transformation to unfold
          gradually, while Afghan music introduces softness and restraint — creating a contrast between visual
          deterioration and emotional control.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={experienceStill} alt="Experience still" />

      <MobileCaseStudyHeading>Style frames</MobileCaseStudyHeading>
      <MobileCaseStudyImage src={styleFramesComposite} alt="Style frames composite" />

      <MobileCaseStudyHeading>Final Video</MobileCaseStudyHeading>
      <MobileCaseStudyVideo
        src={CLOUDINARY_VIDEOS.thekiterunner2}
        autoPlay={false}
        controls
        playWhenVisible
      />
    </MobileCaseStudyStack>
  );
}
