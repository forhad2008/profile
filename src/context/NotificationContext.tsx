import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem, NotificationCategory } from '../types';
import { INITIAL_NOTIFICATIONS } from '../data/portfolioData';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isAdminView: boolean;
  setIsAdminView: (admin: boolean) => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead' | 'isActive'> & { isActive?: boolean; isPinned?: boolean }) => NotificationItem;
  updateNotification: (id: string, updates: Partial<NotificationItem>) => void;
  deleteNotification: (id: string) => void;
  toggleActiveStatus: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  resetToDefaults: () => void;
  githubFeedUrl: string;
  setGithubFeedUrl: (url: string) => void;
  syncFromGithub: (customUrl?: string) => Promise<{ success: boolean; message: string; count?: number }>;
  isSyncing: boolean;
  lastSyncTime: string | null;
  adminSecretKey: string;
  getAdminLink: () => string;
}

const STORAGE_KEY = 'abdullah_portfolio_notifications_v3';
const GITHUB_URL_KEY = 'abdullah_portfolio_github_feed_url';
const ADMIN_SECRET = 'abdullah-forhad-secret';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [githubFeedUrl, setGithubFeedUrlState] = useState<string>(() => {
    try {
      return localStorage.getItem(GITHUB_URL_KEY) || 'https://raw.githubusercontent.com/forhad-psychotic/portfolio-feed/main/notifications.json';
    } catch {
      return 'https://raw.githubusercontent.com/forhad-psychotic/portfolio-feed/main/notifications.json';
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Check URL parameters, hash, or pathname on mount & route change for dedicated admin page
  useEffect(() => {
    const checkAdminAccess = () => {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      const isDedicatedAdminRoute = 
        pathname.endsWith('/admin') ||
        pathname.endsWith('/admin.html') ||
        params.get('admin') === 'true' || 
        params.get('access') === 'abdullah' || 
        params.get('key') === ADMIN_SECRET ||
        hash === '#admin' ||
        hash === '#/admin' ||
        hash === '#management';

      setIsAdminView(isDedicatedAdminRoute);
    };

    checkAdminAccess();
    window.addEventListener('hashchange', checkAdminAccess);
    window.addEventListener('popstate', checkAdminAccess);
    return () => {
      window.removeEventListener('hashchange', checkAdminAccess);
      window.removeEventListener('popstate', checkAdminAccess);
    };
  }, []);

  // Save notifications to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save notifications to localStorage', e);
    }
  }, [notifications]);

  const setGithubFeedUrl = (url: string) => {
    setGithubFeedUrlState(url);
    try {
      localStorage.setItem(GITHUB_URL_KEY, url);
    } catch {
      // ignore
    }
  };

  const unreadCount = notifications.filter(n => n.isActive && !n.isRead).length;

  const addNotification = (
    item: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead' | 'isActive'> & { isActive?: boolean; isPinned?: boolean }
  ): NotificationItem => {
    const newItem: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: item.title.trim(),
      message: item.message.trim(),
      category: item.category,
      linkUrl: item.linkUrl?.trim() || undefined,
      linkLabel: item.linkLabel?.trim() || undefined,
      offerCode: item.offerCode?.trim() || undefined,
      offerDiscount: item.offerDiscount?.trim() || undefined,
      createdAt: 'Just now',
      isRead: false,
      isActive: item.isActive !== undefined ? item.isActive : true,
      isPinned: item.isPinned || false,
    };

    setNotifications(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateNotification = (id: string, updates: Partial<NotificationItem>) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  const toggleActiveStatus = (id: string) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    // Dismissing sets it inactive in the client's feed
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, isActive: false } : item))
    );
  };

  const resetToDefaults = () => {
    setNotifications(INITIAL_NOTIFICATIONS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    } catch {
      // ignore
    }
  };

  // Sync from remote GitHub raw JSON or GitHub Pages URL
  const syncFromGithub = async (customUrl?: string): Promise<{ success: boolean; message: string; count?: number }> => {
    const urlToFetch = customUrl || githubFeedUrl;
    if (!urlToFetch || !urlToFetch.startsWith('http')) {
      return { success: false, message: 'Please provide a valid GitHub raw JSON or GitHub Pages URL.' };
    }

    setIsSyncing(true);
    try {
      const response = await fetch(urlToFetch, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch feed`);
      }
      const data = await response.json();
      const items: NotificationItem[] = Array.isArray(data) ? data : data.notifications || [];

      if (!Array.isArray(items) || items.length === 0) {
        throw new Error('Valid JSON retrieved, but no notification array was found.');
      }

      // Merge or replace items safely
      setNotifications(items);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      return { success: true, message: `Successfully fetched and synced ${items.length} notifications from GitHub!`, count: items.length };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Failed to fetch from GitHub URL. Ensure CORS is allowed or use GitHub Raw format.'
      };
    } finally {
      setIsSyncing(false);
    }
  };

  const getAdminLink = () => {
    const origin = window.location.origin;
    return `${origin}/#admin`;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isDrawerOpen,
        setIsDrawerOpen,
        isAdminView,
        setIsAdminView,
        addNotification,
        updateNotification,
        deleteNotification,
        toggleActiveStatus,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        resetToDefaults,
        githubFeedUrl,
        setGithubFeedUrl,
        syncFromGithub,
        isSyncing,
        lastSyncTime,
        adminSecretKey: ADMIN_SECRET,
        getAdminLink,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
