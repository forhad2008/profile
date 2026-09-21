import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, CAPABILITIES } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import { GraphicDesignSection } from './GraphicDesignSection';
import { 
  Search, Sparkles, ArrowRight, Heart, Globe, 
  Palette, PenTool, Type, Code2, Bot, SlidersHorizontal, ArrowUpRight, Camera, Calendar, Layers
} from 'lucide-react';

interface WorkSectionProps {
  onShowToast: (msg: string) => void;
  onSelectCapability?: (index: number) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onShowToast, onSelectCapability }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [savedProjectIds, setSavedProjectIds] = useState<Set<string>>(new Set());

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedProjectIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        onShowToast('Removed from saved collection');
      } else {
        next.add(id);
        onShowToast('Saved to your favorites ♥');
      }
      return next;
    });
  };

  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'all' || proj.category === selectedCategory;

    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesSearch =
      proj.title.toLowerCase().includes(q) ||
      proj.tagline.toLowerCase().includes(q) ||
      proj.categoryLabel.toLowerCase().includes(q) ||
      proj.searchTags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="work" className="py-12 sm:py-20 border-b border-[#e3e6ec] dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Bar - Styled exactly like the mobile reference */}
        <div className="relative flex items-center">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-[#8b92a1] dark:text-[#94a3b8] absolute left-4.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, case studies, skills..."
              className="w-full pl-12 pr-16 py-3.5 sm:py-4 rounded-full bg-white dark:bg-[#131827] text-[#111522] dark:text-white border border-[#e3e6ec] dark:border-white/10 placeholder-[#8b92a1] dark:placeholder-[#64748b] text-xs sm:text-sm focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-500 shadow-sm transition-all"
            />
          </div>

          {/* Right Action Button on search: Gradient Circle Arrow like in screenshot */}
          <button
            type="button"
            onClick={() => {
              if (searchQuery) onShowToast(`Filtered for "${searchQuery}"`);
            }}
            className="absolute right-2 sm:right-2.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white flex items-center justify-center shadow-md shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Search Projects"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Category Chips Row - Styled with glowing gradient border on active like in screenshot */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none">
          
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/80 shadow-md shadow-blue-500/25'
                : 'bg-white dark:bg-[#131827] text-[#64748b] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/40 hover:text-[#111522] dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Projects</span>
          </button>

          <button
            onClick={() => setSelectedCategory('web_ai')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === 'web_ai'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/80 shadow-md shadow-blue-500/25'
                : 'bg-white dark:bg-[#131827] text-[#64748b] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/40 hover:text-[#111522] dark:hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Web & AI Apps</span>
          </button>

          <button
            onClick={() => setSelectedCategory('branding')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === 'branding'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/80 shadow-md shadow-blue-500/25'
                : 'bg-white dark:bg-[#131827] text-[#64748b] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/40 hover:text-[#111522] dark:hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Brand Identity</span>
          </button>

          <button
            onClick={() => setSelectedCategory('graphics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === 'graphics'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/80 shadow-md shadow-blue-500/25'
                : 'bg-white dark:bg-[#131827] text-[#64748b] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/40 hover:text-[#111522] dark:hover:text-white'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Graphic Design</span>
          </button>

          <button
            onClick={() => setSelectedCategory('typography')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === 'typography'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/80 shadow-md shadow-blue-500/25'
                : 'bg-white dark:bg-[#131827] text-[#64748b] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/40 hover:text-[#111522] dark:hover:text-white'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Typography</span>
          </button>

        </div>

        {/* Section Header: Recent Projects & View All -> */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111522] dark:text-white tracking-tight">
              Recent Projects
            </h2>
            <p className="text-xs sm:text-sm text-[#717888] dark:text-[#94a3b8] mt-0.5">
              Explore selected creative and engineering work
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              onShowToast('Showing all project editions');
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#3946f4] dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Project Cards - Mobile Carousel / Desktop Grid formatted like the reference card */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white dark:bg-[#131827] rounded-3xl p-10 text-center border border-[#e3e6ec] dark:border-white/10">
            <h3 className="font-heading font-bold text-base text-[#111522] dark:text-white">
              No matching projects found
            </h3>
            <p className="text-xs text-[#8b92a1] dark:text-[#64748b] mt-1">
              Try typing another search term or click "View All" above.
            </p>
          </div>
        ) : (
          <div className="flex md:grid md:grid-cols-2 gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredProjects.map((project, idx) => {
              const isSaved = savedProjectIds.has(project.id);

              return (
                <article
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#111522] border border-[#e3e6ec] dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer min-w-[85vw] sm:min-w-[420px] md:min-w-0 flex-shrink-0 snap-start h-[470px] sm:h-[500px]"
                >
                  {/* Photo Background */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay for High Editorial Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/50 to-black/25 opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Top Bar: Location/Category Badge on Left + Glass Heart Button on Right */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>{project.categoryLabel}</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleToggleSave(project.id, e)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border text-lg transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-[#3946f4] text-white border-[#3946f4] shadow-md shadow-[#3946f4]/30'
                          : 'bg-black/30 hover:bg-black/50 text-white border-white/20'
                      }`}
                      aria-label="Save project to favorites"
                    >
                      {isSaved ? '♥' : '♡'}
                    </button>
                  </div>

                  {/* Bottom Information Stack - Exactly structured like the screenshot card */}
                  <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                    
                    {/* Subtitle Eyebrow in uppercase tracked type */}
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#a5b4fc] block mb-1">
                      {project.fullCaseStudy.role.toUpperCase()}
                    </span>

                    {/* Bold Title */}
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug group-hover:text-[#818cf8] transition-colors">
                      {project.title}
                    </h3>

                    {/* Tagline / Description */}
                    <p className="text-xs text-white/80 mt-1 line-clamp-2 max-w-md leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Stats & Floating Gradient Arrow Row */}
                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[11px] text-white/70 font-medium">
                        <span className="flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5 text-indigo-300" />
                          <span>{project.fullCaseStudy.tools[0]}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-indigo-300" />
                          <span>Diploma Lab</span>
                        </span>
                      </div>

                      {/* Circular Gradient Action Button with Right Arrow */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white flex items-center justify-center shadow-lg shadow-indigo-500/40 group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Graphic Design Projects Showcase */}
        <GraphicDesignSection onShowToast={onShowToast} />

        {/* Popular Categories / Capabilities Section - Styled like the screenshot's lower 4 cards */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#111522] dark:text-white tracking-tight">
              Popular Capabilities
            </h3>
            <a
              href="#services"
              className="flex items-center gap-1 text-xs font-bold text-[#3946f4] dark:text-indigo-400 hover:underline"
            >
              <span>See All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4 Mini Visual Thumbnails like in the screenshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            
            {/* Capability 1 */}
            <a
              href="#services"
              className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#e3e6ec] dark:border-white/10 shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&q=80"
                alt="Brand Systems"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-1.5 bg-black/60 backdrop-blur-md py-1 px-2 rounded-xl text-[11px] font-bold text-white border border-white/15">
                <Palette className="w-3 h-3 text-purple-400" />
                <span className="truncate">Brand Systems</span>
              </div>
            </a>

            {/* Capability 2 */}
            <a
              href="#services"
              className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#e3e6ec] dark:border-white/10 shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=400&q=80"
                alt="Web Development"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-1.5 bg-black/60 backdrop-blur-md py-1 px-2 rounded-xl text-[11px] font-bold text-white border border-white/15">
                <Code2 className="w-3 h-3 text-blue-400" />
                <span className="truncate">Web Development</span>
              </div>
            </a>

            {/* Capability 3 */}
            <a
              href="#services"
              className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#e3e6ec] dark:border-white/10 shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
                alt="AI Technology"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-1.5 bg-black/60 backdrop-blur-md py-1 px-2 rounded-xl text-[11px] font-bold text-white border border-white/15">
                <Bot className="w-3 h-3 text-indigo-400" />
                <span className="truncate">AI Technology</span>
              </div>
            </a>

            {/* Capability 4 */}
            <a
              href="#services"
              className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#e3e6ec] dark:border-white/10 shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=400&q=80"
                alt="Typography"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-1.5 bg-black/60 backdrop-blur-md py-1 px-2 rounded-xl text-[11px] font-bold text-white border border-white/15">
                <Type className="w-3 h-3 text-emerald-400" />
                <span className="truncate">Typography</span>
              </div>
            </a>

          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onSaveToggle={(id) => handleToggleSave(id)}
        isSaved={activeProject ? savedProjectIds.has(activeProject.id) : false}
      />
    </section>
  );
};
