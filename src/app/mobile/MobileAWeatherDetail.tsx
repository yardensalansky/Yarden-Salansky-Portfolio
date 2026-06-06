import {
  MobileCaseStudyCopy,
  MobileCaseStudyHeading,
  MobileCaseStudyHero,
  MobileCaseStudyImage,
  MobileCaseStudyIntro,
  MobileCaseStudyMeta,
  MobileCaseStudyQuote,
  MobileCaseStudySection,
  MobileCaseStudyStack,
  MobileCaseStudyVideo,
  MobileCaseStudyVideoStackCarousel,
} from './MobileCaseStudyLayout';

const imgHero =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756262/a1c461919ac351b16ef8b89ba52e98cc0c900b40_a3won7.png';
const imgOverview =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756263/125b366da89efc73ab1d3613a8eb253638a4a84c_jbqbpq.png';
const imgAnna =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775811884/Anna-Wintour-2_1_glp792.png';
const imgProblem =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756262/6979113f0c313021048259e9086293da245860fe_vnjby6.png';
const imgSolution =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756257/7ea8ae0c5f02d1ab87e06688297a8f1b9e1ca1b7_gjhlow.png';
const imgScreens =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775811958/Frame_290_1_babn7c.png';

/** Same phone frame sizes as desktop AWeatherDetials (w-64 / w-96), scaled for mobile. */
const aWeatherDemoVideos = [
  {
    src: 'https://res.cloudinary.com/drqk65xwl/video/upload/v1775768681/aweather1_ytdmer.mp4',
    aspectRatio: '256 / 568',
    maxWidthPx: 220,
    radiusPx: 30,
  },
  {
    src: 'https://res.cloudinary.com/drqk65xwl/video/upload/v1775768683/aweather2_kdx4mm.mp4',
    aspectRatio: '256 / 568',
    maxWidthPx: 220,
    radiusPx: 30,
  },
  {
    src: 'https://res.cloudinary.com/drqk65xwl/video/upload/v1775768691/aweather3_iqbrjn.mp4',
    aspectRatio: '256 / 568',
    maxWidthPx: 220,
    radiusPx: 30,
  },
];
const videoPrototype = 'https://res.cloudinary.com/drqk65xwl/video/upload/v1775768773/aweather4_kao4mf.mov';

export function MobileAWeatherDetail({ onNextProject }: { onNextProject?: () => void }) {
  return (
    <MobileCaseStudyStack onNextProject={onNextProject}>
      <MobileCaseStudyHero imageSrc={imgHero} title="A WEATHER" />

      <MobileCaseStudyIntro>
        A weather app inspired by Anna Wintour, designed to give clear direction instead of data.
      </MobileCaseStudyIntro>

      <MobileCaseStudyMeta year="2026" client="Student Project" field="App" />

      <MobileCaseStudyImage
        src={imgOverview}
        alt="A Weather billboard"
        aspectRatio="900 / 475"
        objectPositionY={46}
      />

      <MobileCaseStudyQuote>
        The app removes the need to interpret weather data. Instead, it delivers clear, authoritative direction telling
        the user exactly what to do.
      </MobileCaseStudyQuote>

      <MobileCaseStudyVideoStackCarousel videos={aWeatherDemoVideos} />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>Research</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          Anna Wintour was chosen as the main inspiration for her strong, authoritative editorial voice. Her approach is
          clear and decisive — information is not presented neutrally, but shaped into a statement. This principle is
          translated into the app: instead of presenting data, it delivers direction. The forecast is not something to
          interpret, but something that is clearly defined.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgAnna} alt="Anna Wintour inspiration" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>The Problem</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          Most weather apps present information as neutral data, creating overload and visual noise. Without a clear
          hierarchy or voice, users are left to interpret what actually matters.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgProblem} alt="Weather app problem" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>The Solution</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          <span className="font-bold">The app speaks in a clear, authoritative voice.</span> Using direct typography, it
          tells the user exactly what to take from the forecast without leaving room for interpretation. It doesn&apos;t
          suggest — it defines. An added voice layer, inspired by Anna Wintour, reinforces this sense of control and
          direction.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgSolution} alt="A Weather solution screens" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading>Design Approach</MobileCaseStudyHeading>
        <MobileCaseStudyCopy>
          The interface is driven by bold typography and strong hierarchy. Large, dominant text defines each screen, while
          supporting elements remain minimal and restrained. Color is used sparingly as a signal, reinforcing tone rather
          than adding decoration. The layout is highly controlled, with each screen focused on a single moment and message.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgScreens} alt="Design system screens" />

      <MobileCaseStudyHeading>Prototype</MobileCaseStudyHeading>
      <MobileCaseStudyVideo src={videoPrototype} />

      <MobileCaseStudyQuote>Hot today! Don&apos;t wear grey</MobileCaseStudyQuote>
    </MobileCaseStudyStack>
  );
}
