import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useProfile, FALLBACK_AVATAR } from '../context/ProfileContext';
import { Home, Compass, Plus, Heart, User, Bell } from 'lucide-react';

interface MobileBottomNavProps {
  onNavClick: (target: string) => void;
  onOpenQuickContact: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavClick, onOpenQuickContact }) => {
  const { unreadCount, isDrawerOpen, setIsDrawerOpen, isAdminView, setIsAdminView } = useNotifications();
  const { avatarUrl, setIsPhotoModalOpen } = useProfile();

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-md bg-[#0f1422]/90 dark:bg-[#0b0f19]/95 text-white backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl px-3 py-2 z-40 md:hidden flex items-center justify-between">
      
      {/* Home */}
      <button
        onClick={() => {
          if (isAdminView) setIsAdminView(false);
          onNavClick('home');
        }}
        className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl text-[#818cf8] font-bold text-[10px] transition-colors"
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      {/* Explore / Work */}
      <button
        onClick={() => {
          if (isAdminView) setIsAdminView(false);
          onNavClick('work');
        }}
        className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl text-white/60 hover:text-white font-medium text-[10px] transition-colors"
      >
        <Compass className="w-5 h-5" />
        <span>Explore</span>
      </button>

      {/* Center Glowing Gradient Circular Action Button (+) */}
      <button
        onClick={onOpenQuickContact}
        className="relative -top-2.5 w-12 h-12 rounded-full bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#a855f7] text-white flex items-center justify-center shadow-lg shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 border-[#0b0f19]"
        aria-label="Quick Connect or Inquire"
        title="Start a Project / Quick Connect"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Saved / Notifications Bell with unread dot */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="relative flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl text-white/60 hover:text-white font-medium text-[10px] transition-colors"
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#0f1422] animate-pulse" />
          )}
        </div>
        <span>Offers</span>
      </button>

      {/* Profile / About with real avatar */}
      <button
        onClick={() => {
          if (isAdminView) setIsAdminView(false);
          onNavClick('about');
        }}
        className="flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-2xl text-white/70 hover:text-white font-medium text-[10px] transition-colors group"
      >
        <div className="w-5 h-5 rounded-full p-[1px] bg-gradient-to-tr from-[#2998d5] via-[#3b82f6] to-[#7c3aed] flex items-center justify-center">
          <img
            src={avatarUrl}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_AVATAR;
            }}
            alt="Profile"
            className="w-full h-full rounded-full object-cover bg-black"
          />
        </div>
        <span>Profile</span>
      </button>

    </div>
  );
};
