import React, { useState } from 'react';
import { 
  PenTool, Sparkles, ArrowUpRight, Eye, Layers, 
  Palette, Type, Filter, X, ZoomIn, Check, Download, ExternalLink
} from 'lucide-react';

export interface GraphicProject {
  id: string;
  title: string;
  category: 'posters' | 'branding' | 'editorial' | 'typography' | 'packaging';
  categoryLabel: string;
  imageUrl: string;
  year: string;
  client: string;
  tools: string[];
  description: string;
  details: {
    medium: string;
    dimensions: string;
    concept: string;
    deliverables: string[];
  };
}

export const GRAPHIC_DESIGN_PROJECTS: GraphicProject[] = [
  {
    id: 'graphic-01',
    title: 'Kinetic Poster Studies (Brutalist Series)',
    category: 'posters',
    categoryLabel: 'Poster Design',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
    year: '2026',
    client: 'Self-Initiated Research',
    tools: ['Adobe Illustrator', 'Photoshop', 'Generative Scripting'],
    description: 'Experimental geometric poster compositions exploring Swiss baseline grids, optical illusions, and typographic tension across large-format print.',
    details: {
      medium: 'Silkscreen & Archival Pigment Print on 300gsm Cotton Stock',
      dimensions: 'A1 (594 × 841 mm)',
      concept: 'Dissecting visual weight through disciplined negative space and asymmetric balance.',
      deliverables: ['12-Piece Exhibition Poster Series', 'Vector Master Assets', 'Screen-Print Separations']
    }
  },
  {
    id: 'graphic-02',
    title: 'Synthetix Display Modular Typeface',
    category: 'typography',
    categoryLabel: 'Typography & Form',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=85',
    year: '2026',
    client: 'Type Specimen Lab',
    tools: ['Glyphs 3', 'Adobe Illustrator', 'FontLab'],
    description: 'Custom modular display typeface forged with sharp 45-degree angular terminals and condensed letterforms for high-impact editorial headlines.',
    details: {
      medium: 'OpenType Variable Font (OTF/WOFF2)',
      dimensions: 'Uppercase, Numerals, Punctuation & 24 Custom Ligatures',
      concept: 'Combining brutalist industrial geometry with precision optical kerning for screen & print.',
      deliverables: ['Complete Variable Font Family', 'Printed Specimen Booklet', 'Digital Specimen Microsite']
    }
  },
  {
    id: 'graphic-03',
    title: 'Vortex Subculture Apparel & Vector Suite',
    category: 'branding',
    categoryLabel: 'Vector Branding',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
    year: '2026',
    client: 'Subculture Streetwear Lab',
    tools: ['Adobe Illustrator', 'Vector Pen Tool', 'Wacom Pro'],
    description: 'Precision vector iconography, circular crest emblems, and custom garment print separations developed for limited capsule merchandise.',
    details: {
      medium: 'Vector AI/SVG & Screen-Print Multi-Color Halftones',
      dimensions: 'Scalable Vector Graphics for Garment & Signage',
      concept: 'Distressed geometric symbolism inspired by motorcycle subcultures and industrial badges.',
      deliverables: ['Vector Brand Mark Suite', 'Screen Printing Film Positives', 'Embroidered Patch Specs']
    }
  },
  {
    id: 'graphic-04',
    title: 'Metropolis Architectural Editorial Monograph',
    category: 'editorial',
    categoryLabel: 'Editorial & Print',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
    year: '2025',
    client: 'Archival Publishing Press',
    tools: ['Adobe InDesign', 'Photoshop', 'Lightroom'],
    description: '128-page hardcover architectural publication pairing duotone darkroom photography with surgical baseline grid systems and foil-stamped binding.',
    details: {
      medium: 'Offset Lithography on 170gsm Fedrigoni Munken Pure',
      dimensions: '210 × 280 mm (Hardcover Cloth-Bound)',
      concept: 'Minimalist editorial cadence that allows full-bleed photography and typography to breathe.',
      deliverables: ['128-Page Publication Layout', 'Custom Grid System Spec', 'Pre-Press Print Production']
    }
  },
  {
    id: 'graphic-05',
    title: 'Cosmic Mirage Vinyl Packaging & Sleeve',
    category: 'packaging',
    categoryLabel: 'Packaging Design',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85',
    year: '2025',
    client: 'Sonic Explorations Records',
    tools: ['Adobe Illustrator', 'Photoshop', 'Blender 3D'],
    description: 'Deluxe double-gatefold vinyl record packaging featuring metallic holographic hot-foil stamping, inner sleeve art, and center labels.',
    details: {
      medium: 'Heavyweight Reverse-Board Cardstock with Foil Stamping',
      dimensions: '12-inch LP Gatefold Jacket (313 × 313 mm)',
      concept: 'Translating ambient electronic frequencies into textured surrealist vector landscapes.',
      deliverables: ['Gatefold Record Jacket', 'Inner Lyric Sleeves', 'Vinyl Center Label Art']
    }
  },
  {
    id: 'graphic-06',
    title: 'Generative Form Studies & Vector Glyphs',
    category: 'posters',
    categoryLabel: 'Experimental Art',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    year: '2026',
    client: 'Design Research Lab',
    tools: ['Processing', 'Adobe Illustrator', 'Custom Shader Math'],
    description: 'Algorithmic mathematical waveforms mapped to vector bezier curves, exploring generative symmetry and modern digital aesthetics.',
    details: {
      medium: 'Infinite Resolution Vector SVGs & Ultra-HD Canvas Prints',
      dimensions: 'Scalable Vector & 4K Digital Exhibition',
      concept: 'Harmonic sine wave interference patterns converted into sculptural monochrome marks.',
      deliverables: ['Generative Vector Suite', 'Limited Fine-Art Prints', 'Animated Motion Loops']
    }
  }
];

interface GraphicDesignSectionProps {
  onShowToast: (msg: string) => void;
}

export const GraphicDesignSection: React.FC<GraphicDesignSectionProps> = ({ onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<GraphicProject | null>(null);

  const categories = [
    { id: 'all', label: 'All Graphic Works' },
    { id: 'posters', label: 'Posters & Prints' },
    { id: 'typography', label: 'Typography' },
    { id: 'branding', label: 'Vector Branding' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'packaging', label: 'Packaging' },
  ];

  const filteredProjects = GRAPHIC_DESIGN_PROJECTS.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  return (
    <div id="graphic-design-showcase" className="pt-4 sm:pt-8 space-y-6">
      
      {/* Section Header */}
      <div className="border-b border-[#e3e6ec] dark:border-white/10 pb-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
              <PenTool className="w-3.5 h-3.5" />
              <span>Graphic Design & Visual Direction</span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111522] dark:text-white tracking-tight">
              Graphic Design Projects
            </h3>
            <p className="text-xs sm:text-sm text-[#717888] dark:text-[#94a3b8] max-w-3xl leading-relaxed">
              Curated visual artifacts including experimental poster studies, custom display typefaces, vector identity marks, and editorial publications.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 text-xs font-mono text-neutral-600 dark:text-neutral-300 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>{filteredProjects.length} Projects Displayed</span>
          </div>
        </div>

        {/* Filter Pills: Full-width wrapping row so every category shows completely without clipping */}
        <div className="w-full flex flex-wrap items-center gap-2 pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  onShowToast(`Filtered for ${cat.label}`);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-[#111522] dark:bg-white text-white dark:text-[#111522] shadow-sm scale-[1.02]'
                    : 'bg-white dark:bg-[#131827] text-[#64748b] dark:text-[#94a3b8] border border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/50 hover:text-[#111522] dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="group relative flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-[#131827] border border-[#e3e6ec] dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* Visual Image Stage */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-900">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Badge & Year */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white border border-white/20">
                  {project.categoryLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
                  {project.year}
                </span>
              </div>

              {/* Hover Inspect Icon */}
              <div className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200 z-10">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            {/* Card Information */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-mono text-[#8b92a1] dark:text-[#64748b] uppercase tracking-wider block">
                  {project.client}
                </span>
                <h4 className="font-heading font-bold text-base text-[#111522] dark:text-white group-hover:text-[#3946f4] dark:group-hover:text-indigo-400 transition-colors mt-0.5">
                  {project.title}
                </h4>
                <p className="text-xs text-[#5f687a] dark:text-[#94a3b8] mt-1.5 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tools & Inspect Action */}
              <div className="pt-3 border-t border-[#f0f2f5] dark:border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.tools.slice(0, 2).map((tool, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#f4f6fa] dark:bg-white/5 text-[#5f687a] dark:text-[#94a3b8]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <span className="flex items-center gap-1 font-bold text-[#3946f4] dark:text-indigo-400 text-[11px] group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal / Detailed Specimen Viewer for Graphic Design Projects */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-[#0d0f17] text-white rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-[#121520]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-950 text-blue-300 border border-blue-800/60 uppercase">
                  {activeProject.categoryLabel}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {activeProject.year} Archive
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Image Preview */}
              <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-xl">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Design Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
                    Client / Context
                  </span>
                  <span className="text-neutral-200 font-medium mt-0.5 block">
                    {activeProject.client}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
                    Medium & Production
                  </span>
                  <span className="text-neutral-200 font-medium mt-0.5 block">
                    {activeProject.details.medium}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
                    Dimensions / Format
                  </span>
                  <span className="text-neutral-200 font-medium mt-0.5 block">
                    {activeProject.details.dimensions}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
                    Tools Used
                  </span>
                  <span className="text-neutral-200 font-medium mt-0.5 block">
                    {activeProject.tools.join(', ')}
                  </span>
                </div>
              </div>

              {/* Deliverables List */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-neutral-400 block font-semibold tracking-wider">
                  Deliverables & Artifacts
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeProject.details.deliverables.map((item, dIdx) => (
                    <div 
                      key={dIdx}
                      className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-800 bg-[#121520] flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-mono">
                Graphic Design Specimen #{activeProject.id}
              </span>
              <button
                type="button"
                onClick={() => {
                  onShowToast(`Specimen ${activeProject.title} reference noted`);
                  setActiveProject(null);
                }}
                className="px-4 py-2 rounded-xl bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Close Specimen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
