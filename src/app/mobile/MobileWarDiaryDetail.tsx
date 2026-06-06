import { CLOUDINARY_ASSETS as C, CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';
import {
  MobileCaseStudyBody,
  MobileCaseStudyCopy,
  MobileCaseStudyHeading,
  MobileCaseStudyHero,
  MobileCaseStudyImage,
  MobileCaseStudyImageCarousel,
  MobileCaseStudyIntro,
  MobileCaseStudyMeta,
  MobileCaseStudyQuote,
  MobileCaseStudySection,
  MobileCaseStudyStack,
  MobileCaseStudyVideo,
} from './MobileCaseStudyLayout';

const imgOverview = C['baa51197c9d32d0b48a2e85d0a42bf14e6462dfb'];
const imgResearch = C['cfd7b1f5e90dffebe4b2a85038f4dc09ead87710'];
const imgGalleryLeft = C['f0d6b6967df287adfff81409accd73d3f8015af7'];
const imgGalleryMiddle =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756258/5c1c2f30e081cf6af41fdc76c18e71c45244275d_gmrmiw.jpg';
const imgGalleryRight =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756263/a6bbf11e62097685360dd84128d5d2ac402524cb_ubqlhg.jpg';
const imgEmotion =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756266/d814f663320e2e4fa2db0c78fda37a584fab5585_hks5b7.png';
const imgUiStripe = C.wardiary_ui_stripe;
const imgCatalog =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775811144/FullSizeRender_zhcvjj.png';

const warDiaryGalleryImages = [
  { src: imgGalleryLeft, alt: 'War Diary gallery' },
  { src: imgGalleryMiddle, alt: 'War Diary gallery' },
  { src: imgGalleryRight, alt: 'War Diary gallery' },
  { src: imgEmotion, alt: 'Diary pages' },
];

/**
 * War Diary — mobile-native vertical layout (same content & assets as desktop Frame297).
 */
export function MobileWarDiaryDetail({ onNextProject }: { onNextProject?: () => void }) {
  return (
    <MobileCaseStudyStack onNextProject={onNextProject}>
      <MobileCaseStudyHero
        videoSrc={CLOUDINARY_VIDEOS.wardiary_cover}
        title="WAR DIARY"
        subtitle="Shahar Dekel"
      />

      <MobileCaseStudyIntro>
        War Diary is an archival project based on photographs and texts by Shahar Dekel, a reserve tank soldier during
        the early stages of the Iron Swords War. Rather than portraying soldiers as heroes, the project focuses on the
        person behind the uniform the emotions, moments, and relationships within war. The project translates raw,
        personal documentation into a structured visual experience both as a digital archive and a printed catalog.
      </MobileCaseStudyIntro>

      <MobileCaseStudyMeta year="2025" client="Student Project" field="Web & Print" />

      <MobileCaseStudyImage src={imgOverview} alt="War Diary overview" />

      <MobileCaseStudyBody>
        This project explores the emotional experience of war focusing on memory, uncertainty, and repetition. Rather
        than documenting events, it reflects how moments are experienced, fragmented, and internalized by the people
        living them.
      </MobileCaseStudyBody>
      <MobileCaseStudyImage
        src={imgResearch}
        alt="War Diary research spread"
        aspect="square"
        objectPositionY={32}
      />

      <MobileCaseStudyQuote>
        To make personal wartime experiences accessible while preserving their emotional depth. The project aims to
        create a space for connection, where viewers can relate, reflect, and feel less alone.
      </MobileCaseStudyQuote>

      <MobileCaseStudyImageCarousel images={warDiaryGalleryImages} aspect="5/6" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>Design choice</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          To transform raw wartime documentation into an accessible digital archive, I designed a time based navigation
          system. The interface allows users to filter content chronologically (by months and specific dates) while
          transitioning from a structured, macro level overview into an intimate, immersive view of individual diary
          entries.
          <br />
          <br />
          The UX challenges included balancing heavy media load with a seamless, intuitive browsing experience.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>

      <MobileCaseStudyVideo src={CLOUDINARY_VIDEOS.wardiary_video1} />

      <MobileCaseStudyImageCarousel
        stripe={{
          src: imgUiStripe,
          slices: 3,
          alt: 'Website UI screen',
          panelAspectRatio: '4099/2763',
        }}
      />

      <MobileCaseStudyHeading>Full Website</MobileCaseStudyHeading>
      <MobileCaseStudyVideo src={CLOUDINARY_VIDEOS.wardiary_video22_2} />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>Catalog</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          The printed catalog translates the digital archive into a physical format. It preserves the same sense of
          intimacy allowing moments to be held, revisited, and experienced at a slower pace. The sequence of images and
          texts creates a quiet rhythm, where each spread becomes a fragment of a larger narrative.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgCatalog} alt="Printed catalog" />
    </MobileCaseStudyStack>
  );
}
