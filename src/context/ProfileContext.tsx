import React, { createContext, useContext, useState } from 'react';

interface ProfileContextType {
  avatarUrl: string;
  portraitUrl: string;
  setAvatarUrl: (url: string) => void;
  setPortraitUrl: (url: string) => void;
  resetProfileImages: () => void;
}

// Real permanent GitHub raw assets for Abdullah Forhad
export const GITHUB_RAW_AVATAR = 'https://raw.githubusercontent.com/forhad2008/profile/main/public/logo.png';
export const GITHUB_RAW_PORTRAIT = 'https://raw.githubusercontent.com/forhad2008/profile/main/public/2.jpg';

// Resolve asset paths relative to base URL (works in dev, root domains, and GitHub Pages subpaths like /profile/)
const getBaseAsset = (filename: string) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${filename.replace(/^\//, '')}`;
};

export const LOGO_IMAGE_PATH = getBaseAsset('logo.png');
export const BIG_IMAGE_PATH = getBaseAsset('2.jpg');

// Real fallbacks pointing strictly to Abdullah Forhad's real photos on GitHub
export const FALLBACK_AVATAR = GITHUB_RAW_AVATAR;
export const FALLBACK_PORTRAIT = GITHUB_RAW_PORTRAIT;

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatarUrl, setAvatarState] = useState<string>(() => {
    // Purge any legacy unsplash URLs from localStorage
    const saved = localStorage.getItem('abdullah_custom_avatar');
    if (saved && (saved.includes('unsplash.com') || saved.includes('photo-1534528741775'))) {
      localStorage.removeItem('abdullah_custom_avatar');
      return LOGO_IMAGE_PATH;
    }
    return saved || LOGO_IMAGE_PATH;
  });

  const [portraitUrl, setPortraitState] = useState<string>(() => {
    const saved = localStorage.getItem('abdullah_custom_portrait');
    if (saved && (saved.includes('unsplash.com') || saved.includes('photo-1506794778202'))) {
      localStorage.removeItem('abdullah_custom_portrait');
      return BIG_IMAGE_PATH;
    }
    return saved || BIG_IMAGE_PATH;
  });

  const setAvatarUrl = (url: string) => {
    setAvatarState(url);
    localStorage.setItem('abdullah_custom_avatar', url);
  };

  const setPortraitUrl = (url: string) => {
    setPortraitState(url);
    localStorage.setItem('abdullah_custom_portrait', url);
  };

  const resetProfileImages = () => {
    localStorage.removeItem('abdullah_custom_avatar');
    localStorage.removeItem('abdullah_custom_portrait');
    setAvatarState(LOGO_IMAGE_PATH);
    setPortraitState(BIG_IMAGE_PATH);
  };

  return (
    <ProfileContext.Provider
      value={{
        avatarUrl,
        portraitUrl,
        setAvatarUrl,
        setPortraitUrl,
        resetProfileImages,
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

