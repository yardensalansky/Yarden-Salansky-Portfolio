import { CLOUDINARY_ASSETS as C, CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';

const imgOverview = C['baa51197c9d32d0b48a2e85d0a42bf14e6462dfb'];
const imgResearch = C['cfd7b1f5e90dffebe4b2a85038f4dc09ead87710'];
const imgGalleryLeft = C['f0d6b6967df287adfff81409accd73d3f8015af7'];
const imgGalleryMiddle =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756258/5c1c2f30e081cf6af41fdc76c18e71c45244275d_gmrmiw.jpg';
const imgGalleryRight =
  'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756263/a6bbf11e62097685360dd84128d5d2ac402524cb_ubqlhg.jpg';
const imgEmotion = 'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756266/d814f663320e2e4fa2db0c78fda37a584fab5585_hks5b7.png';
const imgDesign = 'https://res.cloudinary.com/drqk65xwl/image/upload/v1775805100/S_D04554_1_zfjqc4.png';
const imgUiStripe = C.wardiary_ui_stripe;
const imgCatalog = 'https://res.cloudinary.com/drqk65xwl/image/upload/v1775811144/FullSizeRender_zhcvjj.png';

const warDiaryCover = CLOUDINARY_VIDEOS.wardiary_cover;
const warDiaryVideo1 = CLOUDINARY_VIDEOS.wardiary_video1;
const warDiaryVideo22_2 = CLOUDINARY_VIDEOS.wardiary_video22_2;

export default function Frame297() {
  return (
    <div className="w-[1400px] h-[8371px] relative bg-white overflow-hidden">
      <div className="w-[1400px] h-[496.82px] left-0 top-[-34px] absolute z-20 bg-zinc-300 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute left-1/2 top-1/2 block h-auto w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2"
          >
            <source src={warDiaryCover} />
          </video>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 [transform:translate3d(0,0,1px)] [backface-visibility:hidden]">
          <div className="left-[36px] top-[335.41px] absolute justify-start drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            <span className="text-white text-6xl font-bold font-['Clash_Grotesk'] tracking-[3.90px]">WAR DIARY<br/></span>
            <span className="text-white text-4xl font-medium font-['Clash_Grotesk'] tracking-widest">Shahar Dekel</span>
          </div>
        </div>
      </div>
      <div className="w-[1155px] h-96 left-[36px] top-[511.41px] absolute inline-flex flex-col justify-start items-start gap-16">
        <div className="w-[1089px] justify-start text-stone-950 text-2xl font-bold font-['Satoshi']">
          War Diary is an archival project based on photographs and texts by Shahar Dekel, a reserve tank soldier during
          the early stages of the Iron Swords War.
          <br />
          Rather than portraying soldiers as heroes, the project focuses on the person behind the uniform the emotions,
          moments, and relationships within war.
          <br />
          The project translates raw, personal documentation into a structured visual experience both as a digital archive
          and a printed catalog.
        </div>
        <div className="inline-flex justify-start items-center gap-20">
          <div className="w-24 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-neutral-500 text-2xl font-bold font-['Satoshi']">YEAR</div>
            <div className="self-stretch justify-start text-black text-3xl font-black font-['Satoshi']">2025</div>
          </div>
          <div className="w-72 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-neutral-500 text-2xl font-bold font-['Satoshi']">CLIENT</div>
            <div className="w-80 justify-start text-black text-3xl font-black font-['Satoshi']">Studential Project </div>
          </div>
          <div className="w-80 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-neutral-500 text-2xl font-bold font-['Satoshi']">DESIGHN FIELD </div>
            <div className="self-stretch justify-start text-black text-3xl font-black font-['Satoshi']">Web &amp; Print </div>
          </div>
        </div>
      </div>
      <img className="w-[1400px] h-[737.97px] left-0 top-[926px] absolute object-cover" src={imgOverview} alt="" />
      <img className="w-[547px] h-[622px] left-0 top-[1774px] absolute object-cover" src={imgResearch} alt="" />
      <div className="w-[636px] left-[589px] top-[1774px] absolute justify-start text-black text-2xl font-medium font-['Satoshi']">
        This project explores the emotional experience of war focusing on memory, uncertainty, and repetition.
        <br />
        Rather than documenting events, it reflects how moments are experienced, fragmented, and internalized by the
        people living them.
      </div>
      <div className="w-[1126px] left-[120px] top-[3092px] absolute text-center justify-start text-black text-4xl font-bold font-['Satoshi']">
        To make personal wartime experiences accessible while preserving their emotional depth.
        <br />
        The project aims to create a space for connection,
        <br />
        where viewers can relate, reflect, and feel less alone.
      </div>
      <img className="w-96 h-[491.56px] left-[678px] top-[2468px] absolute object-cover" src={imgGalleryMiddle} alt="" />
      <img className="w-[656px] h-[492px] left-0 top-[2467px] absolute object-cover" src={imgGalleryLeft} alt="" />
      <img className="w-96 h-[491.56px] left-[1068.67px] top-[2468px] absolute object-cover" src={imgGalleryRight} alt="" />
      <img className="w-[942px] h-96 left-[-87px] top-[4235px] absolute object-cover" src={imgEmotion} alt="" />
      <div className="w-[1400px] h-[1306px] left-0 top-[4793px] absolute bg-black" />
      <div className="absolute left-0 top-[3404px] h-[532px] w-[1400px] overflow-hidden">
        <img
          className="pointer-events-none absolute left-0 right-0 top-[-48px] h-[calc(100%+48px)] w-full object-cover"
          src={imgDesign}
          alt=""
        />
      </div>
      <div className="w-[568px] left-[736px] top-[4133px] absolute inline-flex flex-col justify-start items-start">
        <div className="self-stretch h-28 justify-start text-black text-6xl font-semibold font-['Clash_Grotesk']">Design choice </div>
        <div className="self-stretch h-[476px] justify-start text-black text-2xl font-normal font-['Satoshi']">
          The visual direction is inspired by an archival structure a way of organizing moments over time.
          <br />
          At first, it feels ordered and controlled, but as the viewer moves through it, a more personal layer is
          revealed.
          <br />
          <br />
          The experience creates a glimpse into someone else’s life allowing moments to be seen, read, and quietly
          understood. This proximity makes space for identification and emotional connection. The use of black and
          white follows the original photographic language, preserving its raw and unfiltered quality.
        </div>
      </div>
      <img
        className="pointer-events-none absolute left-0 top-[5752px] block h-auto w-full max-w-full"
        src={imgUiStripe}
        alt=""
      />
      <div className="w-[549px] left-[36px] top-[6722px] absolute justify-start text-black text-2xl font-normal font-['Satoshi']">
        The printed catalog translates the digital archive into a physical format. It preserves the same sense of
        intimacy allowing moments to be held, revisited, and experienced at a slower pace.
        <br />
        The sequence of images and texts creates a quiet rhythm, where each spread becomes a fragment of a larger
        narrative.
      </div>
      <div className="left-[36px] top-[6639px] absolute justify-start text-black text-6xl font-semibold font-['Clash_Grotesk']">Catalog </div>
      <div className="left-[36px] top-[7168px] absolute justify-start text-black text-6xl font-semibold font-['Clash_Grotesk']">Full Website</div>
      <img className="w-[682.98px] h-[765.39px] left-[717px] top-[6195px] absolute object-cover" src={imgCatalog} alt="" />
      <div className="w-[1225px] h-[792px] left-[89px] top-[4864px] absolute bg-zinc-300 overflow-hidden">
        <video autoPlay muted loop playsInline className="size-full object-cover">
          <source src={warDiaryVideo1} />
        </video>
      </div>
      <div className="w-[1225px] h-[792px] left-[87px] top-[7284px] absolute bg-zinc-300 overflow-hidden">
        <video
          muted
          loop
          playsInline
          className="size-full object-cover"
          onMouseEnter={(e) => {
            void e.currentTarget.play();
          }}
        >
          <source src={warDiaryVideo22_2} />
        </video>
      </div>
    </div>
  );
}