import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PRODUCT_PREVIEW_COLLECTION } from '../data/portfolioData';
import { ProductPreviewItem } from '../types';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut, 
  RotateCcw, ExternalLink, Check, Copy, LayoutGrid, 
  Columns2, Type, ArrowUpRight, Layers, Sparkles
} from 'lucide-react';

interface BrandingPresentationSectionProps {
  onShowToast: (msg: string) => void;
  initialIndex?: number;
  compact?: boolean;
}

export const BrandingPresentationSection: React.FC<BrandingPresentationSectionProps> = ({
  onShowToast,
  initialIndex = 0,
  compact = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [viewMode, setViewMode] = useState<'focus' | 'grid'>('focus');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageErrorState, setImageErrorState] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem: ProductPreviewItem = PRODUCT_PREVIEW_COLLECTION[currentIndex] || PRODUCT_PREVIEW_COLLECTION[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCT_PREVIEW_COLLECTION.length);
    setZoomLevel(1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCT_PREVIEW_COLLECTION.length) % PRODUCT_PREVIEW_COLLECTION.length);
    setZoomLevel(1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen]);

  const getImageSrc = (item: ProductPreviewItem) => {
    if (imageErrorState[item.id]) {
      return item.fallbackImage;
    }
    return item.image;
  };

  const handleImageError = (id: string) => {
    setImageErrorState((prev) => ({ ...prev, [id]: true }));
  };

  const handleSharePresentation = () => {
    const shareUrl = window.location.href;
    navigator.clipboard?.writeText(shareUrl);
    setCopiedLink(true);
    onShowToast(`Copied presentation dossier link to clipboard`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section 
      ref={containerRef}
      id="branding-presentation-section"
      className={`relative w-full rounded-3xl sm:rounded-[32px] bg-[#090b11] text-neutral-100 border border-neutral-800 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none m-0 max-h-screen overflow-y-auto' : ''
      }`}
    >
      {/* 1. Atelier Case Study Header */}
      <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-neutral-800/80 bg-[#0d0f17] flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Editorial Metadata Block */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 font-medium">
            <span className="font-mono text-[11px] font-semibold text-red-400 tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Brand Identity Monograph
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300">Client: Abdullah Psychotic</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400 font-mono">2026 Archive</span>
          </div>

          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
            Visual Identity & Subculture Architecture
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed">
            A monograph across eight brand deliverables—uniting high-contrast typography, darkroom photography, architectural cuts, and bespoke hardware.
          </p>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-2 self-start md:self-center">
          {/* View Mode Toggle: Focus vs Grid */}
          <div className="p-1 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('focus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                viewMode === 'focus' 
                  ? 'bg-neutral-800 text-white shadow-xs font-semibold' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Inspect single plate in depth"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Plate Focus</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-neutral-800 text-white shadow-xs font-semibold' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Overview all 8 identity plates"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Specimen Grid</span>
            </button>
          </div>

          {/* Share Presentation */}
          <button
            type="button"
            onClick={handleSharePresentation}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            title="Copy Case Study Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setZoomLevel(1);
            }}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Gallery'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* External Repository Link */}
          <a
            href="https://forhad2008.github.io/Abdullah-psychotic-collections/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-neutral-200 hover:text-white border border-neutral-800 transition-colors"
          >
            <span>Atelier Archive</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>

      </div>

      {/* 2. Main View Content */}
      {viewMode === 'focus' ? (
        /* Focus Mode: High-End Curated Plate Dossier */
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Gallery Lightbox Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/90 shadow-2xl flex items-center justify-center group select-none">
              
              {/* Subtle Atelier Ambient Grid Vignette */}
              <div className="absolute inset-0 bg-radial from-neutral-900/30 via-transparent to-black pointer-events-none" />

              {/* Main Image with Zoom Support */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={getImageSrc(activeItem)}
                  alt={`${activeItem.name} - Abdullah Psychotic Visual Identity`}
                  onError={() => handleImageError(activeItem.id)}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="max-h-full max-w-full object-contain cursor-zoom-in"
                  onClick={() => setZoomLevel((prev) => (prev > 1 ? 1 : 1.75))}
                  loading="eager"
                />
              </div>

              {/* Top Left Plate Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-[11px] font-mono font-semibold bg-black/80 backdrop-blur-md text-neutral-200 border border-neutral-700/80 shadow-md">
                  PLATE {activeItem.number} / 08
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-neutral-900/80 backdrop-blur-md text-neutral-300 border border-neutral-700/60 hidden sm:inline-block">
                  {activeItem.category}
                </span>
              </div>

              {/* Bottom Left Zoom Lens Controls */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 p-1 rounded-lg bg-black/80 backdrop-blur-md border border-neutral-700/80 z-20">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.35, 2.75))}
                  className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono font-semibold px-1.5 text-neutral-400">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.35, 0.75))}
                  className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                {zoomLevel !== 1 && (
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Prev / Next Minimal Carousel Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-neutral-200 hover:text-white backdrop-blur-md border border-neutral-700/80 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer z-20 shadow-lg"
                title="Previous Plate"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-neutral-200 hover:text-white backdrop-blur-md border border-neutral-700/80 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer z-20 shadow-lg"
                title="Next Plate"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Image Thumbnail Selector Strip (Styled directly as requested in image.png) */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 px-0.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Branding Plates (01 — 08)</span>
                </span>
                <span className="font-mono text-[11px] text-neutral-400">
                  Select plate to inspect
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
                {PRODUCT_PREVIEW_COLLECTION.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(idx);
                        setZoomLevel(1);
                      }}
                      className={`relative aspect-square w-full rounded-2xl sm:rounded-[20px] overflow-hidden transition-all duration-300 cursor-pointer select-none group ${
                        isActive
                          ? 'border-[3px] border-[#3b82f6] shadow-[0_0_22px_rgba(59,130,246,0.6)] ring-4 ring-blue-500/20 scale-[1.03]'
                          : 'border-2 border-neutral-800/90 bg-neutral-900/60 hover:border-[#3b82f6]/80 hover:shadow-[0_0_18px_rgba(59,130,246,0.45)] hover:scale-[1.03] opacity-80 hover:opacity-100'
                      }`}
                      title={`${item.name} (${item.number})`}
                    >
                      {/* Image Thumbnail */}
                      <img
                        src={getImageSrc(item)}
                        alt={item.name}
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover"
                      />

                      {/* Top-Right Circular Indicator (matches image.png) */}
                      {isActive ? (
                        <div className="absolute top-2 right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#2563eb] ring-2 ring-white shadow-md z-10 transition-transform scale-100" />
                      ) : (
                        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-blue-500/0 group-hover:bg-[#2563eb] group-hover:ring-2 group-hover:ring-white transition-all opacity-0 group-hover:opacity-100 z-10" />
                      )}

                      {/* Bottom-Left Number Pill Badge (matches image.png red pill on active) */}
                      {isActive ? (
                        <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-lg bg-[#b91c1c] text-white font-black text-xs sm:text-sm tracking-tight shadow-md z-10">
                          {item.number}
                        </span>
                      ) : (
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-neutral-900/90 group-hover:bg-[#b91c1c] text-neutral-300 group-hover:text-white font-mono font-bold text-[11px] sm:text-xs tracking-tight shadow-sm z-10 transition-colors">
                          {item.number}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Architectural Brand Dossier (5 cols) - Color section removed, Name & Mini description focused */}
          <div className="lg:col-span-5 flex flex-col space-y-5 bg-[#0d0f17] p-6 sm:p-7 rounded-2xl border border-neutral-800/90">
            
            {/* Plate Title & Header */}
            <div className="border-b border-neutral-800 pb-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Plate {activeItem.number} / 08
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-neutral-800 text-neutral-200 border border-neutral-700">
                  {activeItem.tag}
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight pt-1">
                {activeItem.name}
              </h2>
              <p className="text-xs font-semibold text-blue-400">
                {activeItem.caption}
              </p>
            </div>

            {/* Mini Description Block */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Mini Description
              </span>
              <p className="text-sm text-neutral-200 leading-relaxed font-normal bg-neutral-900/40 p-3.5 rounded-xl border border-neutral-800/80">
                {activeItem.description}
              </p>
            </div>

            {/* Typographic System & Classification */}
            <div className="space-y-2.5 border-t border-neutral-800/80 pt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Typography System</span>
                </span>
                <span className="font-mono text-[11px] font-semibold text-neutral-200">
                  {activeItem.typographyFont || 'Cinzel Roman & Montserrat'}
                </span>
              </div>

              {activeItem.artDirectionNotes && (
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 space-y-1">
                  <div className="font-mono text-[10px] uppercase font-semibold text-neutral-400">
                    Art Direction Notes
                  </div>
                  <div className="text-xs text-neutral-300 leading-relaxed">
                    {activeItem.artDirectionNotes}
                  </div>
                </div>
              )}
            </div>

            {/* Material & Physical Specifications Table */}
            <div className="border-t border-neutral-800/80 pt-4 space-y-2 text-xs">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Production & Medium Details
              </div>

              <div className="divide-y divide-neutral-800/60 rounded-xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden">
                {activeItem.details?.material && (
                  <div className="p-2.5 flex items-center justify-between">
                    <span className="text-neutral-400">Substrate / Material</span>
                    <span className="font-medium text-neutral-200 text-right max-w-[65%] truncate">
                      {activeItem.details.material}
                    </span>
                  </div>
                )}
                {activeItem.details?.style && (
                  <div className="p-2.5 flex items-center justify-between">
                    <span className="text-neutral-400">Structure / Style</span>
                    <span className="font-medium text-neutral-200 text-right">
                      {activeItem.details.style}
                    </span>
                  </div>
                )}
                {activeItem.details?.edition && (
                  <div className="p-2.5 flex items-center justify-between">
                    <span className="text-neutral-400">Archive Series</span>
                    <span className="font-mono text-neutral-300 text-right">
                      {activeItem.details.edition}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Dossier Footer Action */}
            <div className="pt-2">
              <a
                href="https://forhad2008.github.io/Abdullah-psychotic-collections/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                <span>View Complete 33-Piece Lookbook</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      ) : (
        /* Grid Mode: Full 8-Plate Specimen Gallery Grid (with the same active/hover styling) */
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCT_PREVIEW_COLLECTION.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <article
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setViewMode('focus');
                    setZoomLevel(1);
                  }}
                  className={`group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-[3px] border-[#3b82f6] shadow-[0_0_22px_rgba(59,130,246,0.6)] ring-4 ring-blue-500/20 bg-neutral-900/80 -translate-y-1'
                      : 'border-2 border-neutral-800 bg-neutral-900/60 hover:border-[#3b82f6]/80 hover:shadow-[0_0_18px_rgba(59,130,246,0.45)] hover:-translate-y-1'
                  }`}
                >
                  {/* Image Stage */}
                  <div className="relative aspect-4/3 w-full bg-neutral-950 overflow-hidden">
                    <img
                      src={getImageSrc(item)}
                      alt={item.name}
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top-Right Circular Indicator */}
                    {isActive ? (
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#2563eb] ring-2 ring-white shadow-md z-10" />
                    ) : (
                      <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-blue-500/0 group-hover:bg-[#2563eb] group-hover:ring-2 group-hover:ring-white transition-all opacity-0 group-hover:opacity-100 z-10" />
                    )}

                    {/* Bottom-Left Red Number Pill Badge (matching image.png) */}
                    {isActive ? (
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-[#b91c1c] text-white font-black text-xs shadow-md z-10">
                        {item.number}
                      </span>
                    ) : (
                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-neutral-900/90 group-hover:bg-[#b91c1c] text-neutral-300 group-hover:text-white font-mono font-bold text-[11px] shadow-sm z-10 transition-colors">
                        {item.number}
                      </span>
                    )}

                    <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Card Content - Name according to image & mini description */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        {item.category}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-blue-400 transition-colors mt-0.5">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400 group-hover:text-white">
                      <span>{item.caption}</span>
                      <span>Inspect →</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Grid Bottom Info */}
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center text-xs text-neutral-400">
            Click any plate above to inspect its full deliverable view, typography breakdown, and mini description.
          </div>
        </div>
      )}

    </section>
  );
};
