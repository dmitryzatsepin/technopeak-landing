// src/components/ScrollTest.tsx
import { useEffect, useState } from 'react';
import { useWindowScroll } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';

export function ScrollTest() {
  const [scroll, scrollTo] = useWindowScroll(); // Используем хук
  const [manualScrollY, setManualScrollY] = useState(window.scrollY);

  // Отслеживание через useWindowScroll
  useEffect(() => {
    console.log('[Mantine Hook] scroll.y:', scroll.y, 'scroll.x:', scroll.x);
  }, [scroll.y, scroll.x]);

  // Отслеживание через нативный EventListener
  useEffect(() => {
    const handleManualScroll = () => {
      setManualScrollY(window.scrollY);
      console.log('[Manual Listener] window.scrollY:', window.scrollY);
    };

    window.addEventListener('scroll', handleManualScroll, { passive: true });
    // Первоначальное значение
    handleManualScroll(); 

    return () => {
      window.removeEventListener('scroll', handleManualScroll);
    };
  }, []);

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        zIndex: 9999,
        borderRadius: '4px',
      }}
    >
      <Text size="sm">Mantine scroll.y: {scroll.y}</Text>
      <Text size="sm">Manual window.scrollY: {manualScrollY}</Text>
      <button onClick={() => scrollTo({ y: 0 })}>Scroll to Top (Mantine)</button>
    </Box>
  );
}