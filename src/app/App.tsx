import { Canvas } from './components/Canvas';
import { MobileApp } from './mobile/MobileApp';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function App() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return isMobile ? <MobileApp /> : <Canvas />;
}
