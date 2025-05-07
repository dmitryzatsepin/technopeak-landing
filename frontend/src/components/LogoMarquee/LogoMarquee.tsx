// src/components/LogoMarquee/LogoMarquee.tsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Image, Box, Container, Title } from '@mantine/core';
import classes from './LogoMarquee.module.css';

// --- Интерфейс Logo ---
interface Logo {
  src: string;
  alt: string;
}

// --- Динамический импорт и logosData (код без изменений) ---
const logoModules = import.meta.glob<{ default: string }>('../../assets/img/logos/*.png', { eager: true });
const logosData: Logo[] = Object.entries(logoModules).map(
  ([path, module]: [string, { default: string }]) => {
    const fileName = path.split('/').pop()?.replace('.png', '') ?? 'logo';
    return {
      src: module.default,
      alt: `Client ${fileName.replace('logo', '')}`,
    };
  }
);
// --- Конец динамического импорта ---


interface LogoMarqueeProps {
    title?: string;
}

export function LogoMarquee({ title = "Trusted By" }: LogoMarqueeProps) {

  if (!logosData || logosData.length === 0) {
    return null;
  }

  return (
    // Общий контейнер секции с вертикальными отступами и фоном
    // Убираем py="xl" отсюда, если управляем отступами через CSS или ниже
    <Box component="section" className={classes.wrapper}>

      {/* Заголовок остается внутри Container для выравнивания */}
      {title && (
        <Container size="xl" pt="xl"> {/* Добавляем отступ сверху для заголовка */}
            <Title order={2} ta="center" mb="xl">
                {title}
            </Title>
        </Container>
      )}

      {/* Marquee выносим из Container, чтобы он занял всю ширину */}
      {/* Добавляем вертикальные отступы здесь, если нужно (например, pb="xl") */}
      <Box pt={title ? 0 : 'xl'} pb="xl"> {/* Условный отступ сверху и отступ снизу */}
          <Marquee
            gradient={false} // На полном экране градиент может быть полезен: gradient={true} gradientWidth={50}
            speed={50}
            pauseOnHover={true}
            // autoFill={true} // Можно добавить, если логотипов мало для заполнения экрана
          >
            {logosData.map((logo: Logo, index: number) => (
              <Box key={index} className={classes.logoBox}> {/* Стили logoBox/logoImage контролируют размер */}
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  className={classes.logoImage}
                  fallbackSrc="https://via.placeholder.com/150x50?text=Logo"
                />
              </Box>
            ))}
          </Marquee>
      </Box>

    </Box>
  );
}