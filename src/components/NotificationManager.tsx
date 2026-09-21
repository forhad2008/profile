import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';
import { useProfile, LOGO_IMAGE_PATH, BIG_IMAGE_PATH, FALLBACK_AVATAR, FALLBACK_PORTRAIT } from '../context/ProfileContext';
import { NotificationCategory, NotificationItem } from '../types';
import { 
  ShieldCheck, PlusCircle, Globe, Sparkles, Cpu, Megaphone, 
  ExternalLink, Copy, Check, Trash2, ArrowLeft, RefreshCw, 
  Code, Eye, Send, Lock, Unlock, HelpCircle, CheckCircle2, Bookmark,
  Sun, Moon, Image as ImageIcon, Upload, RotateCcw, Camera, User, FileText
} from 'lucide-react';

interface NotificationManagerProps {
  onShowToast: (msg: string) => void;
}

export const NotificationManager: React.FC<NotificationManagerProps> = ({ onShowToast }) => {
  const { theme, toggleTheme } = useTheme();
  const {
    notifications,
    addNotification,
    deleteNotification,
    toggleActiveStatus,
    resetToDefaults,
    setIsAdminView,
    setIsDrawerOpen,
    githubFeedUrl,
    setGithubFeedUrl,
    syncFromGithub,
    isSyncing,
    getAdminLink,
  } = useNotifications();

  // Profile image management hook
  const { 
    avatarUrl, 
    portraitUrl, 
    setAvatarUrl, 
    setPortraitUrl, 
    resetProfileImages 
  } = useProfile();

  const [activeAdminTab, setActiveAdminTab] = useState<'notifications' | 'profile_photos'>('notifications');
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [customPortraitInput, setCustomPortraitInput] = useState('');

  // Form state for creating a new notification/offer
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<NotificationCategory>('offer');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const [offerDiscount, setOfferDiscount] = useState('');
  const [isPinned, setIsPinned] = useState(true);

  // Link copy states
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [inputGithubUrl, setInputGithubUrl] = useState(githubFeedUrl);

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      onShowToast('Please provide both a title and message.');
      return;
    }

    addNotification({
      title,
      message,
      category,
      linkUrl: linkUrl.trim() || undefined,
      linkLabel: linkLabel.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      offerCode: offerCode.trim() || undefined,
      offerDiscount: offerDiscount.trim() || undefined,
      isPinned,
    });

    onShowToast(`Published: "${title}" is now live in the notification window!`);
    
    // Reset form fields
    setTitle('');
    setMessage('');
    setLinkUrl('');
    setLinkLabel('');
    setImageUrl('');
    setOfferCode('');
    setOfferDiscount('');
  };

  const handleCopyAdminLink = () => {
    const adminLink = getAdminLink();
    navigator.clipboard.writeText(adminLink);
    setCopiedLink(true);
    onShowToast('Private admin link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyJsonForGithub = () => {
    const jsonStr = JSON.stringify(notifications, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJson(true);
    onShowToast('GitHub JSON feed copied to clipboard!');
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const handleSaveGithubUrl = async () => {
    if (!inputGithubUrl) {
      onShowToast('Please enter a valid GitHub raw JSON or GitHub Pages URL.');
      return;
    }
    setGithubFeedUrl(inputGithubUrl);
    const res = await syncFromGithub(inputGithubUrl);
    onShowToast(res.message);
  };

  const handleSaveAvatarUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAvatarInput.trim()) return;
    setAvatarUrl(customAvatarInput.trim());
    onShowToast('Avatar image URL updated and applied across website!');
    setCustomAvatarInput('');
  };

  const handleSavePortraitUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPortraitInput.trim()) return;
    setPortraitUrl(customPortraitInput.trim());
    onShowToast('Portrait photo URL updated and applied across website!');
    setCustomPortraitInput('');
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        onShowToast('Image size is too large (max 5MB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
          onShowToast('Avatar updated from uploaded photo!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePortraitFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        onShowToast('Image size is too large (max 8MB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPortraitUrl(reader.result);
          onShowToast('Portrait photo updated from uploaded photo!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetProfileImages = () => {
    resetProfileImages();
    onShowToast('Profile images reset to original repository files (/logo.png & /2.jpg)!');
  };

  return (
    <div className="min-h-screen bg-[#f1f3f7] dark:bg-[#070a12] text-[#111522] dark:text-white pb-24 transition-colors">
      
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-[#0f1422] border-b border-[#e3e6ec] dark:border-white/10 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAdminView(false);
                window.history.pushState({}, '', window.location.pathname);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white bg-[#f1f3f7] dark:bg-white/10 hover:bg-[#e4e7ee] dark:hover:bg-white/15 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>

            <div className="h-5 w-px bg-[#e3e6ec] dark:bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-sm sm:text-base leading-tight text-[#111522] dark:text-white">
                  Notification & Offer Manager
                </h1>
                <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">
                  Private Control Portal for Abdullah Forhad
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#e3e6ec] dark:border-white/15 bg-white dark:bg-white/10 text-[#111522] dark:text-white hover:bg-[#f1f3f7] dark:hover:bg-white/15 transition-all cursor-pointer"
              title={`Toggle Theme (Current: ${theme} mode)`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#3946f4]" />
              )}
            </button>

            <button
              onClick={() => {
                setIsAdminView(false);
                window.history.pushState({}, '', window.location.pathname);
                setIsDrawerOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#3946f4] text-white hover:bg-[#2834d6] shadow-sm transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview In Live Bell</span>
              <span className="sm:hidden">Preview</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Private Access Banner with 1-click Copy */}
        <div className="bg-gradient-to-r from-[#171b29] to-[#252c42] rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-white/10">
          <div className="absolute right-0 top-0 w-80 h-80 bg-radial from-[#3946f4]/30 to-transparent rounded-full pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-white/10 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                <Lock className="w-3 h-3" />
                <span>Private Bookmark Link</span>
              </div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white">
                Your Secret Management Link
              </h2>
              <p className="text-xs sm:text-sm text-[#a3abbd] leading-relaxed">
                Bookmark this private URL on your phone or computer (<code className="text-amber-300 font-mono text-[11px] bg-white/10 px-1.5 py-0.5 rounded">/#admin</code>). There are zero links or buttons to this panel on your public portfolio, keeping it completely private for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                onClick={handleCopyAdminLink}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-[#111522] font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#3946f4]" />
                    <span>Copy Private Access Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#e3e6ec] dark:border-white/10 pb-3">
          <button
            type="button"
            onClick={() => setActiveAdminTab('notifications')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeAdminTab === 'notifications'
                ? 'bg-[#3946f4] text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-500/20'
                : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white border border-[#e3e6ec] dark:border-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Offers & Notifications</span>
            <span className="ml-1 text-[11px] px-2 py-0.5 rounded-full bg-white/20">
              {notifications.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAdminTab('profile_photos')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeAdminTab === 'profile_photos'
                ? 'bg-[#3946f4] text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-500/20'
                : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white border border-[#e3e6ec] dark:border-white/10'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Profile Photos & Visuals</span>
            <span className="ml-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
              Active
            </span>
          </button>
        </div>

        {activeAdminTab === 'notifications' ? (
          <>
            {/* 2-Column Workspace: Form & Live Preview on Left/Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          
          {/* Column 1: Create New Notification Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0f1422] rounded-3xl p-6 sm:p-7 border border-[#e3e6ec] dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-[#f1f3f7] dark:border-white/10 mb-5">
              <div className="w-8 h-8 rounded-xl bg-[#3946f4]/10 dark:bg-indigo-500/20 text-[#3946f4] dark:text-indigo-400 flex items-center justify-center">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-base text-[#111522] dark:text-white">
                  Create New Offer or Website Link
                </h2>
                <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">
                  Updates appear instantly in the main index.html notification window
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateNotification} className="space-y-4">
              
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-[#111522] dark:text-white mb-1.5">
                  Notification Type / Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('offer');
                      if (!linkLabel) setLinkLabel('Claim Offer ↗');
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all text-left cursor-pointer ${
                      category === 'offer'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-400 ring-2 ring-amber-400/20'
                        : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-amber-300'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Special Offer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('website_link');
                      if (!linkLabel) setLinkLabel('Visit Website ↗');
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all text-left cursor-pointer ${
                      category === 'website_link'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-400 ring-2 ring-emerald-400/20'
                        : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-emerald-300'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Website Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('ai_tech');
                      if (!linkLabel) setLinkLabel('Explore AI Demo ↗');
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all text-left cursor-pointer ${
                      category === 'ai_tech'
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 border-indigo-400 ring-2 ring-indigo-400/20'
                        : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-indigo-300'
                    }`}
                  >
                    <Cpu className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>AI Project</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('project_launch');
                      if (!linkLabel) setLinkLabel('View Project ↗');
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all text-left cursor-pointer ${
                      category === 'project_launch'
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border-blue-400 ring-2 ring-blue-400/20'
                        : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-blue-300'
                    }`}
                  >
                    <Megaphone className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Project Launch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('announcement');
                      if (!linkLabel) setLinkLabel('Learn More ↗');
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all text-left col-span-2 sm:col-span-1 cursor-pointer ${
                      category === 'announcement'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-400 ring-2 ring-slate-400/20'
                        : 'bg-white dark:bg-white/5 text-[#717888] dark:text-[#94a3b8] border-[#e3e6ec] dark:border-white/10 hover:border-slate-300'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>General Alert</span>
                  </button>
                </div>
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-[#111522] dark:text-white mb-1">
                  Notification Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 30% Off New Project Bookings or My New AI Generative Tool"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3e6ec] dark:border-white/15 text-xs sm:text-sm focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-500 focus:ring-2 focus:ring-[#3946f4]/15 transition-all bg-[#fafbfc] dark:bg-white/5 text-[#111522] dark:text-white"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#111522] dark:text-white mb-1">
                  Description / Offer Message *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain what the offer is, what clients receive, or details about your other website/GitHub project..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3e6ec] dark:border-white/15 text-xs sm:text-sm focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-500 focus:ring-2 focus:ring-[#3946f4]/15 transition-all bg-[#fafbfc] dark:bg-white/5 text-[#111522] dark:text-white"
                />
              </div>

              {/* Link URL & Button Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#111522] dark:text-white mb-1">
                    Target Website / WhatsApp / Social Link
                  </label>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://wa.me/8801342900364 or https://facebook.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3e6ec] dark:border-white/15 text-xs focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-500 focus:ring-2 focus:ring-[#3946f4]/15 transition-all bg-[#fafbfc] dark:bg-white/5 text-[#111522] dark:text-white"
                  />
                  <span className="text-[10px] text-[#8b92a1] dark:text-[#64748b] mt-0.5 block">
                    WhatsApp chat link, Facebook profile, or GitHub link
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111522] dark:text-white mb-1">
                    Button Action Text
                  </label>
                  <input
                    type="text"
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    placeholder="e.g. Chat on WhatsApp ↗ or View Profile ↗"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3e6ec] dark:border-white/15 text-xs focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-500 focus:ring-2 focus:ring-[#3946f4]/15 transition-all bg-[#fafbfc] dark:bg-white/5 text-[#111522] dark:text-white"
                  />
                  <span className="text-[10px] text-[#8b92a1] dark:text-[#64748b] mt-0.5 block">
                    Label displayed on the notification card button
                  </span>
                </div>
              </div>

              {/* Optional Image URL */}
              <div>
                <label className="block text-xs font-bold text-[#111522] dark:text-white mb-1">
                  Card Image URL (Optional - e.g. for travel, photos, or project banners)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or /2.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3e6ec] dark:border-white/15 text-xs focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-500 transition-all bg-[#fafbfc] dark:bg-white/5 text-[#111522] dark:text-white"
                />
              </div>

              {/* Offer Discount & Promo Code (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#111522] dark:text-white mb-1">
                    Offer Discount Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={offerDiscount}
                    onChange={(e) => setOfferDiscount(e.target.value)}
                    placeholder="e.g. 25% OFF or FREE BRIEF"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3e6ec] dark:border-white/15 text-xs focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-500 transition-all bg-[#fafbfc] dark:bg-white/5 text-[#111522] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111522] dark:text-white mb-1">
                    Promo Coupon Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={offerCode}
                    onChange={(e) => setOfferCode(e.target.value.toUpperCase())}
                    placeholder="e.g. DIPLOMA2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e3e6ec] dark:border-white/15 text-xs font-mono-tech focus:outline-none focus:border-[#3946f4] dark:focus:border-indigo-500 transition-all bg-[#fafbfc] dark:bg-white/5 text-[#111522] dark:text-white uppercase"
                  />
                </div>
              </div>

              {/* Pin option */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded border-[#e3e6ec] text-[#3946f4] focus:ring-[#3946f4] w-4 h-4"
                />
                <label htmlFor="isPinned" className="text-xs font-semibold text-[#555d6e] dark:text-[#94a3b8] cursor-pointer">
                  Pin to top of notification drawer
                </label>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#3946f4] hover:bg-[#2834d6] text-white font-bold text-sm py-3.5 rounded-2xl shadow-lg shadow-[#3946f4]/25 hover:shadow-[#3946f4]/40 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish to Portfolio Notification Bell</span>
                </button>
              </div>

            </form>
          </div>

          {/* Column 2: Live Preview Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#0f1422] rounded-3xl p-6 border border-[#e3e6ec] dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f7] dark:border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#3946f4] dark:text-indigo-400" />
                  <h3 className="font-heading font-extrabold text-sm text-[#111522] dark:text-white">
                    Live Notification Preview
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#8b92a1] dark:text-[#64748b]">
                  Real-time render
                </span>
              </div>

              {/* Mock card preview - Compact small height */}
              <div className="rounded-xl p-3 bg-white dark:bg-[#121626] border border-[#3946f4]/35 dark:border-indigo-500/35 shadow-xs relative text-left">
                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{category.replace('_', ' ').toUpperCase()}</span>
                  </span>

                  {offerDiscount && (
                    <span className="text-[9px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1.5 py-0.5 rounded-md shadow-2xs">
                      {offerDiscount}
                    </span>
                  )}

                  {isPinned && (
                    <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-md">
                      Pinned
                    </span>
                  )}

                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      Just now
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3946f4] ring-2 ring-[#3946f4]/20 animate-pulse" />
                  </div>
                </div>

                <h4 className="font-heading font-bold text-xs sm:text-[13px] text-[#111522] dark:text-white leading-snug">
                  {title || 'Your Notification Title Will Appear Here'}
                </h4>
                <p className="mt-1 text-[11px] text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
                  {message || 'Type your message in the form on the left to see how it looks to your visitors.'}
                </p>

                {imageUrl && (
                  <div className="mt-2 h-16 rounded-lg overflow-hidden border border-[#e3e6ec] dark:border-white/10 relative">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between gap-2">
                  {offerCode ? (
                    <div className="flex items-center gap-1.5 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 rounded-lg px-2 py-0.5">
                      <span className="text-[9px] font-bold uppercase text-amber-800 dark:text-amber-300">Code:</span>
                      <code className="font-mono text-[10px] font-bold text-amber-950 dark:text-amber-200">
                        {offerCode}
                      </code>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      Abdullah Forhad
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    {linkUrl ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#3946f4] text-white">
                        <span>{linkLabel || 'Visit Link ↗'}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                      </span>
                    ) : null}
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">● Active</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f1f3f7] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminView(false);
                    setIsDrawerOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#f1f3f7] dark:bg-white/10 hover:bg-[#e4e7ee] dark:hover:bg-white/15 text-xs font-bold text-[#111522] dark:text-white transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Drawer in Main Website View</span>
                </button>
              </div>
            </div>

            {/* GitHub Page Feed Sync Card */}
            <div className="bg-white dark:bg-[#0f1422] rounded-3xl p-6 border border-[#e3e6ec] dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-[#111522] dark:text-white">
                    GitHub Feed Synchronization
                  </h3>
                  <p className="text-[10px] text-[#8b92a1] dark:text-[#64748b]">
                    Host your notifications on GitHub Pages or raw JSON
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
                You can host your notification feed on your GitHub profile repository (e.g., <code className="bg-[#f1f3f7] dark:bg-white/10 px-1 py-0.5 rounded text-[11px]">forhad-psychotic.github.io/notifications.json</code>). When updated on GitHub, it automatically populates the main website!
              </p>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-[#111522] dark:text-white">
                  Remote GitHub Raw JSON URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputGithubUrl}
                    onChange={(e) => setInputGithubUrl(e.target.value)}
                    placeholder="https://raw.githubusercontent.com/.../notifications.json"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#e3e6ec] dark:border-white/15 text-xs bg-[#fafbfc] dark:bg-white/5 text-[#111522] dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleSaveGithubUrl}
                    disabled={isSyncing}
                    className="px-3 py-2 bg-[#111522] dark:bg-white text-white dark:text-[#111522] rounded-xl text-xs font-bold hover:bg-black dark:hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Sync</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyJsonForGithub}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3946f4] dark:text-indigo-400 hover:text-[#2834d6] bg-[#e8eaff] dark:bg-indigo-500/15 hover:bg-[#d9ddff] px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Clean JSON for GitHub</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowJsonModal(!showJsonModal)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{showJsonModal ? 'Hide Code' : 'View Code'}</span>
                </button>
              </div>

              {showJsonModal && (
                <div className="mt-3 p-3 rounded-xl bg-[#0f1422] text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-48 border border-white/10">
                  <pre>{JSON.stringify(notifications, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Existing Notifications Management Table / List */}
        <div className="bg-white dark:bg-[#0f1422] rounded-3xl p-6 sm:p-7 border border-[#e3e6ec] dark:border-white/10 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f1f3f7] dark:border-white/10">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#111522] dark:text-white">
                Published Notifications & Offers ({notifications.length})
              </h3>
              <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">
                Toggle live visibility, edit or delete existing alerts
              </p>
            </div>

            <button
              type="button"
              onClick={resetToDefaults}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#717888] dark:text-[#94a3b8] hover:text-rose-600 self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Default Demo Feed</span>
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 sm:p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  item.isActive
                    ? 'bg-[#fafbfc] dark:bg-white/5 border-[#e3e6ec] dark:border-white/10'
                    : 'bg-slate-100/60 dark:bg-white/5 border-dashed border-slate-300 dark:border-white/10 opacity-60'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white dark:bg-black/30 border border-[#e3e6ec] dark:border-white/15">
                      {item.category.replace('_', ' ')}
                    </span>
                    {item.offerDiscount && (
                      <span className="text-[10px] font-extrabold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                        {item.offerDiscount}
                      </span>
                    )}
                    {item.isPinned && (
                      <span className="text-[10px] font-bold text-[#3946f4] dark:text-indigo-400 bg-[#e8eaff] dark:bg-indigo-500/20 px-2 py-0.5 rounded-full">
                        Pinned
                      </span>
                    )}
                    <span className="text-[10px] text-[#8b92a1] dark:text-[#64748b]">
                      {item.createdAt}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-sm text-[#111522] dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#5f687a] dark:text-[#94a3b8] max-w-2xl">
                    {item.message}
                  </p>

                  {item.imageUrl && (
                    <div className="mt-2 w-32 h-16 rounded-lg overflow-hidden border border-[#e3e6ec] dark:border-white/10">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {item.linkUrl && (
                    <div className="text-[11px] text-[#3946f4] dark:text-indigo-400 font-mono-tech flex items-center gap-1 mt-1">
                      <span>Target:</span>
                      <a href={item.linkUrl} target="_blank" rel="noreferrer" className="underline truncate max-w-xs sm:max-w-md">
                        {item.linkUrl}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      toggleActiveStatus(item.id);
                      onShowToast(`Status updated for "${item.title}"`);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      item.isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50 hover:bg-emerald-100'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/15'
                    }`}
                  >
                    {item.isActive ? 'Active in Bell' : 'Hidden / Paused'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      deleteNotification(item.id);
                      onShowToast('Notification deleted');
                    }}
                    className="p-2 rounded-xl text-[#a0a5b1] dark:text-[#64748b] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    ) : (
      /* Profile Photos & Visuals Management Tab */
      <div className="space-y-6">
        
        {/* Banner with Reset Option */}
        <div className="bg-white dark:bg-[#0f1422] rounded-3xl p-6 sm:p-7 border border-[#e3e6ec] dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#e8eaff] dark:bg-indigo-500/20 text-[#3946f4] dark:text-indigo-400 text-xs font-bold px-3 py-1 rounded-full">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Identity Control</span>
            </div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#111522] dark:text-white">
              Manage Your Profile Photo & Avatar
            </h2>
            <p className="text-xs sm:text-sm text-[#717888] dark:text-[#94a3b8] max-w-2xl">
              Preview and update your profile pictures instantly. You can upload an image from your phone/computer, paste an image link, or replace the image files directly in your GitHub repository.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetProfileImages}
            className="inline-flex items-center justify-center gap-2 bg-[#f1f3f7] dark:bg-white/10 hover:bg-[#e4e7ee] dark:hover:bg-white/15 text-[#111522] dark:text-white font-bold text-xs px-4 py-3 rounded-2xl transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-[#717888] dark:text-[#94a3b8]" />
            <span>Reset to Original Files</span>
          </button>
        </div>

        {/* 2-Column Grid: Avatar on Left, Big Portrait on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Card 1: Avatar / Logo (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0f1422] rounded-3xl p-6 border border-[#e3e6ec] dark:border-white/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#f1f3f7] dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#3946f4]/10 dark:bg-indigo-500/20 text-[#3946f4] dark:text-indigo-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#111522] dark:text-white">
                    Avatar & Logo
                  </h3>
                  <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">
                    Navbar, Notification Drawer, Mobile Dock
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                public/logo.png
              </span>
            </div>

            {/* Live Visual Preview */}
            <div className="p-4 rounded-2xl bg-[#fafbfc] dark:bg-[#070a12] border border-[#e3e6ec] dark:border-white/5 flex flex-col items-center justify-center gap-3">
              <div className="relative">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#2998d5] via-[#3b82f6] to-[#7c3aed] shadow-lg">
                  <img
                    src={avatarUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_AVATAR;
                    }}
                    alt="Abdullah Forhad - Avatar Preview"
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0f1422] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <div className="text-center">
                <p className="font-bold text-xs text-[#111522] dark:text-white">
                  Abdullah Forhad
                </p>
                <p className="text-[10px] text-[#717888] dark:text-[#94a3b8] truncate max-w-[200px]">
                  {avatarUrl === LOGO_IMAGE_PATH ? 'Default: /logo.png' : 'Custom Image Active'}
                </p>
              </div>
            </div>

            {/* Action 1: Upload from device */}
            <div>
              <label className="block text-xs font-bold text-[#111522] dark:text-white mb-2">
                1. Upload New Avatar from Device
              </label>
              <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl border-2 border-dashed border-[#d1d7e2] dark:border-white/20 hover:border-[#3946f4] dark:hover:border-indigo-400 bg-[#f8fafc] dark:bg-white/5 text-xs font-bold text-[#3946f4] dark:text-indigo-400 hover:bg-[#eef2ff] dark:hover:bg-indigo-500/10 transition-all cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Choose Image (PNG or JPG)</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleAvatarFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Action 2: Or Paste Image URL */}
            <form onSubmit={handleSaveAvatarUrl} className="space-y-2">
              <label className="block text-xs font-bold text-[#111522] dark:text-white">
                2. Or Paste Any Direct Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/my-photo.jpg"
                  value={customAvatarInput}
                  onChange={(e) => setCustomAvatarInput(e.target.value)}
                  className="flex-1 bg-[#f8fafc] dark:bg-white/5 border border-[#d1d7e2] dark:border-white/10 rounded-xl px-3 py-2 text-xs text-[#111522] dark:text-white placeholder:text-[#8b92a1] focus:outline-none focus:ring-2 focus:ring-[#3946f4]"
                />
                <button
                  type="submit"
                  className="bg-[#3946f4] hover:bg-[#2834d6] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap"
                >
                  Save URL
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: Main Hero & About Portrait (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0f1422] rounded-3xl p-6 border border-[#e3e6ec] dark:border-white/10 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#f1f3f7] dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#111522] dark:text-white">
                    Main Hero & About Portrait Photo
                  </h3>
                  <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">
                    Hero Interactive 3D Card, About Section Big Photo
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                public/2.jpg
              </span>
            </div>

            {/* Live Visual Preview of Hero Frame */}
            <div className="p-4 rounded-2xl bg-[#fafbfc] dark:bg-[#070a12] border border-[#e3e6ec] dark:border-white/5 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-36 h-48 rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-black shrink-0 relative group">
                <img
                  src={portraitUrl}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_PORTRAIT;
                  }}
                  alt="Abdullah Forhad - Portrait Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                    Hero Card Live
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-[#3946f4] dark:text-indigo-300 font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Card Photo</span>
                </div>
                <h4 className="font-bold text-sm text-[#111522] dark:text-white">
                  Abdullah Forhad Portrait
                </h4>
                <p className="text-[#717888] dark:text-[#94a3b8] text-[11px] leading-relaxed">
                  Recommended format: Portrait aspect ratio (3:4 or 4:5), high resolution (e.g. 800×1000px or higher) in JPG or PNG format.
                </p>
                <p className="text-[10px] font-mono text-[#8b92a1] dark:text-[#64748b]">
                  Current Source: {portraitUrl === BIG_IMAGE_PATH ? 'public/2.jpg' : 'Custom Image'}
                </p>
              </div>
            </div>

            {/* Action 1: Upload from device */}
            <div>
              <label className="block text-xs font-bold text-[#111522] dark:text-white mb-2">
                1. Upload New Portrait Photo from Device
              </label>
              <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl border-2 border-dashed border-[#d1d7e2] dark:border-white/20 hover:border-[#3946f4] dark:hover:border-indigo-400 bg-[#f8fafc] dark:bg-white/5 text-xs font-bold text-[#3946f4] dark:text-indigo-400 hover:bg-[#eef2ff] dark:hover:bg-indigo-500/10 transition-all cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Choose Portrait Photo (JPG or PNG)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePortraitFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Action 2: Or Paste Image URL */}
            <form onSubmit={handleSavePortraitUrl} className="space-y-2">
              <label className="block text-xs font-bold text-[#111522] dark:text-white">
                2. Or Paste Any Direct Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/portrait.jpg"
                  value={customPortraitInput}
                  onChange={(e) => setCustomPortraitInput(e.target.value)}
                  className="flex-1 bg-[#f8fafc] dark:bg-white/5 border border-[#d1d7e2] dark:border-white/10 rounded-xl px-3 py-2 text-xs text-[#111522] dark:text-white placeholder:text-[#8b92a1] focus:outline-none focus:ring-2 focus:ring-[#3946f4]"
                />
                <button
                  type="submit"
                  className="bg-[#3946f4] hover:bg-[#2834d6] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap"
                >
                  Save URL
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Card 3: Permanent GitHub Replacement Guide */}
        <div className="bg-white dark:bg-[#0f1422] rounded-3xl p-6 sm:p-7 border border-[#e3e6ec] dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#f1f3f7] dark:border-white/10">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#111522] dark:text-white">
                Permanent Replacement via GitHub Repository
              </h3>
              <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">
                How to permanently replace the files in your GitHub repository (<code className="font-mono text-indigo-500">forhad2008/profile</code>)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/5 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-[#3946f4] text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-[#111522] dark:text-white text-sm">
                Open GitHub Repo
              </h4>
              <p className="text-[#717888] dark:text-[#94a3b8] leading-relaxed">
                Go to your repository <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded font-mono">forhad2008/profile</code> and open the <code className="font-bold text-[#3946f4]">public/</code> directory.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/5 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-[#3946f4] text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-[#111522] dark:text-white text-sm">
                Upload New Files
              </h4>
              <p className="text-[#717888] dark:text-[#94a3b8] leading-relaxed">
                Click <strong>Add file → Upload files</strong>. Make sure your files have these exact names:
                <br />
                • Avatar/Logo: <code className="font-mono font-bold text-indigo-500">logo.png</code>
                <br />
                • Hero Portrait: <code className="font-mono font-bold text-indigo-500">2.jpg</code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/5 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-[#3946f4] text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-[#111522] dark:text-white text-sm">
                Commit & Auto-Deploy
              </h4>
              <p className="text-[#717888] dark:text-[#94a3b8] leading-relaxed">
                Click <strong>Commit changes</strong>. Your GitHub Actions workflow automatically rebuilds and deploys the new photos directly to your live portfolio!
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] text-[#8b92a1] dark:text-[#64748b]">
              Whenever you update files in GitHub, use the <strong>GitHub sync</strong> button in Google AI Studio to sync changes both ways.
            </p>

            <a
              href="https://github.com/forhad2008/profile/tree/main/public"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3946f4] dark:text-indigo-400 hover:underline"
            >
              <span>Go to public/ in your GitHub Repo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    )}

      </div>
    </div>
  );
};

