/**
 * The One case study — scales 1400×9936 artboard to the detail panel width (same pattern as War Diary).
 */
import FrameTheOne from '../TheOne/FrameTheOne';
import { ScaledDesktopCaseStudy } from '../../app/components/caseStudy/ScaledDesktopCaseStudy';
import { CASE_STUDY_ARTBOARD } from '../../app/components/caseStudy/caseStudyArtboards';

export interface TheOneDetialesProps {
  embedScrollParent?: boolean;
  onNextProject?: () => void;
  minScale?: number;
  mobileLayout?: boolean;
}

export default function TheOneDetiales({
  embedScrollParent = false,
  onNextProject,
  minScale,
  mobileLayout = false,
}: TheOneDetialesProps) {
  return (
    <ScaledDesktopCaseStudy
      artboardHeight={CASE_STUDY_ARTBOARD.theOne}
      backgroundClassName="bg-[#DAD7DE]"
      scaledSurfaceClassName="bg-black"
      embedScrollParent={embedScrollParent}
      onNextProject={onNextProject}
      minScale={minScale}
    >
      <FrameTheOne mobileLayout={mobileLayout} />
    </ScaledDesktopCaseStudy>
  );
}
