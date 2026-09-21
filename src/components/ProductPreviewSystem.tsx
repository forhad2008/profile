import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PRODUCT_PREVIEW_COLLECTION } from '../data/portfolioData';
import { ProductPreviewItem } from '../types';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut, 
  RotateCcw, Sparkles, ExternalLink, Heart, Check, Play, Pause, Layers
} from 'lucide-react';

interface ProductPreviewSystemProps {
  onShowToast: (msg: string) => void;
  initialIndex?: number;
  compact?: boolean;
}

export const ProductPreviewSystem: React.FC<ProductPreviewSystemProps> = ({
  onShowToast,
  initialIndex = 0,
  compact = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imageErrorState, setImageErrorState] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProduct: ProductPreviewItem = PRODUCT_PREVIEW_COLLECTION[currentIndex] || PRODUCT_PREVIEW_COLLECTION[0];

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

  // Autoplay slideshow
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPlaying, handleNext]);

  const handleToggleSave = (id: string) => {
    setSavedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        onShowToast(`Removed ${activeProduct.name} from saved archive`);
      } else {
        next.add(id);
        onShowToast(`Saved ${activeProduct.name} (${activeProduct.number}.webp) to favorites ♥`);
      }
      return next;
    });
  };

  const handleShareProduct = () => {
    const text = `Abdullah Psychotic Collection: ${activeProduct.name} (${activeProduct.number}.webp)`;
    navigator.clipboard?.writeText(window.location.href);
    setCopiedId(activeProduct.id);
    onShowToast(`Copied product details: ${text}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getImageSrc = (item: ProductPreviewItem) => {
    if (imageErrorState[item.id]) {
      return item.fallbackImage;
    }
    return item.image;
  };

  const handleImageError = (id: string) => {
    setImageErrorState((prev) => ({ ...prev, [id]: true }));
  };

  const isSaved = savedProductIds.has(activeProduct.id);

  return (
    <div 
      ref={containerRef}
      id="product-preview-system"
      className={`relative w-full rounded-[28px] sm:rounded-[36px] bg-[#0d101b] text-white border border-[#23293e] shadow-2xl overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none m-0 max-h-screen overflow-y-auto' : ''
      }`}
    >
      {/* Top Header Strip */}
      <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#111626]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
            <Layers className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-white">
                Product Preview Imaging System
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#b91c1c] text-white border border-red-500/30 shadow-xs">
                1.webp — 8.webp
              </span>
            </div>
            <p className="text-xs text-[#8f9bba]">
              Abdullah Psychotic Fashion & Subculture Archive
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Autoplay Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsPlaying(!isPlaying);
              onShowToast(isPlaying ? 'Autoplay paused' : 'Autoplay slideshow started');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/30' 
                : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10'
            }`}
            title="Autoplay through 1.webp to 8.webp"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Autoplay'}</span>
          </button>

          {/* Fullscreen Expand Button */}
          <button
            type="button"
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setZoomLevel(1);
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* External Repository Link */}
          <a
            href="https://forhad2008.github.io/Abdullah-psychotic-collections/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/15 transition-all"
            title="View original 33-item collection"
          >
            <span>Full Catalog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left / Center: Interactive Preview Stage (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl flex items-center justify-center group select-none">
            
            {/* Background Texture / Glow */}
            <div className="absolute inset-0 bg-radial from-indigo-900/20 via-transparent to-black pointer-events-none" />

            {/* Active Product Image */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={getImageSrc(activeProduct)}
                alt={`${activeProduct.name} - Abdullah Psychotic`}
                onError={() => handleImageError(activeProduct.id)}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="max-h-full max-w-full object-contain cursor-zoom-in"
                onClick={() => setZoomLevel((prev) => (prev > 1 ? 1 : 1.75))}
                loading="eager"
              />
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 z-20">
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.35, 3))}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono font-bold px-1.5 text-white/70">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.35, 0.75))}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Top Product Indicator & Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse" />
                <span>{activeProduct.number}.webp</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/15 backdrop-blur-md text-white/90 border border-white/10 hidden sm:inline-block">
                {activeProduct.category}
              </span>
            </div>

            {/* Top Right Save Heart Button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={() => handleToggleSave(activeProduct.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border text-lg transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-lg shadow-red-600/40'
                    : 'bg-black/50 hover:bg-black/80 text-white border-white/20'
                }`}
                title="Save product to favorites"
              >
                {isSaved ? '♥' : '♡'}
              </button>
            </div>

            {/* Left & Right Interactive Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer z-20 shadow-xl"
              title="Previous Product"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer z-20 shadow-xl"
              title="Next Product"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* 8 Thumbnails Strip (1.webp to 8.webp) */}
          <div className="relative">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x">
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
                    className={`relative flex-shrink-0 w-20 sm:w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group/thumb snap-start ${
                      isActive 
                        ? 'border-[#3946f4] ring-2 ring-[#3946f4]/50 scale-102 shadow-lg shadow-indigo-500/30' 
                        : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={getImageSrc(item)}
                      alt={`${item.name} (${item.number}.webp)`}
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Number Overlay */}
                    <span className={`absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-black leading-none ${
                      isActive ? 'bg-[#b91c1c] text-white' : 'bg-black/70 text-white/90'
                    }`}>
                      {item.number}
                    </span>

                    {isActive && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3946f4] ring-1 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-[#8f9bba] mt-1 px-1">
              <span>Quick Select: Click any thumbnail to inspect</span>
              <span className="font-mono font-bold text-white/80">
                Item {currentIndex + 1} of {PRODUCT_PREVIEW_COLLECTION.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Product Specification & Craftsmanship Dossier (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-5 bg-[#121626] p-5 sm:p-6 rounded-3xl border border-white/10">
          
          <div className="space-y-4">
            {/* Top metadata badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>{activeProduct.tag}</span>
              </span>

              <span className="text-xs font-mono font-bold text-[#8f9bba]">
                EDITION #{activeProduct.number}
              </span>
            </div>

            {/* Title & Caption */}
            <div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {activeProduct.name}
              </h2>
              <p className="text-xs font-bold text-[#b91c1c] dark:text-red-400 mt-0.5 tracking-wide">
                {activeProduct.caption}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#a0acc9] leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Technical Craft Details Table */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#8f9bba]">
                Product Specifications
              </h4>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[#8f9bba]">Image File</span>
                  <span className="font-mono font-bold text-white bg-black/40 px-2 py-0.5 rounded">
                    {activeProduct.number}.webp
                  </span>
                </div>

                {activeProduct.details?.material && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[#8f9bba]">Material</span>
                    <span className="font-bold text-white text-right max-w-[60%] truncate">
                      {activeProduct.details.material}
                    </span>
                  </div>
                )}

                {activeProduct.details?.style && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[#8f9bba]">Aesthetic Cut</span>
                    <span className="font-bold text-indigo-300">
                      {activeProduct.details.style}
                    </span>
                  </div>
                )}

                {activeProduct.details?.edition && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[#8f9bba]">Release</span>
                    <span className="font-bold text-amber-300">
                      {activeProduct.details.edition}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleShareProduct}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{copiedId ? 'Copied Link' : 'Share Item'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleSave(activeProduct.id)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-[#b91c1c] text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-white' : ''}`} />
                <span>{isSaved ? 'Favorited' : 'Favorite'}</span>
              </button>
            </div>

            <a
              href="https://forhad2008.github.io/Abdullah-psychotic-collections/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Explore Abdullah Psychotic Collections</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
