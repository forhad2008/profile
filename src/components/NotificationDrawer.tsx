import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationCategory, NotificationItem } from '../types';
import { 
  X, Bell, Sparkles, Globe, Cpu, Megaphone, 
  ExternalLink, Copy, Check, RefreshCw, Trash2, MessageCircle
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
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const activeItems = notifications.filter(n => n.isActive);

  const filteredItems = activeItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'offer':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'website_link':
        return <Globe className="w-4 h-4 text-emerald-500" />;
      case 'ai_tech':
        return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'project_launch':
      case 'announcement':
      default:
        return <Megaphone className="w-4 h-4 text-blue-500" />;
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
        return 'Special Offer';
      case 'website_link':
        return 'Website Link';
      case 'ai_tech':
        return 'AI & Tech';
      case 'project_launch':
        return 'Project Launch';
      case 'announcement':
      default:
        return 'Announcement';
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-16">
        <div className="w-screen max-w-md bg-white dark:bg-[#0f1422] shadow-2xl border-l border-[#e3e6ec] dark:border-white/10 flex flex-col transform transition-all duration-300 ease-in-out text-[#111522] dark:text-white">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-[#e3e6ec] dark:border-white/10 bg-[#fafbfc] dark:bg-[#0b0f19]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#3946f4]/10 dark:bg-indigo-500/20 text-[#3946f4] dark:text-indigo-400 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#111522] dark:text-white tracking-tight">
                    Notification Center
                  </h2>
                  <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">
                    Live updates, offers & external links from Abdullah
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#8b92a1] dark:text-[#64748b] hover:text-[#111522] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 border border-transparent hover:border-[#e3e6ec] transition-all cursor-pointer"
                aria-label="Close notifications"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Subheader */}
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-[#717888] dark:text-[#94a3b8] font-medium">
                {unreadCount > 0 ? (
                  <span className="text-[#3946f4] dark:text-indigo-400 font-bold">{unreadCount} unread alert{unreadCount > 1 ? 's' : ''}</span>
                ) : (
                  'All caught up'
                )}
              </span>

              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[#3946f4] dark:text-indigo-400 hover:underline font-semibold text-[11px] cursor-pointer"
                  >
                    Mark all as read
                  </button>
                )}
                <button
                  onClick={handleManualSync}
                  disabled={isSyncing}
                  className="flex items-center gap-1 text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white font-semibold text-[11px] cursor-pointer"
                  title="Check for updates from GitHub or remote feed"
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-[#3946f4]' : ''}`} />
                  <span>Sync Feed</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-full font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#111522] dark:bg-white text-white dark:text-[#111522] border-[#111522] dark:border-white'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-[#b0b8c8]'
                }`}
              >
                All ({activeItems.length})
              </button>
              <button
                onClick={() => setActiveTab('offer')}
                className={`px-3 py-1 rounded-full font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  activeTab === 'offer'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-amber-300'
                }`}
              >
                Offers
              </button>
              <button
                onClick={() => setActiveTab('website_link')}
                className={`px-3 py-1 rounded-full font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  activeTab === 'website_link'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-emerald-300'
                }`}
              >
                Links & GitHub
              </button>
              <button
                onClick={() => setActiveTab('ai_tech')}
                className={`px-3 py-1 rounded-full font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  activeTab === 'ai_tech'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-indigo-300'
                }`}
              >
                AI & Tech
              </button>
            </div>
          </div>

          {/* Drawer Body: Notification List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#f1f3f7] dark:bg-white/5 text-[#8b92a1] dark:text-[#64748b] mx-auto flex items-center justify-center mb-3">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#111522] dark:text-white">No notifications found</h3>
                <p className="text-xs text-[#8b92a1] dark:text-[#64748b] max-w-[220px] mx-auto mt-1">
                  You have cleared or filtered all alerts in this category.
                </p>
                <button
                  onClick={resetToDefaults}
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 border border-[#e3e6ec] dark:border-white/10 text-xs font-bold text-[#3946f4] dark:text-indigo-400 hover:bg-[#f8f9ff] shadow-sm cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Demo Notifications</span>
                </button>
              </div>
            ) : (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => !item.isRead && markAsRead(item.id)}
                  className={`group relative rounded-2xl p-4 transition-all border ${
                    !item.isRead
                      ? 'bg-white dark:bg-[#131827] border-[#3946f4]/40 dark:border-indigo-500/40 shadow-md shadow-[#3946f4]/5'
                      : 'bg-white dark:bg-white/5 border-[#e3e6ec] dark:border-white/10 hover:border-[#b0b8c8] dark:hover:border-white/20'
                  }`}
                >
                  {/* Unread indicator dot */}
                  {!item.isRead && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#3946f4] dark:bg-indigo-400 ring-4 ring-[#3946f4]/20" />
                  )}

                  {/* Header info */}
                  <div className="flex items-center gap-2 mb-2 pr-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {getCategoryIcon(item.category)}
                      <span>{getCategoryLabel(item.category)}</span>
                    </span>

                    {item.offerDiscount && (
                      <span className="text-[10px] font-extrabold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                        {item.offerDiscount}
                      </span>
                    )}

                    <span className="text-[10px] text-[#8b92a1] dark:text-[#64748b] ml-auto font-medium">
                      {item.createdAt}
                    </span>
                  </div>

                  {/* Title & Message */}
                  <h4 className="font-heading font-bold text-sm text-[#111522] dark:text-white leading-snug group-hover:text-[#3946f4] dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
                    {item.message}
                  </p>

                  {/* Optional Image (e.g., for travel / featured links) */}
                  {item.imageUrl && (
                    <div className="mt-2.5 rounded-xl overflow-hidden aspect-[16/9] border border-[#e3e6ec] dark:border-white/10 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-2 left-2 text-[10px] font-extrabold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                        Travel & Stories
                      </span>
                    </div>
                  )}

                  {/* Offer Code Badge if available */}
                  {item.offerCode && (
                    <div className="mt-2.5 flex items-center gap-2 bg-[#fffbeb] dark:bg-amber-950/30 p-2 rounded-xl border border-amber-200 dark:border-amber-800/40">
                      <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300">Promo Code:</span>
                      <code className="font-mono-tech text-xs font-bold text-amber-950 dark:text-amber-200 bg-white dark:bg-black/30 px-2 py-0.5 rounded-lg border border-amber-300 dark:border-amber-700/50">
                        {item.offerCode}
                      </code>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCode(item.id, item.offerCode!);
                        }}
                        className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-200/70 dark:bg-amber-900/40 hover:bg-amber-300/80 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                        title="Copy coupon code"
                      >
                        {copiedCodeId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-700 dark:text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Actions row */}
                  <div className="mt-3.5 pt-2.5 border-t border-[#f1f3f7] dark:border-white/10 flex items-center justify-between">
                    {item.linkUrl ? (
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
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs ${
                          item.linkUrl.includes('wa.me')
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                            : item.linkUrl.includes('facebook.com')
                            ? 'bg-[#1877f2] hover:bg-[#166fe5] text-white shadow-blue-500/20'
                            : 'text-[#3946f4] dark:text-indigo-400 hover:underline bg-[#e8eaff] dark:bg-indigo-500/15'
                        }`}
                      >
                        {item.linkUrl.includes('wa.me') && <MessageCircle className="w-3.5 h-3.5" />}
                        <span>{item.linkLabel || 'Explore Link ↗'}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">Abdullah Forhad Feed</span>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(item.id);
                          onShowToast('Notification dismissed');
                        }}
                        className="text-[#a0a5b1] dark:text-[#64748b] hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Dismiss notification"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Feed Status */}
          <div className="p-4 sm:p-5 border-t border-[#e3e6ec] dark:border-white/10 bg-[#fafbfc] dark:bg-[#0b0f19]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#717888] dark:text-[#94a3b8] text-[11px]">
                  {lastSyncTime ? `Synced at ${lastSyncTime}` : 'Live Notifications Active'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
