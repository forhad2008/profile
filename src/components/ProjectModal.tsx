import React, { useState } from 'react';
import { Project } from '../types';
import { 
  X, ExternalLink, Github, Sparkles, CheckCircle2, ArrowRight,
  ChevronLeft, ChevronRight, ZoomIn, Eye, Layers
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSaveToggle: (id: string) => void;
  isSaved: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSaveToggle,
  isSaved,
}) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!project) return null;

  const { fullCaseStudy, productItems, galleryImages } = project;
  const hasProducts = Boolean(productItems && productItems.length > 0);
  const currentProduct = hasProducts && productItems ? productItems[selectedProductIndex] : null;

  const currentDisplayImage = currentProduct 
    ? currentProduct.image 
    : (galleryImages && galleryImages.length > 0 ? galleryImages[selectedProductIndex] : project.imageUrl);

  const handleNext = () => {
    if (!productItems) return;
    setSelectedProductIndex((prev) => (prev + 1) % productItems.length);
  };

  const handlePrev = () => {
    if (!productItems) return;
    setSelectedProductIndex((prev) => (prev - 1 + productItems.length) % productItems.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-[28px] sm:rounded-[36px] bg-white dark:bg-[#0f1422] text-left align-middle shadow-2xl transition-all border border-[#e3e6ec] dark:border-white/10 my-8">
          
          {/* Header Image Stage with Product Preview System */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-[#0d101b] group">
            <img
              src={currentDisplayImage}
              onError={(e) => {
                if (currentProduct?.fallbackImage) {
                  (e.target as HTMLImageElement).src = currentProduct.fallbackImage;
                }
              }}
              alt={currentProduct ? currentProduct.name : project.title}
              className={`w-full h-full object-contain transition-all duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1422] via-[#0f1422]/40 to-transparent pointer-events-none" />

            {/* Top Close & Save Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={() => onSaveToggle(project.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border text-lg transition-all ${
                  isSaved
                    ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-md shadow-red-600/40'
                    : 'bg-black/30 hover:bg-black/50 text-white border-white/20'
                }`}
                aria-label="Save project"
              >
                {isSaved ? '♥' : '♡'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left/Right Product Switcher (When multiple products exist) */}
            {hasProducts && productItems && productItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer z-10 shadow-lg"
                  title="Previous Product"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer z-10 shadow-lg"
                  title="Next Product"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Current Product Indicator Tag */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-md">
                {currentProduct ? `${currentProduct.number}.webp • ${currentProduct.name}` : project.categoryLabel}
              </span>
              {hasProducts && (
                <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-[#b91c1c] text-white px-2 py-1 rounded-md shadow-xs">
                  {selectedProductIndex + 1} / {productItems?.length}
                </span>
              )}
            </div>

            {/* Title & Tagline overlay */}
            <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-7 sm:right-7 text-white pointer-events-none">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5 max-w-xl">
                {currentProduct ? `${currentProduct.caption} — ${currentProduct.description}` : project.tagline}
              </p>
            </div>
          </div>

          {/* 1.webp to 8.webp Thumbnail Switcher Strip (if project has products) */}
          {hasProducts && productItems && (
            <div className="px-5 sm:px-7 py-3 bg-[#0a0d17] border-y border-white/10">
              <div className="flex items-center justify-between text-xs text-[#8f9bba] mb-2 font-medium">
                <span className="flex items-center gap-1.5 font-bold text-white text-[11px] uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Product Preview Imaging System (1.webp — 8.webp)</span>
                </span>
                <span className="text-[11px] font-mono">
                  {selectedProductIndex + 1} of {productItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {productItems.map((prod, idx) => {
                  const isCurrent = idx === selectedProductIndex;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        setSelectedProductIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`relative flex-shrink-0 w-14 sm:w-16 aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#b91c1c] ring-2 ring-[#b91c1c]/40 scale-105 shadow-md shadow-red-600/30'
                          : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                      title={`${prod.name} (${prod.number}.webp)`}
                    >
                      <img
                        src={prod.image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = prod.fallbackImage;
                        }}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute bottom-0.5 right-0.5 text-[9px] font-black px-1 rounded ${
                        isCurrent ? 'bg-[#b91c1c] text-white' : 'bg-black/80 text-white/80'
                      }`}>
                        {prod.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
            
            {/* Project Overview & Context Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10 text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#8b92a1] dark:text-[#64748b] uppercase block">Client / Context</span>
                <span className="font-bold text-[#111522] dark:text-white mt-0.5 block">{fullCaseStudy.clientOrContext}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8b92a1] dark:text-[#64748b] uppercase block">Role</span>
                <span className="font-bold text-[#111522] dark:text-white mt-0.5 block">{fullCaseStudy.role}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8b92a1] dark:text-[#64748b] uppercase block">Timeline</span>
                <span className="font-bold text-[#111522] dark:text-white mt-0.5 block">{fullCaseStudy.timeline}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8b92a1] dark:text-[#64748b] uppercase block">Key Metric</span>
                <span className="font-bold text-[#3946f4] dark:text-indigo-400 mt-0.5 block">{fullCaseStudy.metrics || 'Production Ready'}</span>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 text-sm text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
              <div>
                <h3 className="font-heading font-bold text-base text-[#111522] dark:text-white mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>The Challenge</span>
                </h3>
                <p className="bg-[#fafbfc] dark:bg-white/5 p-4 rounded-2xl border border-[#e3e6ec] dark:border-white/10">
                  {fullCaseStudy.challenge}
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-[#111522] dark:text-white mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>The Solution & Engineering</span>
                </h3>
                <p className="bg-[#fafbfc] dark:bg-white/5 p-4 rounded-2xl border border-[#e3e6ec] dark:border-white/10">
                  {fullCaseStudy.solution}
                </p>
              </div>
            </div>

            {/* Tools & Tech Stack */}
            <div>
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#8b92a1] dark:text-[#64748b] mb-2">
                Technologies & Craft Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {fullCaseStudy.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-xl bg-[#e8eaff] dark:bg-indigo-500/15 text-[#2834d6] dark:text-indigo-300 text-xs font-bold border border-[#d2d8ff] dark:border-indigo-500/30"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-3 border-t border-[#e3e6ec] dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {fullCaseStudy.demoUrl && (
                  <a
                    href={fullCaseStudy.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#3946f4] hover:bg-[#2834d6] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#3946f4]/20 transition-all"
                  >
                    <span>Live Showcase</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {fullCaseStudy.githubUrl && (
                  <a
                    href={fullCaseStudy.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#111522] dark:bg-white/10 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white px-4 py-2 cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
