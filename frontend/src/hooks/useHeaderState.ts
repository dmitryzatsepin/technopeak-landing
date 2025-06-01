import { useState, useEffect, useCallback } from 'react';
import { useWindowScroll } from '@mantine/hooks';

export const HEADER_HEIGHT_PX = 80;
const SCROLL_THRESHOLD = 10;
const MOBILE_BREAKPOINT = 990;

export interface HeaderState {
  isMobile: boolean;
  isScrolled: boolean;
  mobileMenuOpened: boolean;
  toggleMobileMenu: () => void;
}

export function useHeaderState(): HeaderState {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scroll] = useWindowScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Эффект для определения мобильной версии
  useEffect(() => {
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const updateIsMobile = () => setIsMobile(mobileQuery.matches);
    
    updateIsMobile();
    mobileQuery.addEventListener('change', updateIsMobile);
    return () => mobileQuery.removeEventListener('change', updateIsMobile);
  }, []);

  // Эффект для определения прокрутки страницы
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > SCROLL_THRESHOLD;
      setIsScrolled(prev => shouldBeScrolled !== prev ? shouldBeScrolled : prev);
    };

    // Initial check
    handleScroll();
    
    // Mantine hook fallback
    const shouldBeScrolled = scroll.y > SCROLL_THRESHOLD;
    setIsScrolled(prev => shouldBeScrolled !== prev ? shouldBeScrolled : prev);

    // Native event listener as fallback
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scroll.y]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpened(prev => !prev);
  }, []);

  return {
    isMobile,
    isScrolled,
    mobileMenuOpened,
    toggleMobileMenu,
  };
}
