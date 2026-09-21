import React from 'react';
import { CAPABILITIES } from '../data/portfolioData';
import { Sparkles, Code, Bot, Type, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Code':
        return <Code className="w-5 h-5 text-blue-500" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-indigo-500" />;
      case 'Type':
      default:
        return <Type className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 border-b border-[#e3e6ec] dark:border-white/10 bg-[#fafbfc] dark:bg-[#0e1320] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#8b92a1] dark:text-[#94a3b8] mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3946f4] dark:bg-indigo-400" />
              <span>Capabilities & Services</span>
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111522] dark:text-white tracking-tight">
              What I Craft For Clients & Products
            </h2>
            <p className="text-xs sm:text-sm text-[#717888] dark:text-[#94a3b8] mt-1">
              End-to-end creative execution across visual design, code architecture, and AI models.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3946f4] dark:text-indigo-300 hover:text-[#2834d6] dark:hover:text-white bg-white dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/40 px-4 py-2.5 rounded-xl transition-all self-start sm:self-auto cursor-pointer shadow-xs"
          >
            <span>Inquire for a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.number}
              className="bg-white dark:bg-[#131827] rounded-[28px] p-6 sm:p-7 border border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#f1f3f7] dark:border-white/10">
                  <span className="font-mono-tech text-xs font-bold text-[#8b92a1] dark:text-[#64748b]">
                    {cap.number}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10 flex items-center justify-center group-hover:bg-[#e8eaff] dark:group-hover:bg-white/10 transition-colors">
                    {getIcon(cap.iconName)}
                  </div>
                </div>

                <div className="mt-5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3946f4] dark:text-indigo-400 block">
                    {cap.subtitle}
                  </span>
                  <h3 className="font-heading font-extrabold text-lg text-[#111522] dark:text-white tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-[#5f687a] dark:text-[#94a3b8] leading-relaxed pt-2">
                    {cap.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-4 border-t border-[#f1f3f7] dark:border-white/10 flex flex-wrap gap-1.5">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold bg-[#f1f3f7] dark:bg-white/5 text-[#555d6e] dark:text-[#cbd5e1] px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
