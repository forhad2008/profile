import React, { useState, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';
import { useProfile, FALLBACK_AVATAR } from '../context/ProfileContext';
import { 
  Bell, ArrowUpRight, CheckCircle2, 
  Sun, Moon, GraduationCap, Sparkles 
} from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onExploreWork }) => {
  const { unreadCount, isDrawerOpen, setIsDrawerOpen, notifications } = useNotifications();
  const { theme, toggleTheme } = useTheme();
  const { avatarUrl } = useProfile();

  const [greeting, setGreeting] = useState('Good Day,');

  const activeCount = notifications.filter(n => n.isActive).length;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning,');
    else if (hour < 18) setGreeting('Good Afternoon,');
    else setGreeting('Good Evening,');
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-white/85 dark:bg-[#0a0d16]/85 border-b border-[#e3e6ec] dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Profile / Brand: Styled with real logo.png gradient ring */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            {/* Circular Avatar with signature cyan-to-purple gradient border */}
            <div className="relative">
              <div className="w-11 h-11 rounded-full p-[2.5px] bg-gradient-to-tr from-[#2998d5] via-[#3b82f6] to-[#7c3aed] shadow-md shadow-[#3946f4]/25 flex items-center justify-center">
                <img
                  src={avatarUrl}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_AVATAR;
                  }}
                  alt="Abdullah Forhad"
                  className="w-full h-full rounded-full object-cover bg-[#0a0d16]"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0a0d16]" />
            </div>

            <a
              href="#home"
              className="group focus:outline-none"
            >
              <span className="text-[11px] font-medium text-[#717888] dark:text-[#94a3b8] block leading-tight">
                {greeting}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#111522] dark:text-white tracking-tight group-hover:text-[#3946f4] dark:group-hover:text-indigo-400 transition-colors">
                  Abdullah Forhad
                </span>
                {/* Verified Blue Badge */}
                <CheckCircle2 className="w-4 h-4 text-[#3946f4] dark:text-[#60a5fa] fill-[#3946f4] dark:fill-[#60a5fa] text-white" />
              </div>
              <p className="text-[10px] text-[#8b92a1] dark:text-[#64748b] font-medium hidden xs:block truncate max-w-[200px] sm:max-w-none">
                Graphic Designer · Web Developer & AI · Diploma Student
              </p>
            </a>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#f1f3f7] dark:bg-white/5 p-1.5 rounded-2xl border border-[#e3e6ec]/80 dark:border-white/10">
          <a
            href="#home"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#737a8a] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            Home
          </a>
          <a
            href="#work"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#737a8a] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            Work
          </a>
          <a
            href="#about"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#737a8a] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            About
          </a>
          <a
            href="#services"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#737a8a] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            Capabilities
          </a>
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#737a8a] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Actions Right: Light/Dark Mode Button + Notification Bell + Let's Talk CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full sm:rounded-2xl flex items-center justify-center border border-[#e3e6ec] dark:border-white/15 bg-white dark:bg-white/10 text-[#111522] dark:text-white hover:bg-[#f1f3f7] dark:hover:bg-white/15 transition-all shadow-xs cursor-pointer"
            title={`Toggle Theme (Current: ${theme} mode)`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-300 animate-in spin-in-90 duration-200" />
            ) : (
              <Moon className="w-5 h-5 text-[#3946f4] animate-in spin-in-90 duration-200" />
            )}
          </button>

          {/* Notification Bell with smart count badge */}
          <button
            id="notification-bell-btn"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Open notifications window"
            className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full sm:rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
              isDrawerOpen
                ? 'bg-[#3946f4] text-white border-[#3946f4] shadow-md shadow-[#3946f4]/30'
                : 'bg-white dark:bg-white/10 text-[#111522] dark:text-white border-[#e3e6ec] dark:border-white/15 hover:border-[#3946f4]/50'
            }`}
            title={`Notifications (${activeCount} total, ${unreadCount} unread)`}
          >
            <Bell className="w-5 h-5" />
            
            {/* Smart counter badge - deep red styling matching user design */}
            {unreadCount > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-[#b91c1c] dark:bg-[#c51b24] text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white dark:ring-[#0a0d16] shadow-md shadow-[#991b1b]/50 animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            ) : activeCount > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#3946f4] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#0a0d16]">
                {activeCount > 9 ? '9+' : activeCount}
              </span>
            ) : null}
          </button>

          {/* Let's Talk CTA */}
          <button
            onClick={onOpenContact}
            className="hidden xs:flex items-center gap-1.5 bg-gradient-to-r from-[#3946f4] to-[#6366f1] hover:from-[#2834d6] hover:to-[#4f46e5] text-white px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-[#3946f4]/25 hover:shadow-[#3946f4]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    </header>
  );
};
