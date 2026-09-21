import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

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
  if (!project) return null;

  const { fullCaseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-[28px] sm:rounded-[36px] bg-white dark:bg-[#0f1422] text-left align-middle shadow-2xl transition-all border border-[#e3e6ec] dark:border-white/10 my-8">
          
          {/* Header Image with gradient overlay */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#111522]">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111522] via-[#111522]/50 to-transparent" />

            {/* Top Close & Save Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={() => onSaveToggle(project.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border text-lg transition-all ${
                  isSaved
                    ? 'bg-[#3946f4] text-white border-[#3946f4]'
                    : 'bg-black/30 hover:bg-black/50 text-white border-white/20'
                }`}
                aria-label="Save project"
              >
                {isSaved ? '♥' : '♡'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Tagline overlay */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 text-white">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-white/80 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-2">
                {project.categoryLabel}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            
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
