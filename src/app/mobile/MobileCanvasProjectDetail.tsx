import { CloseCircleButton } from '../components/CloseCircleButton';
import type { MobileProjectId } from './mobileProjects';
import { MOBILE_PROJECTS } from './mobileProjects';
import { MobileAWeatherDetail } from './MobileAWeatherDetail';
import { MobileKiteRunnerDetail } from './MobileKiteRunnerDetail';
import { MobileTheOneDetail } from './MobileTheOneDetail';
import { MobileWarDiaryDetail } from './MobileWarDiaryDetail';

interface MobileCanvasProjectDetailProps {
  projectId: MobileProjectId;
  onClose: () => void;
  onNextProject?: () => void;
}

/** Mobile-native vertical case studies (same content as desktop, no Figma scale). */
function CaseStudyBody({
  projectId,
  onNextProject,
}: {
  projectId: MobileProjectId;
  onNextProject?: () => void;
}) {
  switch (projectId) {
    case 'proj1':
      return <MobileWarDiaryDetail onNextProject={onNextProject} />;
    case 'proj2':
      return <MobileAWeatherDetail onNextProject={onNextProject} />;
    case 'proj3':
      return <MobileKiteRunnerDetail onNextProject={onNextProject} />;
    case 'proj4':
      return <MobileTheOneDetail onNextProject={onNextProject} />;
    default:
      return null;
  }
}

/**
 * Full-screen mobile detail — vertical stack, full-width media, readable type.
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
      data-mobile-detail-panel
      className={`relative z-[25] flex h-[100dvh] w-full max-w-full flex-col overflow-hidden ${
        dark ? 'bg-black' : 'bg-white'
      }`}
      style={{ touchAction: 'pan-y' }}
    >
      <span id="mobile-detail-title" className="sr-only">
        {meta.title}
      </span>
      <CloseCircleButton
        size="lg"
        className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-50 touch-manipulation"
        onClick={onClose}
        aria-label="Close"
        title="Close"
      />
      <div
        className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain ${
          dark ? 'bg-black' : 'bg-white'
        }`}
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
      >
        <CaseStudyBody projectId={projectId} onNextProject={onNextProject} />
      </div>
    </article>
  );
}
