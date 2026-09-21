import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import { ProfileProvider } from './context/ProfileContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { NotificationDrawer } from './components/NotificationDrawer';
import { NotificationManager } from './components/NotificationManager';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { QuickPhotoBanner } from './components/QuickPhotoBanner';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { isAdminView, setIsAdminView } = useNotifications();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const scrollToSection = (id: string) => {
    if (isAdminView) {
      setIsAdminView(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileNav = (target: string) => {
    if (target === 'home') scrollToSection('home');
    else if (target === 'work') scrollToSection('work');
    else if (target === 'about') scrollToSection('about');
    else if (target === 'contact') scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#080b14] text-[#111522] dark:text-white relative flex flex-col font-sans transition-colors duration-300">
      
      {/* If in secret admin management view, show the full manager page */}
      {isAdminView ? (
        <NotificationManager onShowToast={showToast} />
      ) : (
        <>
          {/* Ambient lighting accents */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#3946f4]/6 dark:bg-[#3946f4]/12 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          {/* Quick Real Photo Sync Banner */}
          <QuickPhotoBanner onShowToast={showToast} />

          {/* Navigation Bar */}
          <Navbar 
            onOpenContact={() => scrollToSection('contact')} 
            onExploreWork={() => scrollToSection('work')}
          />

          {/* Main Portfolio Sections */}
          <main className="flex-1 pb-24 md:pb-0">
            <Hero
              onExploreWork={() => scrollToSection('work')}
              onAboutClick={() => scrollToSection('about')}
            />
            <WorkSection onShowToast={showToast} />
            <AboutSection />
            <ServicesSection onOpenContact={() => scrollToSection('contact')} />
            <ContactSection onShowToast={showToast} />
          </main>

          {/* Floating Mobile Dock - Vision of the reference mobile screen */}
          <MobileBottomNav 
            onNavClick={handleMobileNav} 
            onOpenQuickContact={() => scrollToSection('contact')}
          />

          {/* Notification Slide-Over Drawer */}
          <NotificationDrawer onShowToast={showToast} />
        </>
      )}

      {/* Global Feedback Toast */}
      <Toast message={toastMessage} />

      {/* Real Photos & Identity Management Modal */}
      <PhotoManagerModal onShowToast={showToast} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ProfileProvider>
          <AppContent />
        </ProfileProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
