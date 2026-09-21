import React from 'react';
import { useProfile, FALLBACK_PORTRAIT } from '../context/ProfileContext';
import { GraduationCap, Code2, Sparkles, Palette, CheckCircle, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { portraitUrl } = useProfile();

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-[#e3e6ec] dark:border-white/10 bg-white dark:bg-[#0b0f19] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Portrait & Creative Badge (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[32px] sm:rounded-[38px] overflow-hidden bg-[#111522] aspect-[4/5] shadow-2xl border border-[#e3e6ec] dark:border-white/10 group">
              <img
                src={portraitUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_PORTRAIT;
                }}
                alt="Abdullah Forhad - Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/20 to-transparent opacity-80" />

              {/* Status pill on photo */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                <div className="bg-white/90 dark:bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-xs font-extrabold text-[#111522] dark:text-white shadow-sm border border-white/40 dark:border-white/15">
                  <span>Creative · Digital · AI</span>
                </div>
                <div className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white px-3.5 py-1.5 rounded-2xl text-xs font-bold shadow-md shadow-indigo-500/30">
                  Abdullah Forhad
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Diploma & Journey (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#8b92a1] dark:text-[#94a3b8] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3946f4] dark:bg-indigo-400" />
                <span>Biography & Academic Journey</span>
              </p>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111522] dark:text-white tracking-tight leading-[1.05]">
                Visual thinking with an engineer’s rigor.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
              I am currently <strong className="text-[#111522] dark:text-white">continuing my diploma in Computer Technology / Engineering</strong>, where I combine theoretical software concepts with real-world creative execution. Rather than separating design from code, I believe the best digital work is created when aesthetic intuition and technical architecture inform each other from day one.
            </p>

            <p className="text-sm sm:text-base text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
              My practice spans three complementary pillars: <strong className="text-[#111522] dark:text-white">Graphic Design</strong> (crafting fearless brand systems and typography), <strong className="text-[#111522] dark:text-white">Web Development</strong> (building responsive, ultra-fast applications in React and modern CSS), and <strong className="text-[#111522] dark:text-white">AI Technology</strong> (orchestrating generative workflows and intelligent agents to amplify human creativity).
            </p>

            {/* Three Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-2 font-bold">
                  <Palette className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-[#111522] dark:text-white">
                  Graphic Designer
                </h3>
                <p className="text-[11px] text-[#717888] dark:text-[#94a3b8] mt-1 leading-snug">
                  Art direction, logos, identity guidelines & typography.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-2 font-bold">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-[#111522] dark:text-white">
                  Web Developer
                </h3>
                <p className="text-[11px] text-[#717888] dark:text-[#94a3b8] mt-1 leading-snug">
                  React 19, TypeScript, responsive layout & performance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2 font-bold">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-[#111522] dark:text-white">
                  AI Technologist
                </h3>
                <p className="text-[11px] text-[#717888] dark:text-[#94a3b8] mt-1 leading-snug">
                  Generative models, prompt design & intelligent web tools.
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="pt-4 border-t border-[#f1f3f7] dark:border-white/10 grid grid-cols-3 gap-4">
              <div>
                <strong className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111522] dark:text-white block">
                  03+
                </strong>
                <span className="text-[11px] text-[#8b92a1] dark:text-[#64748b] uppercase tracking-wider font-bold block mt-0.5">
                  Core Disciplines
                </span>
              </div>

              <div>
                <strong className="font-heading font-extrabold text-2xl sm:text-3xl text-[#3946f4] dark:text-indigo-400 block">
                  Diploma
                </strong>
                <span className="text-[11px] text-[#8b92a1] dark:text-[#64748b] uppercase tracking-wider font-bold block mt-0.5">
                  Ongoing Pursuit
                </span>
              </div>

              <div>
                <strong className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111522] dark:text-white block">
                  24/7
                </strong>
                <span className="text-[11px] text-[#8b92a1] dark:text-[#64748b] uppercase tracking-wider font-bold block mt-0.5">
                  Creative Momentum
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
