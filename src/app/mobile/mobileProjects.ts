import { CLOUDINARY_ASSETS as C, CLOUDINARY_VIDEOS as V } from '../../constants/cloudinaryAssets';

export type MobileProjectId = 'proj1' | 'proj2' | 'proj3' | 'proj4';

export interface MobileProjectMeta {
  id: MobileProjectId;
  title: string;
  category: string;
  /** Thumbnail: video src or image src */
  coverVideo?: string;
  coverImage?: string;
  /** Line under the title on the detail hero (e.g. author or role). */
  subtitle: string;
  year: string;
  client: string;
  /** Shown in the metadata row (e.g. Web & Print). */
  designField: string;
  /** Opening copy above the metadata grid; each string is a paragraph. */
  introParagraphs: string[];
  /** Dark detail chrome for projects that use a black canvas below. */
  sheetTheme?: 'light' | 'dark';
}

export const MOBILE_PROJECTS: MobileProjectMeta[] = [
  {
    id: 'proj1',
    title: 'WAR DIARY',
    category: 'Web & print',
    coverVideo: V.wardiary_cover,
    subtitle: 'Shahar Dekel',
    year: '2025',
    client: 'Student Project',
    designField: 'Web & Print',
    introParagraphs: [
      'War Diary is an archival project based on photographs and texts by Shahar Dekel, a reserve tank soldier during the early stages of the Iron Swords War.',
      'Rather than portraying soldiers as heroes, the project focuses on the person behind the uniform the emotions, moments, and relationships within war.',
    ],
  },
  {
    id: 'proj2',
    title: 'A WEATHER',
    category: 'App',
    coverImage: C['aweather-bg-right'],
    subtitle: 'Student project',
    year: '2026',
    client: 'Student Project',
    designField: 'App',
    introParagraphs: [
      'A weather app inspired by Anna Wintour — designed to give clear direction instead of raw data.',
    ],
  },
  {
    id: 'proj3',
    title: 'THE KITE RUNNER',
    category: 'Motion',
    coverImage: C.thekiterunner_bg,
    subtitle: 'Opening sequence',
    year: '2026',
    client: 'Student Project',
    designField: 'Motion',
    introParagraphs: [
      'An opening sequence for a series adaptation — visual language drawn from Afghan ceramic tilework: order, beauty, then erosion and memory.',
    ],
  },
  {
    id: 'proj4',
    title: '(the) ONE',
    category: 'Website',
    coverImage: C['e082e465b1c842283a9dff49617174df4bc97f7d'],
    subtitle: 'Concept e-commerce',
    year: '2026',
    client: 'Student Project',
    designField: 'Website',
    introParagraphs: [
      'The One is not a collection. It is a decision. A conceptual luxury e-commerce experience inspired by Anna Wintour — built around a single product and a gatekeeper logic.',
    ],
    sheetTheme: 'dark',
  },
];
