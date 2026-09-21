import React, { createContext, useContext } from 'react';

interface ProfileContextType {
  avatarUrl: string;
  portraitUrl: string;
}

// Static asset paths for Abdullah Forhad's portfolio images
export const LOGO_IMAGE_PATH = '/logo.png';
export const BIG_IMAGE_PATH = '/2.jpg';

// Curated fallbacks in case browser caching or environment delays local file delivery
export const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=85';
export const FALLBACK_PORTRAIT = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&h=1500&q=85';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProfileContext.Provider
      value={{
        avatarUrl: LOGO_IMAGE_PATH,
        portraitUrl: BIG_IMAGE_PATH,
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
