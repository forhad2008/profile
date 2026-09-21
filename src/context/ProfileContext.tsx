import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProfileContextType {
  avatarUrl: string;
  portraitUrl: string;
  hasCustomAvatar: boolean;
  hasCustomPortrait: boolean;
  setAvatarUrl: (url: string) => void;
  setPortraitUrl: (url: string) => void;
  isPhotoModalOpen: boolean;
  setIsPhotoModalOpen: (open: boolean) => void;
  handleFileUpload: (file: File, type: 'avatar' | 'portrait') => Promise<void>;
  handleSmartFiles: (files: FileList | File[]) => Promise<{ avatarSet: boolean; portraitSet: boolean }>;
  resetPhotos: () => void;
}

const STORAGE_KEY_AVATAR = 'af_portfolio_avatar_url';
const STORAGE_KEY_PORTRAIT = 'af_portfolio_portrait_url';

// Explicit asset paths for Abdullah Forhad's portfolio images
export const LOGO_IMAGE_PATH = '/logo.png';
export const BIG_IMAGE_PATH = '/2.jpg';

// Curated fallbacks in case browser caching or environment delays local file delivery
export const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=85';
export const FALLBACK_PORTRAIT = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&h=1500&q=85';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatarUrl, setAvatarUrlState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_AVATAR) || LOGO_IMAGE_PATH;
  });

  const [portraitUrl, setPortraitUrlState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PORTRAIT) || BIG_IMAGE_PATH;
  });

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const setAvatarUrl = (url: string) => {
    setAvatarUrlState(url);
    localStorage.setItem(STORAGE_KEY_AVATAR, url);
  };

  const setPortraitUrl = (url: string) => {
    setPortraitUrlState(url);
    localStorage.setItem(STORAGE_KEY_PORTRAIT, url);
  };

  const handleFileUpload = (file: File, type: 'avatar' | 'portrait'): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please upload an image file (PNG, JPG, WEBP).'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          if (type === 'avatar') {
            setAvatarUrl(result);
          } else {
            setPortraitUrl(result);
          }
          resolve();
        } else {
          reject(new Error('Failed to read image file.'));
        }
      };
      reader.onerror = () => reject(new Error('File reading error.'));
      reader.readAsDataURL(file);
    });
  };

  const hasCustomAvatar = avatarUrl !== LOGO_IMAGE_PATH && !avatarUrl.startsWith('/logo.png');
  const hasCustomPortrait = portraitUrl !== BIG_IMAGE_PATH && !portraitUrl.startsWith('/2.jpg');

  const handleSmartFiles = async (files: FileList | File[]): Promise<{ avatarSet: boolean; portraitSet: boolean }> => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      throw new Error('No valid image files found.');
    }

    let avatarSet = false;
    let portraitSet = false;

    // If multiple files
    if (fileArray.length >= 2) {
      for (const file of fileArray) {
        const name = file.name.toLowerCase();
        if (name.includes('logo') || name.endsWith('.png')) {
          await handleFileUpload(file, 'avatar');
          avatarSet = true;
        } else if (name.includes('2') || name.includes('portrait') || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
          await handleFileUpload(file, 'portrait');
          portraitSet = true;
        }
      }
      // If none matched by name, assign first as avatar, second as portrait
      if (!avatarSet && !portraitSet) {
        await handleFileUpload(fileArray[0], 'avatar');
        await handleFileUpload(fileArray[1], 'portrait');
        avatarSet = true;
        portraitSet = true;
      }
    } else {
      const file = fileArray[0];
      const name = file.name.toLowerCase();
      if (name.includes('2') || name.includes('portrait')) {
        await handleFileUpload(file, 'portrait');
        portraitSet = true;
      } else {
        // default to avatar or portrait depending on what's missing
        if (!hasCustomAvatar) {
          await handleFileUpload(file, 'avatar');
          avatarSet = true;
        } else {
          await handleFileUpload(file, 'portrait');
          portraitSet = true;
        }
      }
    }

    return { avatarSet, portraitSet };
  };

  const resetPhotos = () => {
    localStorage.removeItem(STORAGE_KEY_AVATAR);
    localStorage.removeItem(STORAGE_KEY_PORTRAIT);
    setAvatarUrlState(LOGO_IMAGE_PATH);
    setPortraitUrlState(BIG_IMAGE_PATH);
  };

  return (
    <ProfileContext.Provider
      value={{
        avatarUrl,
        portraitUrl,
        hasCustomAvatar,
        hasCustomPortrait,
        setAvatarUrl,
        setPortraitUrl,
        isPhotoModalOpen,
        setIsPhotoModalOpen,
        handleFileUpload,
        handleSmartFiles,
        resetPhotos,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
