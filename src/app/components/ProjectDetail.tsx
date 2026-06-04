import WarDiaryDetails from '../../imports/WarDiaryDitailes/WarDiaryDitailes';
import AWeatherDetails from '../../imports/AWeatherDetials/AWeatherDetials';
import KiteRunnerDetails from '../../imports/TheKiteRunnerDetiales/TheKiteRunnerDetiales';
import TheOneDetiales from '../../imports/TheOneDetiales/TheOneDetiales';
import { CaseStudyDetailShell } from './caseStudy/CaseStudyDetailShell';
import { ScaledDesktopCaseStudy } from './caseStudy/ScaledDesktopCaseStudy';
import { CASE_STUDY_ARTBOARD } from './caseStudy/caseStudyArtboards';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaType: 'image' | 'video' | 'component';
  mediaUrl: string;
}

interface ProjectDetailProps {
  project: Project;
  isDarkMode: boolean;
  onNextProject?: () => void;
}

export function ProjectDetail({ project, onNextProject }: ProjectDetailProps) {
  switch (project.id) {
    case 'proj1':
      return (
        <CaseStudyDetailShell>
          <WarDiaryDetails onNextProject={onNextProject} />
        </CaseStudyDetailShell>
      );
    case 'proj2':
      return (
        <CaseStudyDetailShell>
          <ScaledDesktopCaseStudy
            artboardHeight={CASE_STUDY_ARTBOARD.aWeather}
            onNextProject={onNextProject}
          >
            <AWeatherDetails />
          </ScaledDesktopCaseStudy>
        </CaseStudyDetailShell>
      );
    case 'proj3':
      return (
        <CaseStudyDetailShell>
          <ScaledDesktopCaseStudy
            artboardHeight={CASE_STUDY_ARTBOARD.kiteRunner}
            onNextProject={onNextProject}
          >
            <KiteRunnerDetails />
          </ScaledDesktopCaseStudy>
        </CaseStudyDetailShell>
      );
    case 'proj4':
      return (
        <CaseStudyDetailShell backgroundColor="#000000">
          <TheOneDetiales onNextProject={onNextProject} />
        </CaseStudyDetailShell>
      );
    default:
      return null;
  }
}
