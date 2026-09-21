import React, { useState, useRef } from 'react';
import { useProfile, FALLBACK_AVATAR, FALLBACK_PORTRAIT } from '../context/ProfileContext';
import { 
  Camera, Upload, X, Check, RefreshCw, Sparkles, 
  Image as ImageIcon, FolderOpen, ArrowRight, UserCheck
} from 'lucide-react';

interface PhotoManagerModalProps {
  onShowToast: (msg: string) => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({ onShowToast }) => {
  const { 
    avatarUrl, 
    portraitUrl, 
    isPhotoModalOpen, 
    setIsPhotoModalOpen, 
    handleFileUpload,
    handleSmartFiles,
    resetPhotos 
  } = useProfile();

  const [activeTab, setActiveTab] = useState<'avatar' | 'portrait'>('avatar');
  const [isDragging, setIsDragging] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const portraitInputRef = useRef<HTMLInputElement>(null);
  const bothFilesInputRef = useRef<HTMLInputElement>(null);

  if (!isPhotoModalOpen) return null;

  const onMultiFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        const { avatarSet, portraitSet } = await handleSmartFiles(files);
        if (avatarSet && portraitSet) {
          onShowToast('Applied both real logo.png and 2.jpg successfully!');
        } else if (avatarSet) {
          onShowToast('Updated real circular logo.png!');
        } else if (portraitSet) {
          onShowToast('Updated real 2.jpg portrait!');
        }
      } catch (err: any) {
        onShowToast(err.message || 'Failed to upload photo');
      }
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'portrait') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await handleFileUpload(file, type);
        onShowToast(`Updated your real ${type === 'avatar' ? 'circular logo / avatar' : 'full portrait'}!`);
      } catch (err: any) {
        onShowToast(err.message || 'Failed to upload photo');
      }
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, type: 'avatar' | 'portrait') => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        await handleFileUpload(file, type);
        onShowToast(`Uploaded real ${type === 'avatar' ? 'logo.png' : '2.jpg'} successfully!`);
      } catch (err: any) {
        onShowToast(err.message || 'Failed to upload photo');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white dark:bg-[#0f1422] w-full max-w-xl rounded-3xl border border-[#e3e6ec] dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#e3e6ec] dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#111522] dark:text-white">
                Real Profile & Identity Photos
              </h2>
              <p className="text-xs text-[#717888] dark:text-[#94a3b8]">
                Set your real photos (<code className="text-[#3946f4] dark:text-indigo-400 font-mono text-[11px]">logo.png</code> & <code className="text-[#3946f4] dark:text-indigo-400 font-mono text-[11px]">2.jpg</code>)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPhotoModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#f1f3f7] dark:bg-white/10 hover:bg-[#e4e7ee] dark:hover:bg-white/20 text-[#5f687a] dark:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 flex gap-2 border-b border-[#e3e6ec] dark:border-white/10 bg-[#fafbfc] dark:bg-white/[0.02]">
          <button
            onClick={() => setActiveTab('avatar')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'avatar'
                ? 'border-[#3946f4] text-[#3946f4] dark:text-indigo-400'
                : 'border-transparent text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Circular Logo / Avatar (logo.png)</span>
          </button>

          <button
            onClick={() => setActiveTab('portrait')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'portrait'
                ? 'border-[#3946f4] text-[#3946f4] dark:text-indigo-400'
                : 'border-transparent text-[#717888] dark:text-[#94a3b8] hover:text-[#111522] dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Full Bio Portrait (2.jpg)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Dual Upload Quick Action */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2998d5] to-[#7c3aed] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#111522] dark:text-white">
                  Add Both Real Images at Once
                </h4>
                <p className="text-[11px] text-[#717888] dark:text-[#94a3b8]">
                  Select or drop <code className="font-mono text-indigo-500 font-bold">logo.png</code> and <code className="font-mono text-indigo-500 font-bold">2.jpg</code> together
                </p>
              </div>
            </div>

            <div>
              <input
                type="file"
                ref={bothFilesInputRef}
                onChange={onMultiFilesChange}
                multiple
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => bothFilesInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] hover:from-[#2563eb] hover:to-[#6d28d9] text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Both Files</span>
              </button>
            </div>
          </div>
          
          {activeTab === 'avatar' ? (
            /* Avatar Upload Section */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10">
                {/* Live Preview with Gradient Ring */}
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#2998d5] via-[#3b82f6] to-[#7c3aed] shadow-lg shadow-indigo-500/25 flex items-center justify-center">
                    <img
                      src={avatarUrl}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_AVATAR;
                      }}
                      alt="Abdullah Forhad - Avatar"
                      className="w-full h-full rounded-full object-cover bg-[#111522]"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-3 ring-white dark:ring-[#0f1422]" />
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#3946f4] dark:text-indigo-400">
                    Live Header & Dock Avatar
                  </span>
                  <h3 className="font-heading font-bold text-sm text-[#111522] dark:text-white">
                    Circular Gradient Frame
                  </h3>
                  <p className="text-xs text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
                    This avatar appears in the top navigation bar, floating mobile dock, and notification portal with your signature cyan-to-purple gradient border.
                  </p>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => handleDrop(e, 'avatar')}
                onClick={() => avatarInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#3946f4] bg-[#e8eaff] dark:bg-indigo-500/15'
                    : 'border-[#d2d6df] dark:border-white/15 hover:border-[#3946f4] dark:hover:border-indigo-400 bg-[#fafbfc] dark:bg-white/[0.02]'
                }`}
              >
                <input
                  type="file"
                  ref={avatarInputRef}
                  onChange={(e) => onFileChange(e, 'avatar')}
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-[#3946f4]/10 dark:bg-indigo-500/20 text-[#3946f4] dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#111522] dark:text-white mb-1">
                  Click to choose or drag & drop <span className="text-[#3946f4] dark:text-indigo-400">logo.png</span> here
                </h4>
                <p className="text-xs text-[#717888] dark:text-[#94a3b8]">
                  Supports PNG, JPG, or WEBP (Automatically applied across the entire site)
                </p>
              </div>
            </div>
          ) : (
            /* Portrait Upload Section */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#fafbfc] dark:bg-white/5 border border-[#e3e6ec] dark:border-white/10">
                {/* Live Preview */}
                <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-[#3946f4] dark:border-indigo-400 shadow-md relative shrink-0">
                  <img
                    src={portraitUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_PORTRAIT;
                    }}
                    alt="Abdullah Forhad - Full Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#3946f4] dark:text-indigo-400">
                    About & Biography Portrait
                  </span>
                  <h3 className="font-heading font-bold text-sm text-[#111522] dark:text-white">
                    Full Visual Showcase
                  </h3>
                  <p className="text-xs text-[#5f687a] dark:text-[#94a3b8] leading-relaxed">
                    This photo is showcased in the full About section next to your computer engineering diploma details and creative design philosophy.
                  </p>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => handleDrop(e, 'portrait')}
                onClick={() => portraitInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#3946f4] bg-[#e8eaff] dark:bg-indigo-500/15'
                    : 'border-[#d2d6df] dark:border-white/15 hover:border-[#3946f4] dark:hover:border-indigo-400 bg-[#fafbfc] dark:bg-white/[0.02]'
                }`}
              >
                <input
                  type="file"
                  ref={portraitInputRef}
                  onChange={(e) => onFileChange(e, 'portrait')}
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-[#3946f4]/10 dark:bg-indigo-500/20 text-[#3946f4] dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#111522] dark:text-white mb-1">
                  Click to choose or drag & drop <span className="text-[#3946f4] dark:text-indigo-400">2.jpg</span> here
                </h4>
                <p className="text-xs text-[#717888] dark:text-[#94a3b8]">
                  Supports JPG, PNG, or WEBP (Replaces bio image instantly)
                </p>
              </div>
            </div>
          )}

          {/* Quick File Explorer Tip */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 flex items-start gap-3">
            <FolderOpen className="w-4 h-4 text-[#3946f4] dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-[#555d6e] dark:text-[#94a3b8] leading-relaxed">
              <strong className="text-[#111522] dark:text-white block mb-0.5">
                Tip for AI Studio File Explorer:
              </strong>
              You can also upload <code className="bg-white dark:bg-black/30 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-[#3946f4] dark:text-indigo-300">logo.png</code> and <code className="bg-white dark:bg-black/30 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-[#3946f4] dark:text-indigo-300">2.jpg</code> directly into the <code className="bg-white dark:bg-black/30 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-[#3946f4] dark:text-indigo-300">public/</code> directory in the left file tree, and the website will automatically serve them!
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#e3e6ec] dark:border-white/10 bg-[#fafbfc] dark:bg-white/[0.02] flex items-center justify-between">
          <button
            onClick={() => {
              resetPhotos();
              onShowToast('Reset photos to default reference image.');
            }}
            className="text-xs font-bold text-[#717888] dark:text-[#94a3b8] hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={() => setIsPhotoModalOpen(false)}
            className="inline-flex items-center gap-2 bg-[#3946f4] hover:bg-[#2834d6] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#3946f4]/25 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Done</span>
          </button>
        </div>

      </div>
    </div>
  );
};
