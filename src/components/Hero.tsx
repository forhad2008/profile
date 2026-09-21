import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useProfile, FALLBACK_PORTRAIT } from '../context/ProfileContext';
import { ArrowUpRight, ArrowDown, Bell, Sparkles, GraduationCap, User, RefreshCw } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onAboutClick }) => {
  const { unreadCount, setIsDrawerOpen } = useNotifications();
  const { portraitUrl } = useProfile();
  const [heroCardMode, setHeroCardMode] = useState<'photo' | 'monogram'>('photo');

  return (
    <section id="home" className="relative pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-[#e3e6ec] dark:border-white/10 overflow-hidden transition-colors">
      
      {/* Subtle ambient lighting gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#3946f4]/10 dark:bg-[#3946f4]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badges / Kickers */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-[#717888] dark:text-[#94a3b8] bg-white dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10 px-3.5 py-1 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#44b978] animate-pulse" />
                <span>Available for selected projects</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#2834d6] dark:text-[#818cf8] bg-[#e8eaff] dark:bg-indigo-500/15 border border-[#d2d8ff] dark:border-indigo-500/30 px-3.5 py-1 rounded-full shadow-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Continuing Diploma</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-[40px] xs:text-[46px] sm:text-[60px] md:text-[72px] leading-[0.98] tracking-[-0.04em] text-[#111522] dark:text-white">
              Designing <em className="font-serif italic font-normal text-[#3946f4] dark:text-[#818cf8]">distinct</em> digital experiences.
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-[#666e7f] dark:text-[#94a3b8] leading-relaxed max-w-2xl font-normal">
              I’m <strong className="text-[#111522] dark:text-white font-semibold">Abdullah Forhad</strong> — a graphic designer, web developer, and AI technologist. Continuing my diploma while building surgical visual identities, responsive web platforms, and generative AI interfaces that look intentional and perform smoothly.
            </p>

            {/* Actions: Primary Button + Notifications Window Trigger + About */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              
              <button
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Direct trigger for the demo notification offers & website links */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative inline-flex items-center gap-2 bg-white dark:bg-white/5 hover:bg-[#f8f9ff] dark:hover:bg-white/10 text-[#111522] dark:text-white border border-[#e3e6ec] dark:border-white/10 hover:border-[#3946f4]/50 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Bell className="w-4 h-4 text-[#3946f4] dark:text-[#818cf8]" />
                <span>Active Offers & Links</span>
                {unreadCount > 0 && (
                  <span className="bg-[#3946f4] dark:bg-indigo-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={onAboutClick}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white px-3 py-3 transition-colors cursor-pointer"
              >
                <span>About Me</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Skills Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8b92a1] dark:text-[#64748b]">
              <span className="text-[#111522] dark:text-white font-bold">Focus:</span>
              <span className="bg-[#f1f3f7] dark:bg-white/5 text-[#333948] dark:text-[#cbd5e1] px-2.5 py-1 rounded-lg">Brand Systems</span>
              <span className="bg-[#f1f3f7] dark:bg-white/5 text-[#333948] dark:text-[#cbd5e1] px-2.5 py-1 rounded-lg">React 19 & TypeScript</span>
              <span className="bg-[#f1f3f7] dark:bg-white/5 text-[#333948] dark:text-[#cbd5e1] px-2.5 py-1 rounded-lg">Generative AI</span>
              <span className="bg-[#f1f3f7] dark:bg-white/5 text-[#333948] dark:text-[#cbd5e1] px-2.5 py-1 rounded-lg">Custom Typography</span>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card & Geometry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6 lg:py-0">
            
            {/* Orbital Rings */}
            <div className="absolute w-[320px] sm:w-[420px] h-[220px] sm:h-[270px] border border-[#d9dce6] dark:border-white/10 rounded-full -rotate-12 pointer-events-none" />
            <div className="absolute w-[240px] sm:w-[310px] h-[320px] sm:h-[390px] border border-[#e2e5ef] dark:border-white/10 rounded-full rotate-24 pointer-events-none" />

            {/* Toggle Mode Pills */}
            <div className="relative z-20 mb-3 flex items-center gap-1.5 p-1 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-full border border-[#e3e6ec] dark:border-white/15 shadow-xs">
              <button
                type="button"
                onClick={() => setHeroCardMode('photo')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  heroCardMode === 'photo'
                    ? 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-xs'
                    : 'text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Portrait</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroCardMode('monogram')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  heroCardMode === 'monogram'
                    ? 'bg-[#111522] dark:bg-white text-white dark:text-[#111522] shadow-xs'
                    : 'text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Monogram 3D</span>
              </button>
            </div>

            {/* Hero Card */}
            {heroCardMode === 'photo' ? (
              /* Real Photo Portrait Card */
              <div className="w-[280px] sm:w-[330px] h-[400px] sm:h-[450px] rounded-[32px] sm:rounded-[36px] bg-[#0c101d] text-white p-3 flex flex-col justify-between shadow-2xl shadow-black/40 relative overflow-hidden transform -rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-500 group border-2 border-indigo-500/30">
                
                {/* Photo Container */}
                <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black">
                  <img
                    src={portraitUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_PORTRAIT;
                    }}
                    alt="Abdullah Forhad - Portrait"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090c16] via-[#090c16]/20 to-black/30" />

                  {/* Top Bar on Photo */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-extrabold tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Abdullah Forhad</span>
                    </span>

                    <span className="text-[10px] font-bold text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      Creative Lead
                    </span>
                  </div>

                  {/* Bottom details on Photo */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
                    <div className="p-3 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/15">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading font-extrabold text-sm text-white">
                            Abdullah Forhad
                          </h3>
                          <p className="text-[10px] text-white/70">
                            Designer & Web Developer
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Diploma Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* 3D Monogram Card */
              <div className="w-[280px] sm:w-[320px] h-[380px] sm:h-[430px] rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#111522] via-[#182035] to-[#252f4c] dark:from-[#0b0e18] dark:via-[#13192a] dark:to-[#1f2842] text-white p-7 sm:p-8 flex flex-col justify-between shadow-2xl shadow-black/40 relative overflow-hidden transform -rotate-3 hover:rotate-0 hover:scale-[1.02] transition-all duration-500 group border border-white/15">
                
                {/* Radial glow background in card */}
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-radial from-[#3946f4]/60 via-[#8b5cf6]/25 to-transparent pointer-events-none" />
                
                {/* Card top */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono-tech text-xs tracking-widest uppercase text-white/60">
                    EST. 2026
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full text-white/90 border border-white/15">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Creative Tech</span>
                  </span>
                </div>

                {/* Card Center Monogram */}
                <div className="relative z-10 my-auto text-center py-4">
                  <div className="font-heading font-extrabold text-[85px] sm:text-[100px] leading-none tracking-[-0.08em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/40 select-none group-hover:scale-105 transition-transform duration-500">
                    AF
                  </div>
                  <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mt-1">
                    Abdullah Forhad
                  </p>
                  <p className="text-[10px] text-white/50 font-mono-tech mt-0.5">
                    Design · Code · AI
                  </p>
                </div>

                {/* Card Bottom Meta */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block font-bold">
                      Specialization
                    </span>
                    <span className="text-xs font-bold text-white/90">
                      Full-Spectrum Digital
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block font-bold">
                      Current Status
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      Diploma Ongoing
                    </span>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
