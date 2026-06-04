import { CLOUDINARY_ASSETS as C, CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';

const imgHeroLaptop = C['b8e3ace9f5d57894a1227e35141bfe826f271e65'];
const imgAnnaWintourHair = C['5155ceaabfc631a0539ce1b4e9083b46655a595d'];
const imgAnnaWintourPortrait = C['056c91d0f948222c652672bdc048a5121049d045'];
const imgMonaLaptopMockup = C['ef47cad5a101404f08477acf4eb31b6148bb5433'];
const imgClientsLaptopMockup = C['f9dd11b5b9abdf2778bce6461ec2e448f87e975f'];
const imgWigConstruction = C['762de0df8b6134790626da81b2cbb657cdedabed'];
const imgExperiencePanelsStrip = C.theone_experience_panels;
const imgBecomingIconicGrid = C.theone_becoming_iconic_grid;
const imgInteractionFlow = C.theone_interaction_flow;
const imgTheEditionMagazineLeft = C.theone_edition_magazine_left;
const imgTheEditionMagazineRight = C.theone_edition_magazine_right;

/**
 * The One case study — 1400×9936 artboard (Figma export).
 */
export default function FrameTheOne() {
  return (
    <div className="relative h-[9936px] w-[1400px] overflow-hidden bg-black">
      <div className="absolute left-[-14px] top-[8619.86px] h-[822px] w-[1414px] bg-zinc-300" />
      {/* Intro + metadata: same layout as Kite Runner (504px hero → 863px shell). */}
      <div className="absolute left-[31px] top-[504px] box-border flex h-[359px] w-[1159.52px] flex-col pb-[10px]">
        <div className="min-h-0 flex-1" aria-hidden />
        <div className="shrink-0 self-stretch justify-start font-['Satoshi'] text-5xl font-bold leading-[51.5px] text-white">
          The One is not a collection. It is a&nbsp;decision.
          <br />
          A conceptual luxury e-commerce experience inspired by Anna&nbsp;Wintour.
        </div>
        <div className="min-h-0 flex-1" aria-hidden />
        <div className="inline-flex shrink-0 -translate-y-[10px] items-center justify-start gap-20">
          <div className="inline-flex w-24 flex-col items-start justify-start gap-4">
            <div className="justify-start self-stretch font-['Satoshi'] text-2xl font-bold text-neutral-500">YEAR</div>
            <div className="justify-start self-stretch font-['Satoshi'] text-3xl font-black text-white">2026</div>
          </div>
          <div className="inline-flex w-72 flex-col items-start justify-start gap-4">
            <div className="justify-start self-stretch font-['Satoshi'] text-2xl font-bold text-neutral-500">CLIENT</div>
            <div className="justify-start self-stretch font-['Satoshi'] text-3xl font-black text-white">
              Student Project{' '}
            </div>
          </div>
          <div className="inline-flex w-80 flex-col items-start justify-start gap-4">
            <div className="justify-start self-stretch font-['Satoshi'] text-2xl font-bold text-neutral-500">
              DESIGN FIELD{' '}
            </div>
            <div className="justify-start self-stretch font-['Satoshi'] text-3xl font-black text-white">Website</div>
          </div>
        </div>
      </div>
      <div className="absolute left-[672px] top-[1208px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-white">
        Concept
      </div>
      <div className="absolute left-[31px] top-[3001px] justify-start font-['Clash_Grotesk'] text-6xl font-bold tracking-[0.12em] text-white">
        Experience
      </div>
      <div className="absolute left-[715px] top-[4001px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-white">
        Visual Language
      </div>
      <div className="absolute left-[31px] top-[7120.86px] z-10 justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-white">
        Interaction
      </div>
      <div className="absolute left-[31px] top-[8664.86px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-black">
        The Edition{' '}
      </div>
      <div className="absolute left-[117px] top-[9629px] w-[1167px] justify-start text-center font-['Clash_Grotesk'] text-5xl font-semibold text-white">
        What made them iconic was not who they were but what they wore.
      </div>
      <div className="absolute left-[672px] top-[1290px] w-[639px] justify-start">
        <span className="font-['Satoshi'] text-2xl font-normal text-white">
          An elite brand built around a single idea: perfection does not require options.
          <br />
          A luxury e-commerce experience centered on one product{' '}
        </span>
        <span className="font-['Satoshi'] text-2xl font-bold text-white">The One.</span>
        <span className="font-['Satoshi'] text-2xl font-normal text-white">
          {' '}
          A wig designed to define identity, presence, and control.
          <br />
          The One&nbsp;is not a product. It is a gatekeeper.
          <br />
          By placing the same form on iconic figures, the project suggests that identity is shaped by what is approved
          and recognized. Becoming iconic is not a choice. It is granted.
        </span>
      </div>
      <div className="absolute left-[31px] top-[3083px] w-[690px] justify-start font-['Satoshi'] text-2xl font-normal text-white">
        Access to&nbsp;The One&nbsp;is not always available.
        <br />
        The experience begins with distance users can only observe.
        <br />
        Iconic figures appear throughout the site, suggesting a history shaped by&nbsp;The One, and creating a quiet
        desire to belong.
        <br />
        The product is presented with precision and restraint, but remains out of reach.
        <br />
        Only at specific moments does access open. The user is then allowed to enter the purchase flow moving from
        selection to a final act of verification.
        <br />
        Through the camera, the system determines alignment.
        <br />
        Access is either granted or denied.
        <br />
        Not everyone gets to belong.
      </div>
      <div className="absolute left-[715px] top-[4083px] w-[652px] justify-start font-['Satoshi'] text-2xl font-normal text-white">
        The visual language is minimal, controlled, and editorial.
        <br />
        A restrained black-and-white palette creates a sense of distance, precision, and authority.
        <br />
        Typography is dominant and directive, establishing a clear hierarchy. Close-up product imagery emphasizes detail
        and control. Images of cultural figures act as anchors within the system, establishing hierarchy and status.
        <br />
        The repeated form suggests that iconic presence is not inherent but assigned.
      </div>
      <div className="absolute left-[31px] top-[7216.86px] z-10 w-[638px] justify-start font-['Satoshi'] text-[25px] font-normal leading-normal text-white">
        The experience unfolds as a structured purchase journey from a single product selection to guided steps of
        customization and measurement.
        <br />
        It concludes with a real-time facial verification, where the user is evaluated as a candidate rather than a
        customer.
        <br />
        The outcome is binary, accepted or rejected, reinforcing a system of control and exclusivity.
      </div>
      <div className="pointer-events-none absolute left-[27px] top-[7434px] z-0 flex h-[540px] w-[1357px] items-center justify-center bg-black">
        <img
          alt=""
          src={imgInteractionFlow}
          className="max-h-full max-w-full object-contain object-center"
        />
      </div>
      <div className="absolute left-[265px] top-[7982px] z-10 w-48 justify-start font-['Satoshi'] text-2xl font-bold text-white">
        Real live camera
      </div>
      <div className="absolute left-[31px] top-[8762.86px] w-[638px] justify-start font-['Satoshi'] text-2xl font-normal text-black">
        This catalog functions as an archive, bringing together iconic figures redefined through&nbsp;The One. Each
        image preserves a moment where identity is shaped by a single, controlled form.
      </div>
      <div className="absolute left-[970px] top-[2202px] w-80 justify-start font-['Satoshi'] text-2xl font-normal text-white">
        Anna Wintour is widely recognized as a cultural gatekeeper shaping taste, identity, and status within the fashion
        industry.
        <br />
        Her signature look became a symbol of authority, precision, and control.
      </div>
      <div className="absolute left-[192.96px] top-[7756.43px] h-0 w-2 origin-top-left rotate-[90.33deg] bg-stone-200/0 outline outline-[1.59px] outline-offset-[-0.80px] outline-stone-200/0" />
      <div className="absolute left-[194.98px] top-[7754.39px] h-0 w-3 origin-top-left rotate-90 bg-stone-200/0 outline outline-[1.59px] outline-offset-[-0.80px] outline-stone-200/0" />
      <div className="absolute left-[199.11px] top-[7752.34px] h-0 w-4 origin-top-left rotate-90 bg-stone-200/0 outline outline-[1.59px] outline-offset-[-0.80px] outline-stone-200/0" />
      <div className="absolute left-[172.67px] top-[7756.07px] h-3 w-3 border-[1.59px] border-stone-200/0 bg-stone-200/0" />
      <img
        alt=""
        src={imgAnnaWintourHair}
        className="pointer-events-none absolute left-[2px] top-[1040px] h-[760px] w-[670px] object-cover object-top"
      />
      <img
        alt=""
        src={imgMonaLaptopMockup}
        className="pointer-events-none absolute left-[454px] top-[2945px] h-[670px] w-[974px] object-cover object-center"
      />
      <div className="absolute left-[31px] top-[1961px] justify-start font-['Clash_Grotesk'] text-9xl font-semibold leading-[115.20px] text-white">
        ANNA <br />
        WINTOUR
      </div>
      <img
        alt=""
        src={imgAnnaWintourPortrait}
        className="pointer-events-none absolute left-[31px] top-[2210px] h-[607px] w-[910px] object-cover object-center"
      />
      <div className="absolute left-0 top-[3879px] h-[485px] w-[610px] overflow-hidden">
        <img
          alt=""
          src={imgWigConstruction}
          className="pointer-events-none absolute left-0 top-0 h-[485px] w-[610px] object-cover object-center"
        />
      </div>
      <img
        alt=""
        src={imgClientsLaptopMockup}
        className="pointer-events-none absolute left-[530px] top-[3110px] h-[719px] w-[1039px] object-cover object-center"
      />
      <div className="absolute left-[15.44px] top-[4941.47px] h-[499.73px] w-[543.19px] bg-black" />
      <div className="absolute left-[-13px] top-[5041px] h-96 w-[572px] bg-white" />
      <div className="absolute left-[559px] top-[5041px] h-96 w-[847px] bg-white" />
      <div className="absolute left-[558.76px] top-[5051.48px] h-96 w-[854px] bg-black" />
      <div className="absolute left-[559px] top-[5441.2px] h-80 w-[854px] bg-white" />
      <div className="absolute left-[-13px] top-[5441.2px] h-80 w-[882px] bg-white" />
      <div className="absolute left-[559px] top-[5441.2px] h-72 w-96 bg-black" />
      <div className="absolute left-[76.28px] top-[5466.86px] justify-start text-center font-['Bai_Jamjuree'] text-8xl font-semibold leading-[138.69px] text-black">
        Colors
      </div>
      <div className="absolute left-[76.28px] top-[5155.85px] justify-start text-center font-['Bai_Jamjuree'] text-[223.50px] font-semibold leading-[285.32px] text-black">
        Aa
      </div>
      <div className="absolute left-[661px] top-[5088px] inline-flex w-64 flex-col items-start justify-start">
        <div className="justify-start self-stretch font-['Avenir'] text-6xl font-extrabold leading-[80.06px] text-white">
          Avneir
        </div>
        <div className="justify-start self-stretch text-center font-['Avenir'] text-sm font-extrabold leading-5 text-white">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
        <div className="justify-start self-stretch font-['Avenir'] text-sm font-extrabold leading-5 text-white">
          abcdefghijklmnopqrstuvwxyz
        </div>
      </div>
      <div className="absolute left-[661px] top-[5246px] inline-flex w-96 flex-col items-start justify-start">
        <div className="justify-start self-stretch font-['Bai_Jamjuree'] text-6xl font-bold leading-[80.06px] text-white">
          Bai Jamjuree
        </div>
        <div className="justify-start self-stretch font-['Bai_Jamjuree'] text-sm font-normal leading-5 text-white">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
        <div className="justify-start self-stretch font-['Bai_Jamjuree'] text-sm font-normal leading-5 text-white">
          abcdefghijklmnopqrstuvwxyz
        </div>
        <div className="justify-start self-stretch font-['Bai_Jamjuree'] text-sm font-normal leading-5 text-white">
          0123456789()
        </div>
      </div>
      <div className="absolute left-[1223px] top-[5731.2px] h-24 w-72 origin-top-left -rotate-90 bg-orange-300" />
      <div className="absolute left-[1314px] top-[5731.2px] h-24 w-72 origin-top-left -rotate-90 bg-red-700" />
      <div className="absolute left-[31px] top-[4925px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[0.12em] text-white">
        Style Guide
      </div>
      <div className="absolute left-[31px] top-[6049px] justify-start font-['Satoshi'] text-[25px] font-normal leading-normal text-white">
        Becoming Iconic
      </div>
      <img
        alt=""
        src={imgBecomingIconicGrid}
        className="pointer-events-none absolute left-[90px] top-[6173px] h-[818px] w-[1231px] object-cover object-center"
      />
      <video
        aria-hidden={true}
        className="pointer-events-none absolute left-[261px] top-[8026px] z-0 h-[518.44px] w-[851px] object-cover object-center"
        src={CLOUDINARY_VIDEOS.the_one_cover}
        autoPlay
        loop
        muted
        playsInline
      />
      <img
        className="absolute left-[232px] top-[8925.86px] h-[456px] w-80 object-cover object-center"
        src={imgTheEditionMagazineLeft}
        alt="(the) ONE magazine cover"
      />
      <img
        className="absolute left-[706px] top-[8925.86px] h-[456px] w-80 object-cover object-center"
        src={imgTheEditionMagazineRight}
        alt="(the) ONE magazine cover, alternate edition"
      />
      <div className="absolute left-0 top-0 h-[504px] w-[1420.22px]">
        <div className="absolute left-0 top-0 h-[504px] w-[1420.22px] overflow-hidden bg-black">
          <div className="absolute left-[56px] top-[392px] justify-start font-['Hiragino_Kaku_Gothic_Std'] text-5xl font-extrabold text-black">
            A WEATHER
          </div>
          <img
            alt=""
            src={imgHeroLaptop}
            className="pointer-events-none absolute left-0 top-[-198px] h-[899px] w-[1396px] max-w-none object-cover"
          />
        </div>
        <div className="absolute left-[31px] top-[386px] w-[549px] justify-start font-['Clash_Grotesk'] text-6xl font-semibold tracking-[4.8px] text-white">
          (the) ONE
        </div>
      </div>
      <img
        alt=""
        src={imgExperiencePanelsStrip}
        className="pointer-events-none absolute left-[13px] top-[4498px] h-72 w-[1393px] object-cover object-center"
      />
    </div>
  );
}
