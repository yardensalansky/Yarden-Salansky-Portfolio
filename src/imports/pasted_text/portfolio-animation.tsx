import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Settings2, X, Dice5, Sparkles
} from 'lucide-react';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [config, setConfig] = useState({
    theme: 'spiral', 
    fontSize: 2.5,
    fontWeight: 900,
    letterSpacing: 0.1,
    lineHeight: 1,
    rows: 177,             
    amplitude: 100,        
    frequency: 0.5,        
    animationSpeed: 1,
    grainOpacity: 0.08,    
    halftoneOpacity: 0.1, 
    bgColor: '#000000',
    textColor: '#ffffff',
    accentColor: '#ef4444',
    fontFamily: 'sans-serif',
  });

  const [tick, setTick] = useState(0);
  const DISPLAY_TEXT = "YARDEN'S PORTFOLIO";
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    let requestRef;
    const animate = () => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      setTick(elapsed * config.animationSpeed);
      requestRef = requestAnimationFrame(animate);
    };
    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, [config.animationSpeed]);

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (themeName) => {
    const funColors = [
      { bg: '#000000', text: '#ffffff', accent: '#ef4444' }, 
      { bg: '#ffffff', text: '#2563eb', accent: '#facc15' }, 
      { bg: '#ef4444', text: '#ffffff', accent: '#000000' }, 
      { bg: '#1a1a1a', text: '#00ff00', accent: '#ffffff' }, 
      { bg: '#7c3aed', text: '#ffffff', accent: '#fbbf24' }, 
      { bg: '#facc15', text: '#000000', accent: '#ffffff' }, 
      { bg: '#0000ff', text: '#ffffff', accent: '#ff00ff' }, 
    ];
    
    const randomColor = funColors[Math.floor(Math.random() * funColors.length)];

    const presets = {
      tunnel: { fontSize: 1.5, rows: 12, frequency: 0.4 },
      spiral: { fontSize: 2, rows: 177, amplitude: 8, frequency: 0.6 },
      river: { fontSize: 2, rows: 10, amplitude: 100, frequency: 0.8 },
      cascade: { fontSize: 3.5, amplitude: 60, frequency: 1.2 },
      interwoven: { fontSize: 3.2, rows: 14, amplitude: 70, frequency: 1 },
      bubbles: { fontSize: 3.2, rows: 8, amplitude: 40, frequency: 1.5 },
      stacks: { fontSize: 5, rows: 15, amplitude: 30, frequency: 1.2 },
      pop: { fontSize: 10, amplitude: 20, frequency: 1.2 },
      blue: { fontSize: 4, amplitude: 30, frequency: 0.5 },
      modern: { fontSize: 12, amplitude: 120, frequency: 2 },
      vector: { fontSize: 6, amplitude: 40, frequency: 1 },
      raw: { fontSize: 9, amplitude: 30, frequency: 1.5 },
      boost: { fontSize: 8, amplitude: 100, frequency: 2 },
      ribbons: { fontSize: 4, rows: 8, amplitude: 60, frequency: 1.2 },
      flow: { fontSize: 3, rows: 10, amplitude: 20, frequency: 1.5 },
      flag: { fontSize: 5, amplitude: 50, frequency: 1.2 }
    };

    if (presets[themeName]) {
      setConfig(prev => ({ 
        ...prev, 
        ...presets[themeName], 
        theme: themeName,
        bgColor: randomColor.bg,
        textColor: randomColor.text,
        accentColor: randomColor.accent
      }));
    }
  };

  const randomize = () => {
    const themes = ['tunnel', 'river', 'cascade', 'spiral', 'interwoven', 'bubbles', 'ribbons', 'flow', 'flag', 'boost', 'pop', 'blue', 'modern', 'vector', 'raw', 'stacks'];
    const palette = ['#ef4444', '#2563eb', '#facc15', '#000000', '#ffffff', '#7c3aed', '#00ff00', '#ff00ff'];
    const randomHex = () => palette[Math.floor(Math.random() * palette.length)];
    
    setConfig({
      theme: themes[Math.floor(Math.random() * themes.length)],
      fontSize: Math.random() * (7 - 2) + 2,
      rows: Math.floor(Math.random() * 15) + 6,
      amplitude: Math.random() * 150 + 20,
      frequency: Math.random() * 1.5 + 0.2,
      animationSpeed: Math.random() * 1.2 + 0.6,
      bgColor: randomHex(),
      textColor: randomHex(),
      accentColor: randomHex(),
      fontFamily: 'sans-serif',
      grainOpacity: 0.08,
      halftoneOpacity: 0.1,
      fontWeight: 900,
      letterSpacing: 0.1,
      lineHeight: 1
    });
  };

  const getResponsiveFontSize = (base) => `clamp(10px, ${base}vw, 15vh)`;

  // --- Renderers ---

  const renderTunnel = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => {
        const progress = (i / 12 + (tick * 0.2)) % 1;
        const scale = Math.pow(progress, 3) * 7;
        if (scale < 0.01) return null;
        return (
          <div key={i} className="absolute border border-current flex items-center justify-center pointer-events-none" style={{ width: `${scale * 100}vh`, height: `${scale * 100}vh`, color: config.textColor, opacity: 1 - progress, borderWidth: `${Math.max(1, scale)}px`, transform: `translate3d(0,0,0) rotate(${tick * 10}deg)` }}>
            {[0, 90, 180, 270].map(deg => (
              <div key={deg} className="absolute font-black uppercase whitespace-nowrap" style={{ transform: `rotate(${deg}deg) translateY(-${scale * 48}vh)`, fontSize: getResponsiveFontSize(config.fontSize * scale) }}>{DISPLAY_TEXT}</div>
            ))}
          </div>
        );
      })}
    </div>
  );

  const renderRiver = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden [perspective:2000px]">
      <div className="flex flex-col gap-4" style={{ transform: 'rotateX(40deg) rotateZ(-10deg)', transformStyle: 'preserve-3d' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap font-black uppercase shadow-2xl relative px-10 py-3" style={{ background: i % 2 === 0 ? config.textColor : config.accentColor, borderRadius: '100px', transform: `translate3d(${Math.sin(tick * 2 + i) * config.amplitude}px, 0, ${Math.cos(tick * 2 + i) * 100}px)`, fontSize: getResponsiveFontSize(config.fontSize), color: config.bgColor }}>{DISPLAY_TEXT.repeat(4)}</div>
        ))}
      </div>
    </div>
  );

  const renderCascade = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="whitespace-nowrap font-black uppercase text-center" style={{ fontSize: getResponsiveFontSize(config.fontSize), color: config.textColor, lineHeight: 0.7, transform: `translate3d(${Math.sin(tick * 4 + i * 0.15) * config.amplitude}px, 0, 0)`, opacity: 1 - (Math.abs(i - 20) / 25) }}>{DISPLAY_TEXT}</div>
      ))}
    </div>
  );

  const renderSpiral = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative" style={{ transform: `translate3d(0,0,0) rotate(${tick * 30}deg)` }}>
        {DISPLAY_TEXT.repeat(10).split('').slice(0, 177).map((char, i) => {
          const angle = i * 0.22; 
          const radius = 80 + (i * config.amplitude * 0.4 / 10);
          return (
            <div key={i} className="absolute font-black uppercase select-none" style={{ transform: `translate3d(${radius * Math.cos(angle)}px, ${radius * Math.sin(angle)}px, 0) rotate(${angle + Math.PI/2}rad) translate(-50%, -50%)`, fontSize: getResponsiveFontSize(config.fontSize), color: i % 2 === 0 ? config.textColor : config.accentColor }}>{char === ' ' ? '\u00A0' : char}</div>
          );
        })}
      </div>
    </div>
  );

  const renderInterwoven = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="w-full flex items-center shadow-xl absolute" style={{ height: '7vh', backgroundColor: i % 2 === 0 ? config.textColor : config.accentColor, transform: `translate3d(0, ${Math.sin(tick * 2 + i * 0.5) * config.amplitude}px, 0) rotate(${Math.cos(tick + i) * 8}deg)`, top: `${15 + i * 6}%` }}>
          <div className="whitespace-nowrap font-black uppercase w-full text-center" style={{ fontSize: getResponsiveFontSize(config.fontSize * 1.5), color: config.bgColor }}>{DISPLAY_TEXT.repeat(8)}</div>
        </div>
      ))}
    </div>
  );

  const renderBubbles = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {Array.from({ length: 6 }).map((_, r) => (
        <div key={r} className="flex gap-2 mb-2" style={{ transform: `translate3d(${Math.sin(tick + r) * config.amplitude}px, 0, 0)` }}>
          {DISPLAY_TEXT.split('').map((c, i) => (
            <div key={i} className="rounded-full flex items-center justify-center font-black shadow-lg border border-black/10" style={{ width: '4.5vw', height: '4.5vw', minWidth: '35px', minHeight: '35px', backgroundColor: i % 2 === 0 ? config.textColor : config.accentColor, transform: `translate3d(0, ${Math.sin(tick * 5 + i * 0.3) * 20}px, 0)`, fontSize: '1.5vw', color: config.bgColor }}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderStacks = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden [perspective:1200px]">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="absolute shadow-2xl flex items-center justify-center border border-black/20" style={{ width: '65%', height: '35%', transform: `translate3d(${i * 4}px, ${i * -4 + Math.sin(tick * 3 + i * 0.1) * 30}px, 0) rotateX(20deg) rotateY(-10deg)`, zIndex: i, backgroundColor: i === 14 ? config.accentColor : config.textColor }}>
          {i === 14 && <div className="font-black uppercase text-4xl italic text-center px-4" style={{ color: config.bgColor }}>{DISPLAY_TEXT}</div>}
        </div>
      ))}
    </div>
  );

  const renderPopArt = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="font-black italic uppercase text-center relative leading-[0.85] select-none" 
        style={{ fontSize: getResponsiveFontSize(config.fontSize * 1.5), color: config.textColor, textShadow: `${config.amplitude/10}px ${config.amplitude/10}px 0 ${config.accentColor}`, transform: `rotate(${-5 + Math.sin(tick * 2) * 5}deg) scale(${1 + Math.sin(tick * 4) * 0.05})` }}>
        {DISPLAY_TEXT.split(' ').map((word, i) => <div key={i}>{word}</div>)}
      </div>
    </div>
  );

  const renderBlueprint = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${config.textColor} 1px, transparent 1px), linear-gradient(90deg, ${config.textColor} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="font-mono border-4 p-12 uppercase tracking-[0.2em] text-center" style={{ fontSize: getResponsiveFontSize(config.fontSize * 1.5), color: config.textColor, borderColor: config.textColor, transform: `rotate(${Math.sin(tick) * 10}deg)` }}>{DISPLAY_TEXT}</div>
    </div>
  );

  const renderModern = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="font-black uppercase flex flex-col items-center" style={{ transform: `skewX(${Math.sin(tick) * 20}deg)`, color: config.textColor }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="overflow-hidden leading-none" style={{ height: '18vh', fontSize: '18vh', transform: `scaleY(${1.5 + Math.sin(tick * 3 + i) * 1.2})` }}>{DISPLAY_TEXT}</div>
        ))}
      </div>
    </div>
  );

  const renderVector = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {DISPLAY_TEXT.split('').map((c, i) => {
        const x = (i * 50) - (DISPLAY_TEXT.length * 25);
        const y = Math.sin(tick * 3 + i * 0.4) * config.amplitude;
        return (
          <div key={i} className="absolute border-2 rounded-full flex items-center justify-center font-mono" style={{ width: '45px', height: '45px', transform: `translate3d(${x}px, ${y}px, 0)`, color: config.textColor, borderColor: config.textColor, boxShadow: `0 0 15px ${config.accentColor}44` }}>{c}</div>
        );
      })}
    </div>
  );

  const renderRaw = () => (
    <div className="relative w-full h-full flex items-center justify-center p-10 overflow-hidden">
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {DISPLAY_TEXT.split(' ').map((word, wi) => (
           <div key={wi} className="font-black text-7xl px-4 py-2 shadow-2xl" style={{ backgroundColor: config.textColor, color: config.bgColor, transform: `rotate(${Math.sin(tick + wi) * 20}deg) translate3d(0, ${Math.cos(tick * 2 + wi) * 20}px, 0)` }}>{word}</div>
        ))}
      </div>
    </div>
  );

  const renderBoost = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="absolute h-full overflow-hidden" style={{ width: `${100/50}%`, left: `${i * (100/50)}%`, transform: `translate3d(0, ${Math.sin(tick * 5 + i * 0.1) * config.amplitude}px, 0)` }}>
          <div className="whitespace-nowrap flex items-center justify-center font-black" style={{ width: `5000%`, position: 'absolute', left: `${-i * 100}%`, fontSize: '8vw', color: config.textColor }}>{DISPLAY_TEXT}</div>
        </div>
      ))}
    </div>
  );

  const renderRibbons = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-[150%] h-[150%] flex items-center justify-center">
        {Array.from({ length: 8 }).map((_, i) => {
          const isReverse = i % 2 === 0;
          const color = [config.textColor, config.accentColor, '#1a1a1a', config.bgColor][i % 4];
          return (
            <div key={i} className="absolute w-full h-20 flex items-center shadow-2xl" 
              style={{ backgroundColor: color, transform: `rotate(${isReverse ? 25 : -25}deg) translateY(${Math.sin(tick * 2 + i) * config.amplitude}px)`, zIndex: i }}>
              <div className="whitespace-nowrap font-black italic uppercase w-full text-center" style={{ fontSize: '3.5vw', color: color === '#ffffff' ? '#000' : '#fff' }}>{DISPLAY_TEXT.repeat(5)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderFlow = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap font-black italic uppercase opacity-20" style={{ fontSize: '8vw', lineHeight: 0.7, transform: `translate3d(${Math.sin(tick + i * 0.2) * 150}px, 0, 0)`, color: config.textColor }}>{DISPLAY_TEXT}</div>
        ))}
        <div className="absolute font-black uppercase text-7xl z-10 scale-110 drop-shadow-2xl text-center px-4" style={{ color: config.textColor }}>{DISPLAY_TEXT}</div>
      </div>
    </div>
  );

  const renderFlag = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-col rotate-[-15deg] scale-125">
        {Array.from({ length: 8 }).map((_, i) => (
           <div key={i} className="whitespace-nowrap font-black uppercase py-4 px-10" style={{ backgroundColor: i % 2 === 0 ? config.textColor : config.bgColor, color: i % 2 === 0 ? config.bgColor : config.textColor, transform: `translate3d(${Math.sin(tick * 3 + i * 0.5) * config.amplitude}px, 0, 0)` }}>{DISPLAY_TEXT.repeat(5)}</div>
        ))}
      </div>
    </div>
  );

  const renderCurrentTheme = () => {
    switch (config.theme) {
      case 'tunnel': return renderTunnel();
      case 'river': return renderRiver();
      case 'cascade': return renderCascade();
      case 'spiral': return renderSpiral();
      case 'interwoven': return renderInterwoven();
      case 'bubbles': return renderBubbles();
      case 'stacks': return renderStacks();
      case 'pop': return renderPopArt();
      case 'blue': return renderBlueprint();
      case 'modern': return renderModern();
      case 'vector': return renderVector();
      case 'raw': return renderRaw();
      case 'boost': return renderBoost();
      case 'ribbons': return renderRibbons();
      case 'flow': return renderFlow();
      case 'flag': return renderFlag();
      default: return renderSpiral();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden transition-all duration-700 font-sans" style={{ backgroundColor: config.bgColor }}>
      
      {/* Halftone / Subtle Dot Layer (Simplified) */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(${config.textColor} 0.8px, transparent 0.8px)`, 
             backgroundSize: '32px 32px',
             opacity: config.halftoneOpacity
           }} />

      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[150] mix-blend-overlay" style={{ opacity: config.grainOpacity }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <main className={`flex-grow relative flex items-center justify-center transition-all duration-500 overflow-hidden ${isOpen ? 'mr-80' : 'mr-0'}`}>
        <div className="w-full h-full flex items-center justify-center relative z-10">
          {renderCurrentTheme()}
        </div>
      </main>

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="fixed top-8 right-8 z-[200] p-4 bg-white text-black rounded-full shadow-2xl border-2 border-black hover:invert transition-all"
        >
          <Settings2 size={24} />
        </button>
      )}

      <aside className={`fixed top-0 right-0 h-full w-80 bg-white border-l-2 border-black z-[200] transform transition-transform duration-500 p-8 flex flex-col gap-4 text-black overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center pb-4 border-b-2 border-black">
          <div className="flex items-center gap-2 font-black italic uppercase tracking-tighter text-xl">
            <Sparkles size={20} />
            <span>KINETIC UX</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X size={28}/></button>
        </div>

        <section className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Style Presets</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'spiral', label: 'Spiral' },
              { id: 'tunnel', label: 'Tunnel' },
              { id: 'pop', label: 'Pop Art' },
              { id: 'ribbons', label: 'V-Stripes' },
              { id: 'bubbles', label: 'Bubbles' },
              { id: 'stacks', label: 'Stacks' },
              { id: 'river', label: 'River' },
              { id: 'cascade', label: 'Cascade' },
              { id: 'interwoven', label: 'Interwoven' },
              { id: 'boost', label: 'Boost' },
              { id: 'modern', label: 'Modern' },
              { id: 'vector', label: 'Vector' },
              { id: 'raw', label: 'Raw' },
              { id: 'blue', label: 'Blueprint' },
              { id: 'flow', label: 'Flow' },
              { id: 'flag', label: 'Flag' }
            ].map(theme => (
              <button 
                key={theme.id} 
                onClick={() => applyPreset(theme.id)} 
                className={`p-3 text-[9px] font-black rounded-lg uppercase border-2 transition-all ${config.theme === theme.id ? 'bg-black text-white border-black' : 'bg-transparent border-black/5 hover:border-black'}`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4 p-4 bg-zinc-50 rounded-xl border-2 border-black/5">
          <div className="text-[10px] font-bold uppercase tracking-widest">Motion Control</div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] opacity-40"><span>Global Speed</span><span>{config.animationSpeed.toFixed(1)}x</span></div>
              <input type="range" min="0.1" max="3" step="0.1" value={config.animationSpeed} onChange={(e) => updateConfig('animationSpeed', parseFloat(e.target.value))} className="w-full accent-black h-1" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] opacity-40"><span>Motion Power</span><span>{config.amplitude}</span></div>
              <input type="range" min="10" max="250" value={config.amplitude} onChange={(e) => updateConfig('amplitude', parseInt(e.target.value))} className="w-full accent-black h-1" />
            </div>
          </div>
        </section>

        <section className="space-y-4 p-4 bg-zinc-50 rounded-xl border-2 border-black/5">
          <div className="text-[10px] font-bold uppercase tracking-widest">Text Scale</div>
          <input type="range" min="0.5" max="12" step="0.1" value={config.fontSize} onChange={(e) => updateConfig('fontSize', parseFloat(e.target.value))} className="w-full accent-black h-1" />
        </section>

        <button 
          onClick={randomize} 
          className="mt-auto py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:invert transition-all shadow-xl flex items-center justify-center gap-2"
        >
          <Dice5 size={18} /> SHUFFLE VIBE
        </button>
      </aside>

      {/* Main Shuffle Button - Portfolio Style */}
      <button 
        onClick={randomize} 
        className="fixed bottom-12 left-12 z-[110] px-8 py-4 bg-white text-black rounded-full border-2 border-black hover:bg-black hover:text-white transition-all font-black uppercase tracking-widest text-xs flex items-center gap-3 group shadow-2xl"
      >
        <Dice5 size={20} className="group-hover:rotate-180 transition-transform duration-500" /> 
        RANDOMIZE ART
      </button>

      {/* Brand ID Label */}
      <div className="fixed bottom-4 right-4 text-[10px] font-mono text-black/30 tracking-[0.4em] uppercase select-none z-[110]">
        YARDEN_PORTFOLIO // FX_ENGINE_V24
      </div>
    </div>
  );
};

export default App;