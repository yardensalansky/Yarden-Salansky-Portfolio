/**
 * War Diary case study — Figma: portfolio, node 158-1613 (dev mode).
 * https://www.figma.com/design/UnmXZsWbgy2Q26Io5ujQgf/portfolio?node-id=158-1613&m=dev
 */
import WarDiaryFigmaFrame from '../Frame297/Frame297';
import { ScaledDesktopCaseStudy } from '../../app/components/caseStudy/ScaledDesktopCaseStudy';
import { CASE_STUDY_ARTBOARD } from '../../app/components/caseStudy/caseStudyArtboards';

export interface WarDiaryDitailesProps {
  embedScrollParent?: boolean;
  onNextProject?: () => void;
}

export default function WarDiaryDitailes({
  embedScrollParent = false,
  onNextProject,
}: WarDiaryDitailesProps) {
  return (
    <ScaledDesktopCaseStudy
      artboardHeight={CASE_STUDY_ARTBOARD.warDiary}
      embedScrollParent={embedScrollParent}
      onNextProject={onNextProject}
    >
      <WarDiaryFigmaFrame />
    </ScaledDesktopCaseStudy>
  );
}
