import type { MobileProjectId } from './mobileProjects';
import { MOBILE_PROJECTS } from './mobileProjects';
import { ScaledFigmaCaseStudy } from './ScaledFigmaCaseStudy';
import { MobileWarDiaryDetail } from './MobileWarDiaryDetail';
import AWeatherDetials from '../../imports/AWeatherDetials/AWeatherDetials';
import KiteRunnerDetails from '../../imports/TheKiteRunnerDetiales/TheKiteRunnerDetiales';
import TheOneDetiales from '../../imports/TheOneDetiales/TheOneDetiales';

interface MobileCanvasProjectDetailProps {
  projectId: MobileProjectId;
  onClose: () => void;
  onNextProject?: () => void;
}

/** Same case studies as desktop `ProjectDetail`, scaled to the card width (Figma pages use `ScaledFigmaCaseStudy`). */
function CaseStudyBody({
  projectId,
  embedScrollParent,
  onNextProject,
}: {
  projectId: MobileProjectId;
  embedScrollParent: boolean;
  onNextProject?: () => void;
}) {
  switch (projectId) {
    case 'proj1':
      return <MobileWarDiaryDetail onNextProject={onNextProject} />;
    case 'proj2':
      return (
        <ScaledFigmaCaseStudy
          designWidth={1400}
          designHeight={9343.56}
          innerClassName="bg-white"
          onNextProject={onNextProject}
        >
          <AWeatherDetials />
        </ScaledFigmaCaseStudy>
      );
    case 'proj3':
      return (
        <ScaledFigmaCaseStudy
          designWidth={1400}
          designHeight={6316}
          innerClassName="bg-white"
          onNextProject={onNextProject}
        >
          <KiteRunnerDetails />
        </ScaledFigmaCaseStudy>
      );
    case 'proj4':
      return (
        <TheOneDetiales embedScrollParent={embedScrollParent} onNextProject={onNextProject} />
      );
    default:
      return null;
  }
}

/**
 * Mobile detail shell: sticky close + one scroll area. Body matches web case studies (scaled), not custom mobile copies.
 */
export function MobileCanvasProjectDetail({
  projectId,
  onClose,
  onNextProject,
}: MobileCanvasProjectDetailProps) {
  const meta = MOBILE_PROJECTS.find((p) => p.id === projectId);
  if (!meta) return null;
  const dark = meta.sheetTheme === 'dark';

  return (
    <article
      role="dialog"
      aria-modal
      aria-labelledby="mobile-detail-title"
      className={`relative z-[25] flex min-h-0 w-full max-w-full flex-col overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.28)] ring-1 ${
        dark ? 'bg-[#DAD7DE] ring-white/15' : 'bg-white ring-black/[0.06]'
      }`}
      style={{
        maxHeight: 'min(92dvh, 880px)',
        borderRadius: 24,
        touchAction: 'pan-y',
      }}
    >
      <span id="mobile-detail-title" className="sr-only">
        {meta.title}
      </span>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg leading-none text-neutral-800 shadow-md touch-manipulation"
        aria-label="Close"
      >
        <span className="font-['Satoshi']" aria-hidden>
          ×
        </span>
      </button>
      <div
        className={`@container min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain ${
          dark ? 'bg-[#DAD7DE]' : 'bg-white'
        }`}
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
      >
        <CaseStudyBody
          projectId={projectId}
          embedScrollParent={true}
          onNextProject={onNextProject}
        />
      </div>
    </article>
  );
}
