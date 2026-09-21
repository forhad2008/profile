import React, { useState, useMemo } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationCategory } from '../types';
import { 
  X, Bell, Sparkles, Globe, Cpu, Megaphone, 
  ExternalLink, Copy, Check, RefreshCw, Trash2, MessageCircle,
  Search, CheckCheck, Pin
} from 'lucide-react';

interface NotificationDrawerProps {
  onShowToast: (msg: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onShowToast }) => {
  const {
    notifications,
    unreadCount,
    isDrawerOpen,
    setIsDrawerOpen,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    resetToDefaults,
    syncFromGithub,
    isSyncing,
    lastSyncTime,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<'all' | NotificationCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const activeItems = useMemo(() => {
    return notifications.filter(n => n.isActive);
  }, [notifications]);

  // Category counts across active items
  const categoryCounts = useMemo(() => {
    return {
      all: activeItems.length,
      offer: activeItems.filter(i => i.category === 'offer').length,
      website_link: activeItems.filter(i => i.category === 'website_link').length,
      ai_tech: activeItems.filter(i => i.category === 'ai_tech').length,
      announcement: activeItems.filter(i => i.category === 'announcement' || i.category === 'project_launch').length,
    };
  }, [activeItems]);

  // Filter and sort items professionally: Pinned first, unread next, then latest
  const filteredItems = useMemo(() => {
    return activeItems
      .filter(item => {
        // Tab filter
        if (activeTab !== 'all' && item.category !== activeTab) return false;
        // Unread only toggle
        if (onlyUnread && item.isRead) return false;
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchMessage = item.message.toLowerCase().includes(query);
          const matchCategory = item.category.toLowerCase().includes(query);
          const matchCode = item.offerCode?.toLowerCase().includes(query);
          if (!matchTitle && !matchMessage && !matchCategory && !matchCode) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        if (!a.isRead && b.isRead) return -1;
        if (a.isRead && !b.isRead) return 1;
        return 0;
      });
  }, [activeItems, activeTab, onlyUnread, searchQuery]);

  const unreadInView = filteredItems.filter(i => !i.isRead).length;

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'offer':
        return <Sparkles className="w-3 h-3 text-amber-500" />;
      case 'website_link':
        return <Globe className="w-3 h-3 text-emerald-500" />;
      case 'ai_tech':
        return <Cpu className="w-3 h-3 text-indigo-500" />;
      case 'project_launch':
      case 'announcement':
      default:
        return <Megaphone className="w-3 h-3 text-blue-500" />;
    }
  };

  const getCategoryBadgeClass = (category: NotificationCategory) => {
    switch (category) {
      case 'offer':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-700/50';
      case 'website_link':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-700/50';
      case 'ai_tech':
        return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-700/50';
      case 'project_launch':
      case 'announcement':
      default:
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-700/50';
    }
  };

  const getCategoryLabel = (category: NotificationCategory) => {
    switch (category) {
      case 'offer':
        return 'Offer';
      case 'website_link':
        return 'Link';
      case 'ai_tech':
        return 'AI & Tech';
      case 'project_launch':
        return 'Launch';
      case 'announcement':
      default:
        return 'Update';
    }
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    onShowToast(`Copied promo code: "${code}"`);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleManualSync = async () => {
    const res = await syncFromGithub();
    onShowToast(res.message);
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="notification-window-modal">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-3 sm:pl-16">
        <div className="w-screen max-w-md bg-white dark:bg-[#0c101b] shadow-2xl border-l border-[#e3e6ec] dark:border-white/10 flex flex-col transform transition-all duration-300 ease-in-out text-[#111522] dark:text-white relative">
          
          {/* Top Gradient Accent Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#3946f4] via-[#8b5cf6] to-[#06b6d4] shrink-0" />

          {/* Drawer Header with Live Stats & Counter Pill */}
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-[#e3e6ec] dark:border-white/10 bg-[#fafbfc] dark:bg-[#090d17] shrink-0">
            <div className="flex items-center justify-between gap-3">
              
              {/* Title and Icon */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3946f4] to-[#6366f1] text-white flex items-center justify-center shadow-md shadow-[#3946f4]/20 shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-extrabold text-sm sm:text-base text-[#111522] dark:text-white tracking-tight truncate">
                      Notification Center
                    </h2>
                    {/* Live Count Pill */}
                    <span 
                      className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#3946f4]/10 dark:bg-indigo-500/20 text-[#3946f4] dark:text-indigo-400 border border-[#3946f4]/20 shrink-0"
                      title={`${activeItems.length} active notifications in total`}
                    >
                      {activeItems.length} Total
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8b92a1] dark:text-[#64748b] truncate">
                    Real-time updates, special offers & verified links
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8b92a1] dark:text-[#64748b] hover:text-[#111522] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Close notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Smart Search Bar */}
            <div className="mt-2.5 relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8b92a1] dark:text-[#64748b] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search offers, tech, links..."
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-white dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10 text-[#111522] dark:text-white placeholder-[#8b92a1] dark:placeholder-[#64748b] focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8b92a1] hover:text-[#111522] dark:hover:text-white text-xs cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Filter Pills with Live Item Counts */}
            <div className="mt-2 flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[11px]">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'all'
                    ? 'bg-[#111522] dark:bg-white text-white dark:text-[#111522] border-[#111522] dark:border-white'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-[#b0b8c8]'
                }`}
              >
                <span>All</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  activeTab === 'all' ? 'bg-white/20 dark:bg-black/20 text-current' : 'bg-slate-100 dark:bg-white/10 text-[#717888] dark:text-white'
                }`}>
                  {categoryCounts.all}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('offer')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'offer'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-amber-300'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Offers</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-current font-extrabold">
                  {categoryCounts.offer}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('website_link')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'website_link'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-emerald-300'
                }`}
              >
                <Globe className="w-3 h-3 text-emerald-500" />
                <span>Links</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-current font-extrabold">
                  {categoryCounts.website_link}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('ai_tech')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'ai_tech'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-indigo-300'
                }`}
              >
                <Cpu className="w-3 h-3 text-indigo-500" />
                <span>Tech</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-current font-extrabold">
                  {categoryCounts.ai_tech}
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Window Counter & Controls Strip */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-[#0f1422] border-b border-[#e3e6ec] dark:border-white/10 flex items-center justify-between text-xs shrink-0">
            {/* Real-time Count Breakdown */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="font-extrabold text-[#111522] dark:text-white">
                {filteredItems.length} {filteredItems.length === 1 ? 'Notification' : 'Notifications'}
              </span>
              <span className="text-[#8b92a1] dark:text-[#64748b]">in window</span>
              
              {unreadInView > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/50 text-[#b91c1c] dark:text-red-400 font-bold text-[10px] border border-red-200/80 dark:border-red-900/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c] animate-ping" />
                  {unreadInView} unread
                </span>
              )}
            </div>

            {/* Quick Actions: Unread Filter Toggle & Mark All Read */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyUnread(!onlyUnread)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                  onlyUnread
                    ? 'bg-[#3946f4] text-white border-[#3946f4]'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:text-[#111522] dark:hover:text-white'
                }`}
              >
                {onlyUnread ? 'Showing Unread' : 'Unread only'}
              </button>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="inline-flex items-center gap-1 text-[#3946f4] dark:text-indigo-400 hover:underline font-bold text-[10px] cursor-pointer"
                  title="Mark all notifications as read"
                >
                  <CheckCheck className="w-3 h-3" />
                  <span>All read</span>
                </button>
              )}
            </div>
          </div>

          {/* Drawer Body: Professional Compact Notification Cards */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-10 h-10 rounded-xl bg-[#f1f3f7] dark:bg-white/5 text-[#8b92a1] dark:text-[#64748b] mx-auto flex items-center justify-center mb-2.5">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xs text-[#111522] dark:text-white">
                  {searchQuery || onlyUnread ? 'No matching notifications' : 'No notifications in this window'}
                </h3>
                <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b] max-w-[200px] mx-auto mt-0.5">
                  {searchQuery || onlyUnread 
                    ? 'Try clearing your search query or unread filter.' 
                    : 'You have cleared all alerts in this category.'}
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {(searchQuery || onlyUnread) && (
                    <button
                      onClick={() => { setSearchQuery(''); setOnlyUnread(false); }}
                      className="px-2.5 py-1 rounded-lg bg-[#3946f4] text-white text-[11px] font-bold cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  )}
                  <button
                    onClick={resetToDefaults}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-white/10 border border-[#e3e6ec] dark:border-white/10 text-[11px] font-bold text-[#3946f4] dark:text-indigo-400 hover:bg-[#f8f9ff] cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Restore Feed</span>
                  </button>
                </div>
              </div>
            ) : (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  className={`group relative rounded-xl p-3 transition-all border text-left ${
                    !item.isRead
                      ? 'bg-white dark:bg-[#121626] border-[#3946f4]/40 dark:border-indigo-500/40 shadow-xs border-l-4 border-l-[#3946f4] dark:border-l-indigo-400'
                      : 'bg-white/80 dark:bg-white/[0.03] border-[#e2e8f0] dark:border-white/[0.08] hover:border-[#cbd5e1] dark:hover:border-white/20'
                  }`}
                >
                  {/* Header info - Category badge, pinned, and timestamp */}
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {getCategoryIcon(item.category)}
                      <span>{getCategoryLabel(item.category)}</span>
                    </span>

                    {item.offerDiscount && (
                      <span className="text-[9px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1.5 py-0.5 rounded-md shadow-2xs">
                        {item.offerDiscount}
                      </span>
                    )}

                    {item.isPinned && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-500/20">
                        <Pin className="w-2.5 h-2.5" />
                        <span>Pinned</span>
                      </span>
                    )}

                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        {item.createdAt}
                      </span>
                      {!item.isRead && (
                        <span 
                          className="w-2 h-2 rounded-full bg-[#b91c1c] ring-2 ring-[#b91c1c]/25 animate-pulse" 
                          title="Unread notification"
                        />
                      )}
                    </div>
                  </div>

                  {/* Title & Message */}
                  <h4 
                    onClick={() => !item.isRead && markAsRead(item.id)}
                    className="font-heading font-bold text-xs sm:text-[13px] text-[#111522] dark:text-white leading-snug group-hover:text-[#3946f4] dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
                    {item.message}
                  </p>

                  {/* Preview Image (adjusted for Facebook stories & media) */}
                  {item.imageUrl && (
                    <div className="mt-2.5 rounded-xl overflow-hidden border border-[#e3e6ec] dark:border-white/10 relative group/img aspect-16/9 max-h-36 bg-slate-100 dark:bg-black/30">
                      <img
                        src={item.imageUrl}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/2.jpg';
                        }}
                        alt={item.title}
                        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {item.category === 'website_link' && item.linkUrl?.includes('facebook.com') && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#1877f2]/90 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                          <Globe className="w-2.5 h-2.5" />
                          <span>Facebook Stories</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Compact Bottom Row: Promo Code & Direct Link Action */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between gap-2">
                    
                    {/* Left: Promo Code with One-Click Copy */}
                    {item.offerCode ? (
                      <div className="flex items-center gap-1.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/50 rounded-lg px-2 py-0.5">
                        <span className="text-[9px] font-extrabold uppercase text-amber-800 dark:text-amber-300">Code:</span>
                        <code className="font-mono text-[10px] font-black text-amber-950 dark:text-amber-200">
                          {item.offerCode}
                        </code>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCode(item.id, item.offerCode!);
                          }}
                          className="text-[9px] font-bold text-amber-700 dark:text-amber-300 hover:text-amber-950 dark:hover:text-white ml-0.5 p-0.5 cursor-pointer"
                          title="Copy promo code"
                        >
                          {copiedCodeId === item.id ? (
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-2.5 h-2.5" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        {item.category === 'offer' ? 'Special Deal' : 'Abdullah Forhad'}
                      </span>
                    )}

                    {/* Right: Direct Action Link & Dismiss */}
                    <div className="flex items-center gap-1.5">
                      {item.linkUrl && (
                        <a
                          href={item.linkUrl}
                          target={item.linkUrl.startsWith('http') ? '_blank' : '_self'}
                          rel="noreferrer"
                          onClick={() => {
                            markAsRead(item.id);
                            if (!item.linkUrl?.startsWith('http')) {
                              setIsDrawerOpen(false);
                            }
                          }}
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all shadow-2xs ${
                            item.linkUrl.includes('wa.me')
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                              : item.linkUrl.includes('facebook.com')
                              ? 'bg-[#1877f2] hover:bg-[#166fe5] text-white'
                              : 'bg-[#3946f4] hover:bg-[#2f3ad6] text-white'
                          }`}
                        >
                          {item.linkUrl.includes('wa.me') && <MessageCircle className="w-3 h-3" />}
                          <span>{item.linkLabel || 'Open ↗'}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                        </a>
                      )}

                      {/* Read Toggle Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!item.isRead) {
                            markAsRead(item.id);
                            onShowToast('Marked as read');
                          }
                        }}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          item.isRead 
                            ? 'text-slate-300 dark:text-slate-600 cursor-default' 
                            : 'text-[#3946f4] dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                        }`}
                        title={item.isRead ? 'Already read' : 'Mark as read'}
                      >
                        <Check className="w-3 h-3" />
                      </button>

                      {/* Dismiss / Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(item.id);
                          onShowToast('Notification removed');
                        }}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Dismiss notification"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Detailed Count Status & GitHub Sync */}
          <div className="px-4 py-2.5 border-t border-[#e3e6ec] dark:border-white/10 bg-[#fafbfc] dark:bg-[#090d17] shrink-0">
            <div className="flex items-center justify-between text-xs">
              
              {/* Comprehensive Count Footnote */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#717888] dark:text-[#94a3b8] text-[10px] font-medium">
                  Showing <strong className="text-[#111522] dark:text-white font-bold">{filteredItems.length}</strong> of <strong className="text-[#111522] dark:text-white font-bold">{activeItems.length}</strong> alerts
                </span>
              </div>

              {/* GitHub Sync Button */}
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="flex items-center gap-1 text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white font-semibold text-[10px] cursor-pointer"
                title="Check for updates from GitHub or remote feed"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? 'animate-spin text-[#3946f4]' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : (lastSyncTime ? `Synced ${lastSyncTime}` : 'Sync Feed')}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
