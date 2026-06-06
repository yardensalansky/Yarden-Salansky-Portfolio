import { CLOUDINARY_ASSETS as C, CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';
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
} from './MobileCaseStudyLayout';

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

export function MobileTheOneDetail({ onNextProject }: { onNextProject?: () => void }) {
  return (
    <MobileCaseStudyStack onNextProject={onNextProject} className="bg-black">
      <MobileCaseStudyHero imageSrc={imgHeroLaptop} title="(the) ONE" dark />

      <MobileCaseStudyIntro dark>
        The One is not a collection. It is a decision. A conceptual luxury e-commerce experience inspired by Anna
        Wintour.
      </MobileCaseStudyIntro>

      <MobileCaseStudyMeta year="2026" client="Student Project" field="Website" dark />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading dark>Concept</MobileCaseStudyHeading>
        <MobileCaseStudyCopy dark>
          An elite brand built around a single idea: perfection does not require options. A luxury e-commerce experience
          centered on one product — <span className="font-bold">The One.</span> A wig designed to define identity,
          presence, and control. The One is not a product. It is a gatekeeper. By placing the same form on iconic
          figures, the project suggests that identity is shaped by what is approved and recognized.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>

      <MobileCaseStudyImage src={imgAnnaWintourHair} alt="Anna Wintour" />
      <MobileCaseStudyCopy dark>
        Anna Wintour is widely recognized as a cultural gatekeeper shaping taste, identity, and status within the
        fashion industry. Her signature look became a symbol of authority, precision, and control.
      </MobileCaseStudyCopy>
      <MobileCaseStudyImage src={imgAnnaWintourPortrait} alt="Anna Wintour portrait" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading dark>Experience</MobileCaseStudyHeading>
        <MobileCaseStudyCopy dark>
          Access to The One is not always available. The experience begins with distance — users can only observe. Iconic
          figures appear throughout the site, suggesting a history shaped by The One. Only at specific moments does access
          open. Through the camera, the system determines alignment. Access is either granted or denied. Not everyone
          gets to belong.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgMonaLaptopMockup} alt="Experience screens" />
      <MobileCaseStudyImage src={imgClientsLaptopMockup} alt="Client selection flow" />
      <MobileCaseStudyImage src={imgExperiencePanelsStrip} alt="Experience panels" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading dark>Visual Language</MobileCaseStudyHeading>
        <MobileCaseStudyCopy dark>
          The visual language is minimal, controlled, and editorial. A restrained black-and-white palette creates a sense
          of distance, precision, and authority. Typography is dominant and directive. Close-up product imagery emphasizes
          detail and control.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgWigConstruction} alt="Wig construction detail" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading dark>Interaction</MobileCaseStudyHeading>
        <MobileCaseStudyCopy dark>
          The experience unfolds as a structured purchase journey from a single product selection to guided steps of
          customization and measurement. It concludes with a real-time facial verification — the outcome is binary,
          accepted or rejected.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgInteractionFlow} alt="Interaction flow" />
      <MobileCaseStudyVideo src={CLOUDINARY_VIDEOS.the_one_cover} />

      <MobileCaseStudyHeading dark>Becoming Iconic</MobileCaseStudyHeading>
      <MobileCaseStudyImage src={imgBecomingIconicGrid} alt="Becoming iconic grid" />

      <MobileCaseStudySection>
        <MobileCaseStudyHeading dark>The Edition</MobileCaseStudyHeading>
        <MobileCaseStudyCopy dark>
          This catalog functions as an archive, bringing together iconic figures redefined through The One. Each image
          preserves a moment where identity is shaped by a single, controlled form.
        </MobileCaseStudyCopy>
      </MobileCaseStudySection>
      <MobileCaseStudyImage src={imgTheEditionMagazineLeft} alt="Magazine cover" />
      <MobileCaseStudyImage src={imgTheEditionMagazineRight} alt="Magazine cover alternate" />

      <MobileCaseStudyQuote dark>
        What made them iconic was not who they were but what they wore.
      </MobileCaseStudyQuote>
    </MobileCaseStudyStack>
  );
}
