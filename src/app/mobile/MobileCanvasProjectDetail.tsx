import { Home } from 'lucide-react';
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
  onHome: () => void;
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
  onHome,
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
      <div className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex flex-col gap-2">
        <CloseCircleButton
          size="lg"
          className="touch-manipulation"
          onClick={onClose}
          aria-label="Close"
          title="Close"
        />
        <button
          type="button"
          onClick={onHome}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white/92 text-black shadow-md backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 touch-manipulation"
          aria-label="Home — back to first screen"
          title="Home"
        >
          <Home size={20} strokeWidth={2.25} className="block shrink-0" aria-hidden />
        </button>
      </div>
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
