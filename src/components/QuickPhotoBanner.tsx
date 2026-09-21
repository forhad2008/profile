import React, { useState, useRef } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Camera, Upload, CheckCircle2, X, Sparkles, Image as ImageIcon } from 'lucide-react';

interface QuickPhotoBannerProps {
  onShowToast: (msg: string) => void;
}

export const QuickPhotoBanner: React.FC<QuickPhotoBannerProps> = ({ onShowToast }) => {
  const { 
    hasCustomAvatar, 
    hasCustomPortrait, 
    handleSmartFiles, 
    setIsPhotoModalOpen 
  } = useProfile();

  const [isDismissed, setIsDismissed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If dismissed, hide banner
  if (isDismissed) return null;

  const isComplete = hasCustomAvatar && hasCustomPortrait;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      const { avatarSet, portraitSet } = await handleSmartFiles(files);
      if (avatarSet && portraitSet) {
        onShowToast('Successfully applied your real logo.png and 2.jpg to your portfolio!');
      } else if (avatarSet) {
        onShowToast('Applied your real logo.png circular avatar!');
      } else if (portraitSet) {
        onShowToast('Applied your real 2.jpg bio portrait!');
      }
    } catch (err: any) {
      onShowToast(err.message || 'Failed to apply image');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <aside aria-label="Real photo sync" className="w-full bg-gradient-to-r from-[#111625] via-[#1a233b] to-[#111625] text-white border-b border-indigo-500/20 px-4 py-2.5 sm:py-3 transition-colors relative z-25">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Left info */}
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2998d5] to-[#7c3aed] p-0.5 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/30">
            <div className="w-full h-full rounded-full bg-[#0d121f] flex items-center justify-center">
              {isComplete ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Camera className="w-4 h-4 text-indigo-300" />
              )}
            </div>
          </div>

          <div className="text-xs">
            {isComplete ? (
              <p className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <span>Real Identity Active:</span>
                <span className="text-white/80 font-normal">Your real photos (<code className="font-mono text-[11px] text-indigo-300">logo.png</code> & <code className="font-mono text-[11px] text-indigo-300">2.jpg</code>) are live.</span>
              </p>
            ) : (
              <p className="text-white/90">
                <span className="font-bold text-white">Add Your Real Photos:</span> Select or drop your <code className="font-mono text-[11px] bg-white/10 px-1 py-0.5 rounded text-indigo-300">logo.png</code> & <code className="font-mono text-[11px] bg-white/10 px-1 py-0.5 rounded text-indigo-300">2.jpg</code> to immediately render your real image!
              </p>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFiles(e.target.files)}
            multiple
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] hover:from-[#2563eb] hover:to-[#6d28d9] text-white text-xs font-bold shadow-sm transition-all cursor-pointer hover:scale-102"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Select Photos</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPhotoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-indigo-300" />
            <span>Photo Center</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="w-7 h-7 rounded-full text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer ml-1"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
