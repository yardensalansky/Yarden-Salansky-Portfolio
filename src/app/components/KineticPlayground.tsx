import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  useId,
  type ReactNode,
} from 'react';
import { Dice5 } from 'lucide-react';
import { CloseCircleButton } from './CloseCircleButton';
import { CurvedLine } from './CurvedLine';

/** Gutter between controller column and kinetic stage inside the play card. */
const PLAY_INTERNAL_GUTTER = 48;
/** Overlap so the internal connector tucks under both card edges (matches canvas connectors). */
const PLAY_INTERNAL_CONNECTOR_OVERLAP = 18;

type ThemeId =
  | 'collage'
  | 'pop'
  | 'spiral'
  | 'ribbons'
  | 'bubbles'
  | 'stacks'
  | 'river'
  | 'cascade'
  | 'modern'
  | 'vector'
  | 'raw'
  | 'blue'
  | 'flag';

interface PlayConfig {
  theme: ThemeId;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeight: number;
  rows: number;
  amplitude: number;
  frequency: number;
  animationSpeed: number;
  grainOpacity: number;
  halftoneOpacity: number;
  bgColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
}

type KineticPlayContextValue = {
  config: PlayConfig;
  noiseFilterId: string;
  updateConfig: <K extends keyof PlayConfig>(key: K, value: PlayConfig[K]) => void;
  applyPreset: (themeName: ThemeId) => void;
  randomize: () => void;
  renderCurrentTheme: () => React.ReactNode;
  onToggle: () => void;
};

const KineticPlayContext = createContext<KineticPlayContextValue | null>(null);

function useKineticPlay(): KineticPlayContextValue {
  const ctx = useContext(KineticPlayContext);
  if (!ctx) throw new Error('KineticPlayProvider (active) is required');
  return ctx;
}

const COLLAGE_FONTS = [
  { name: 'Impact', family: '"Arial Black", "Bebas Neue", sans-serif' },
  { name: 'Serif Bold', family: '"Playfair Display", serif' },
  { name: 'Mono', family: '"JetBrains Mono", monospace' },
  { name: 'Grotesk', family: '"Space Grotesk", sans-serif' },
];

const OFF_WHITE_PALETTES = [
  { h: 35, s: 8, l: 94 },
  { h: 210, s: 4, l: 95 },
  { h: 10, s: 7, l: 93 },
  { h: 50, s: 10, l: 92 },
  { h: 0, s: 0, l: 96 },
  { h: 160, s: 5, l: 94 },
];

const colorPalettes: { bg: string; text: string; accent: string }[] = [
  { bg: '#000000', text: '#ffffff', accent: '#ef4444' },
  { bg: '#3b82f6', text: '#ffffff', accent: '#facc15' },
  { bg: '#ec4899', text: '#000000', accent: '#ffffff' },
  { bg: '#00ff00', text: '#000000', accent: '#ffffff' },
  { bg: '#ffffff', text: '#2563eb', accent: '#f97316' },
  { bg: '#7c3aed', text: '#ffffff', accent: '#00ffff' },
  { bg: '#facc15', text: '#000000', accent: '#ef4444' },
  { bg: '#111827', text: '#00ffcc', accent: '#ff00ff' },
  { bg: '#fef08a', text: '#7c3aed', accent: '#f43f5e' },
];

const themesList: ThemeId[] = [
  'collage',
  'pop',
  'spiral',
  'ribbons',
  'bubbles',
  'stacks',
  'river',
  'cascade',
  'modern',
  'vector',
  'raw',
  'blue',
  'flag',
];

function CollageEffect({
  text,
  config,
  tick,
}: {
  text: string;
  config: PlayConfig;
  tick: number;
}) {
  const intensity = config.amplitude;
  const speed = 2 / Math.max(0.1, config.animationSpeed);
  const textScale = config.fontSize / 8;

  const shapeStyles = useMemo(() => {
    return text.split('').map(() => ({
      rotate: (Math.random() - 0.5) * 12,
      yOffset: (Math.random() - 0.5) * 10,
      xOffset: (Math.random() - 0.5) * 8,
      padX: 10 + Math.random() * 15,
      padY: 8 + Math.random() * 15,
      delay: Math.random() * -10,
      clipPoints: [
        `${Math.random() * 4}% ${Math.random() * 4}%`,
        `${96 + Math.random() * 4}% ${Math.random() * 4}%`,
        `${96 + Math.random() * 4}% ${96 + Math.random() * 4}%`,
        `${Math.random() * 4}% ${96 + Math.random() * 4}%`,
      ],
    }));
  }, [text]);

  const getLetterColor = (idx: number) => {
    const palette = OFF_WHITE_PALETTES[idx % OFF_WHITE_PALETTES.length];
    const h = palette.h + Math.sin(idx) * 5;
    const s = palette.s + Math.cos(idx) * 3;
    const l = palette.l + Math.sin(idx) * 2;
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  const words = text.split(' ');
  let charCounter = 0;

  return (
    <div
      className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-4 px-2 md:gap-x-3"
      style={{ perspective: '1500px' }}
    >
      {words.map((word, wordIdx) => (
        <div key={wordIdx} className="flex shrink-0 flex-nowrap items-center">
          {word.split('').map((char) => {
            const i = charCounter++;
            const s = shapeStyles[i];
            if (!s) return null;
            return (
              <div
                key={i}
                className="relative inline-flex shrink-0 items-center justify-center"
                style={{
                  transform: `translate(${s.xOffset * textScale + Math.sin(tick + s.delay) * 3}px, ${s.yOffset * textScale + Math.cos(tick + s.delay) * 3}px) rotate(${s.rotate}deg) scale(${textScale})`,
                  transformStyle: 'preserve-3d',
                  zIndex: 10,
                  transition: 'transform 0.1s linear',
                }}
              >
                <div
                  style={{
                    backgroundColor: getLetterColor(i),
                    fontFamily: COLLAGE_FONTS[0].family,
                    padding: `${s.padY}px ${s.padX}px`,
                    clipPath: `polygon(${s.clipPoints.join(',')})`,
                    animation: `kineticPaperFlutter ${speed}s ease-in-out ${s.delay}s infinite alternate`,
                    transformOrigin: 'top center',
                    ['--intensity' as string]: `${intensity / 2}deg`,
                  }}
                  className="relative flex items-center justify-center overflow-hidden text-black shadow-lg"
                >
                  <span className="relative z-10 block scale-y-105 font-black uppercase leading-none text-2xl md:text-5xl">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/30 opacity-25" />
                  <div className="pointer-events-none absolute inset-0 border border-black/5 mix-blend-multiply" />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const defaultConfig: PlayConfig = {
  theme: 'collage',
  fontSize: 8,
  fontWeight: 900,
  letterSpacing: -0.02,
  lineHeight: 0.9,
  rows: 177,
  amplitude: 26,
  frequency: 0.8,
  animationSpeed: 1,
  grainOpacity: 0.08,
  halftoneOpacity: 0.12,
  bgColor: '#ffffff',
  textColor: '#000000',
  accentColor: '#ef4444',
  fontFamily: '"Arial Black", Gadget, sans-serif',
};

/** Opening play mode: bubbles + scale 7.7 (per product default). */
function createOpeningPlayConfig(): PlayConfig {
  const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
  return {
    ...defaultConfig,
    theme: 'bubbles',
    fontSize: 7.7,
    rows: 8,
    amplitude: 40,
    frequency: 1.5,
    bgColor: palette.bg,
    textColor: palette.text,
    accentColor: palette.accent,
  };
}

function KineticPlayProviderActive({
  onToggle,
  children,
}: {
  onToggle: () => void;
  children: ReactNode;
}) {
  const noiseFilterId = useId().replace(/:/g, '');
  const [config, setConfig] = useState<PlayConfig>(() => createOpeningPlayConfig());

  const [tick, setTick] = useState(0);
  const DISPLAY_TEXT = "YARDEN'S PORTFOLIO";
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    let requestRef: number;
    const animate = () => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      setTick(elapsed * config.animationSpeed);
      requestRef = requestAnimationFrame(animate);
    };
    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, [config.animationSpeed]);

  const steppedTick = Math.floor(tick * 8) / 8;

  const updateConfig = <K extends keyof PlayConfig>(key: K, value: PlayConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (themeName: ThemeId) => {
    const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

    const presets: Partial<Record<ThemeId, Partial<PlayConfig>>> = {
      collage: { fontSize: 8, amplitude: 40, frequency: 1.0 },
      pop: { fontSize: 9, amplitude: 26, frequency: 1.2 },
      spiral: { fontSize: 2.2, rows: 177, amplitude: 10, frequency: 0.6 },
      river: { fontSize: 2, rows: 10, amplitude: 100, frequency: 0.8 },
      cascade: { fontSize: 3.5, amplitude: 60, frequency: 1.2 },
      bubbles: { fontSize: 7.7, rows: 8, amplitude: 40, frequency: 1.5 },
      stacks: { fontSize: 5, rows: 15, amplitude: 35, frequency: 1.2 },
      blue: { fontSize: 4.5, amplitude: 30, frequency: 0.5 },
      modern: { fontSize: 12, amplitude: 120, frequency: 2 },
      vector: { fontSize: 6.5, amplitude: 40, frequency: 1 },
      raw: { fontSize: 9, amplitude: 30, frequency: 1.5 },
      ribbons: { fontSize: 4.2, rows: 8, amplitude: 60, frequency: 1.2 },
      flag: { fontSize: 5.5, amplitude: 50, frequency: 1.2 },
    };

    const patch = presets[themeName];
    if (patch) {
      setConfig((prev) => ({
        ...prev,
        ...patch,
        theme: themeName,
        bgColor: palette.bg,
        textColor: palette.text,
        accentColor: palette.accent,
      }));
    }
  };

  const randomize = () => {
    const otherThemes = themesList.filter((t) => t !== config.theme);
    const newTheme = otherThemes[Math.floor(Math.random() * otherThemes.length)];
    const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

    setConfig((prev) => ({
      ...prev,
      theme: newTheme,
      fontSize: Math.random() * (10 - 4) + 4,
      rows: Math.floor(Math.random() * 15) + 6,
      amplitude: Math.random() * 150 + 20,
      frequency: Math.random() * 1.5 + 0.5,
      animationSpeed: Math.random() * 1.2 + 0.6,
      bgColor: palette.bg,
      textColor: palette.text,
      accentColor: palette.accent,
    }));
  };

  const getResponsiveFontSize = (base: number) =>
    `clamp(10px, ${base}vw, min(22vh, 120px))`;

  const renderPopArt = () => {
    const layerColors = [config.accentColor, '#fbbf24', '#f97316', '#22c55e', '#3b82f6'];
    const steps = 12;
    const intensity = config.amplitude / 14;
    const shadowLayers = Array.from({ length: steps })
      .map((_, i) => {
        const color = layerColors[Math.floor(i / (steps / layerColors.length))];
        return `${(i + 1) * intensity}px ${(i + 1) * intensity}px 0 ${color}`;
      })
      .join(', ');

    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-2">
        <div
          className="relative select-none text-center font-black uppercase italic leading-[0.8]"
          style={{
            fontSize: getResponsiveFontSize(config.fontSize),
            color: config.textColor,
            textShadow: shadowLayers,
            transform: `rotate(${-8 + Math.sin(steppedTick * 2) * 5}deg) translate3d(0, ${Math.sin(steppedTick * 4) * 15}px, 0)`,
            fontFamily: config.fontFamily,
          }}
        >
          {DISPLAY_TEXT.split(' ').map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </div>
      </div>
    );
  };

  const renderRiver = () => (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden [perspective:2000px]">
      <div
        className="flex flex-col gap-3"
        style={{ transform: 'rotateX(40deg) rotateZ(-10deg)', transformStyle: 'preserve-3d' }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="relative whitespace-nowrap px-6 py-2 font-black uppercase shadow-2xl"
            style={{
              background: i % 2 === 0 ? config.textColor : config.accentColor,
              borderRadius: '100px',
              transform: `translate3d(${Math.sin(steppedTick * 2 + i) * config.amplitude}px, 0, ${Math.cos(steppedTick * 2 + i) * 100}px)`,
              fontSize: getResponsiveFontSize(config.fontSize * 0.8),
              color: config.bgColor,
              fontFamily: config.fontFamily,
            }}
          >
            {DISPLAY_TEXT.repeat(4)}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpiral = () => (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="relative" style={{ transform: `translate3d(0,0,0) rotate(${steppedTick * 30}deg)` }}>
        {DISPLAY_TEXT.repeat(10)
          .split('')
          .slice(0, 177)
          .map((char, i) => {
            const angle = i * 0.22;
            const radius = 85 + (i * config.amplitude * 0.4) / 10;
            return (
              <div
                key={i}
                className="absolute select-none font-black uppercase"
                style={{
                  transform: `translate3d(${radius * Math.cos(angle)}px, ${radius * Math.sin(angle)}px, 0) rotate(${angle + Math.PI / 2}rad) translate(-50%, -50%)`,
                  fontSize: getResponsiveFontSize(config.fontSize * 0.6),
                  color: i % 2 === 0 ? config.textColor : config.accentColor,
                  fontFamily: config.fontFamily,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </div>
            );
          })}
      </div>
    </div>
  );

  const renderCascade = () => (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="whitespace-nowrap text-center font-black uppercase"
          style={{
            fontSize: getResponsiveFontSize(config.fontSize * 0.9),
            color: config.textColor,
            lineHeight: 0.7,
            transform: `translate3d(${Math.sin(steppedTick * 4 + i * 0.15) * config.amplitude}px, 0, 0)`,
            opacity: 1 - Math.abs(i - 20) / 25,
            fontFamily: config.fontFamily,
          }}
        >
          {DISPLAY_TEXT}
        </div>
      ))}
    </div>
  );

  const renderBubbles = () => (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {Array.from({ length: 6 }).map((_, r) => (
        <div
          key={r}
          className="mb-1 flex gap-1"
          style={{ transform: `translate3d(${Math.sin(steppedTick + r) * config.amplitude}px, 0, 0)` }}
        >
          {DISPLAY_TEXT.split('').map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-full border border-black/10 font-black shadow-lg"
              style={{
                width: `${config.fontSize * 0.6}vw`,
                height: `${config.fontSize * 0.6}vw`,
                minWidth: '28px',
                minHeight: '28px',
                backgroundColor: i % 2 === 0 ? config.textColor : config.accentColor,
                transform: `translate3d(0, ${Math.sin(steppedTick * 5 + i * 0.3) * 20}px, 0)`,
                fontSize: '1.2vw',
                color: config.bgColor,
                fontFamily: config.fontFamily,
              }}
            >
              {c}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderStacks = () => (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden [perspective:1200px]">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center border border-black/20 shadow-2xl"
          style={{
            width: '65%',
            height: '35%',
            transform: `translate3d(${i * 4}px, ${i * -4 + Math.sin(steppedTick * 3 + i * 0.1) * 30}px, 0) rotateX(20deg) rotateY(-10deg)`,
            zIndex: i,
            backgroundColor: i === 14 ? config.accentColor : config.textColor,
          }}
        >
          {i === 14 && (
            <div
              className="px-3 text-center text-2xl font-black uppercase italic md:text-4xl"
              style={{ color: config.bgColor, fontFamily: config.fontFamily }}
            >
              {DISPLAY_TEXT}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCurrentTheme = () => {
    switch (config.theme) {
      case 'collage':
        return <CollageEffect text={DISPLAY_TEXT} config={config} tick={tick} />;
      case 'pop':
        return renderPopArt();
      case 'river':
        return renderRiver();
      case 'cascade':
        return renderCascade();
      case 'spiral':
        return renderSpiral();
      case 'bubbles':
        return renderBubbles();
      case 'stacks':
        return renderStacks();
      case 'ribbons':
        return (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <div className="relative flex h-[150%] w-[150%] items-center justify-center">
              {Array.from({ length: 8 }).map((_, i) => {
                const isReverse = i % 2 === 0;
                const color = [config.textColor, config.accentColor, '#1a1a1a', config.bgColor][i % 4];
                const stripH = config.fontSize * 1.5;
                return (
                  <div
                    key={i}
                    className="absolute flex w-full items-center justify-center overflow-hidden shadow-2xl"
                    style={{
                      backgroundColor: color,
                      height: `${stripH}vw`,
                      transform: `rotate(${isReverse ? 25 : -25}deg) translateY(${Math.sin(steppedTick * 2 + i) * config.amplitude}px)`,
                      zIndex: i,
                    }}
                  >
                    <div
                      className="w-full whitespace-nowrap text-center font-black uppercase italic leading-none"
                      style={{
                        fontSize: `${config.fontSize * 0.9}vw`,
                        color:
                          color === '#ffffff' || color === '#facc15' || color === '#fef08a' ? '#000' : '#fff',
                        fontFamily: config.fontFamily,
                      }}
                    >
                      {DISPLAY_TEXT.repeat(5)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'modern':
        return (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <div
              className="flex flex-col items-center font-black uppercase"
              style={{
                transform: `skewX(${Math.sin(steppedTick) * 20}deg)`,
                color: config.textColor,
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden leading-none"
                  style={{
                    height: 'min(18vh, 72px)',
                    fontSize: `min(${config.fontSize * 1.5}vh, 56px)`,
                    transform: `scaleY(${1.5 + Math.sin(steppedTick * 3 + i) * 1.2})`,
                    fontFamily: config.fontFamily,
                  }}
                >
                  {DISPLAY_TEXT}
                </div>
              ))}
            </div>
          </div>
        );
      case 'vector':
        return (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            {DISPLAY_TEXT.split('').map((c, i) => {
              const x = i * 50 - DISPLAY_TEXT.length * 25;
              const y = Math.sin(steppedTick * 3 + i * 0.4) * config.amplitude;
              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center rounded-full border-2 font-mono"
                  style={{
                    width: '36px',
                    height: '36px',
                    transform: `translate3d(${x}px, ${y}px, 0)`,
                    color: config.textColor,
                    borderColor: config.textColor,
                    boxShadow: `0 0 15px ${config.accentColor}44`,
                    fontFamily: config.fontFamily,
                  }}
                >
                  {c}
                </div>
              );
            })}
          </div>
        );
      case 'raw':
        return (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4">
            <div className="flex max-w-full flex-wrap justify-center gap-2">
              {DISPLAY_TEXT.split(' ').map((word, wi) => (
                <div
                  key={wi}
                  className="px-3 py-1 text-3xl font-black shadow-2xl md:text-5xl"
                  style={{
                    backgroundColor: config.textColor,
                    color: config.bgColor,
                    transform: `rotate(${Math.sin(steppedTick + wi) * 20}deg) translate3d(0, ${Math.cos(steppedTick * 2 + wi) * 20}px, 0)`,
                    fontFamily: config.fontFamily,
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        );
      case 'blue':
        return (
          <div className="relative box-border flex h-full w-full items-center justify-center p-6 md:p-8">
            <div
              className="pointer-events-none absolute inset-6 opacity-10 md:inset-8"
              style={{
                backgroundImage: `linear-gradient(${config.textColor} 1px, transparent 1px), linear-gradient(90deg, ${config.textColor} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            <div
              className="relative box-border max-w-full border-4 px-6 py-5 text-center font-mono uppercase leading-tight tracking-[0.2em]"
              style={{
                fontSize: 'clamp(16px, 3.2vw, 48px)',
                color: config.textColor,
                borderColor: config.textColor,
                transform: `rotate(${Math.sin(steppedTick) * 5}deg)`,
                fontFamily: config.fontFamily,
              }}
            >
              {DISPLAY_TEXT.split(' ').map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </div>
          </div>
        );
      case 'flag':
        return (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <div className="flex scale-110 -rotate-[15deg] flex-col">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="whitespace-nowrap px-6 py-2 font-black uppercase"
                  style={{
                    backgroundColor: i % 2 === 0 ? config.textColor : config.bgColor,
                    color: i % 2 === 0 ? config.bgColor : config.textColor,
                    transform: `translate3d(${Math.sin(steppedTick * 3 + i * 0.5) * config.amplitude}px, 0, 0)`,
                    fontFamily: config.fontFamily,
                  }}
                >
                  {DISPLAY_TEXT.repeat(5)}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return renderPopArt();
    }
  };

  const value: KineticPlayContextValue = {
    config,
    noiseFilterId,
    updateConfig,
    applyPreset,
    randomize,
    renderCurrentTheme,
    onToggle,
  };

  return (
    <KineticPlayContext.Provider value={value}>
      {children}
    </KineticPlayContext.Provider>
  );
}

/** Mount only while `active` so RAF/state reset when closing play mode. */
export function KineticPlayProvider({
  active,
  onToggle,
  children,
}: {
  active: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  if (!active) return <>{children}</>;
  return <KineticPlayProviderActive onToggle={onToggle}>{children}</KineticPlayProviderActive>;
}

/** Left column: styles + motion controls (Canvas positions this beside the hero). */
export function KineticStylePanel() {
  const { config, applyPreset, randomize, updateConfig, onToggle } = useKineticPlay();

  return (
    <div
      className="box-border flex h-full min-h-0 w-full flex-1 flex-col gap-1 overflow-hidden rounded-2xl border border-black/10 bg-stone-100/98 py-1.5 pl-1.5 pr-1.5 font-['Clash_Grotesk'] text-[8px] leading-tight shadow-lg backdrop-blur-md [scrollbar-width:thin]"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex shrink-0 justify-end gap-1 border-b border-black/10 pb-1.5">
        <button
          type="button"
          onClick={randomize}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-sm hover:bg-[#1F1F1F] hover:text-white"
          title="Shuffle"
        >
          <Dice5 size={18} />
        </button>
        <CloseCircleButton
          size="sm"
          onClick={onToggle}
          className="shadow-sm hover:bg-black/5"
          title="Close play"
          aria-label="Close play"
        />
      </div>

      <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/45">
        Styles
      </span>
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
        <div className="flex flex-col gap-1 pb-0.5">
          {themesList.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => applyPreset(id)}
              className={`rounded-md border px-2 py-1.5 text-left text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] transition-colors ${
                config.theme === id
                  ? 'border-[#1F1F1F] bg-[#1F1F1F] text-white'
                  : 'border-black/10 bg-white text-black hover:border-black/25'
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <section className="shrink-0 space-y-1.5 rounded-md border border-black/10 bg-white/90 p-1.5">
        <div className="text-[8px] font-semibold uppercase tracking-widest text-black/50">Motion</div>
        <div className="space-y-1.5">
          <div className="space-y-0">
            <div className="flex justify-between text-[8px] text-black/40">
              <span>Spd</span>
              <span>{config.animationSpeed.toFixed(1)}×</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={3}
              step={0.1}
              value={config.animationSpeed}
              onChange={(e) => updateConfig('animationSpeed', parseFloat(e.target.value))}
              className="h-1 w-full accent-[#1F1F1F]"
            />
          </div>
          <div className="space-y-0">
            <div className="flex justify-between text-[8px] text-black/40">
              <span>Sz</span>
              <span>{config.fontSize.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={0.1}
              value={config.fontSize}
              onChange={(e) => updateConfig('fontSize', parseFloat(e.target.value))}
              className="h-1 w-full accent-[#1F1F1F]"
            />
          </div>
          <div className="space-y-0">
            <div className="flex justify-between text-[8px] text-black/40">
              <span>Pwr</span>
              <span>{config.amplitude}</span>
            </div>
            <input
              type="range"
              min={10}
              max={250}
              value={config.amplitude}
              onChange={(e) => updateConfig('amplitude', parseInt(e.target.value, 10))}
              className="h-1 w-full accent-[#1F1F1F]"
            />
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={randomize}
        className="flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-black/15 bg-[#1F1F1F] py-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-white transition hover:bg-black"
      >
        <Dice5 size={16} />
        Shuffle
      </button>
    </div>
  );
}

/** Full-bleed kinetic canvas inside the play station card. */
export function KineticHeroStage() {
  const { config, noiseFilterId, renderCurrentTheme, onToggle } = useKineticPlay();

  return (
    <div className="absolute inset-0 min-h-0 min-w-0 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-colors duration-500"
        style={{ backgroundColor: config.bgColor }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `radial-gradient(${config.textColor} 0.8px, transparent 0.8px)`,
          backgroundSize: '32px 32px',
          opacity: config.halftoneOpacity,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-overlay"
        style={{ opacity: config.grainOpacity }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id={noiseFilterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${noiseFilterId})`} />
        </svg>
      </div>
      <div className="absolute inset-0 z-[3] flex min-h-0 min-w-0 items-center justify-center overflow-hidden">
        {renderCurrentTheme()}
      </div>
      <CloseCircleButton
        className="absolute right-3 top-3 z-30"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label="Close play"
        title="Close play"
      />
      <p className="pointer-events-none absolute bottom-2 left-3 z-[4] select-none text-[7px] uppercase tracking-[0.2em] text-black/25">
        Yarden portfolio · kinetic
      </p>
      <style>{`
        @keyframes kineticPaperFlutter {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(var(--intensity)); }
        }
      `}</style>
    </div>
  );
}

/** Left play card (1100×650, same proportion as hero): style controls + kinetic stage. */
export function PlayStation() {
  const controllerWidth = 240;
  const connectorX1 = controllerWidth - PLAY_INTERNAL_CONNECTOR_OVERLAP;
  const connectorX2 =
    controllerWidth + PLAY_INTERNAL_GUTTER + PLAY_INTERNAL_CONNECTOR_OVERLAP;

  return (
    <div
      className="relative flex h-full w-full flex-row"
      style={{ gap: PLAY_INTERNAL_GUTTER }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <CurvedLine
            x1={connectorX1}
            y1={0}
            x2={connectorX2}
            y2={0}
            delay={0.12}
            color="#B8B8B8"
            strokeWidth={2.5}
            zIndex={0}
          />
        </div>
      </div>

      <div className="relative z-[1] h-full shrink-0" style={{ width: controllerWidth }}>
        <KineticStylePanel />
      </div>
      <div className="relative z-[1] min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl shadow-lg">
        <KineticHeroStage />
      </div>
    </div>
  );
}
