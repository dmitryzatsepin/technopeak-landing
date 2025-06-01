// src/components/LogoMarquee/LogoMarquee.tsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Image, Box, Container, Title } from '@mantine/core';
import classes from './LogoMarquee.module.css';

interface Logo {
  src: string;
  alt: string;
}

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

interface LogoMarqueeProps {
    title?: string;
}

export function LogoMarquee({ title = "Trusted By" }: LogoMarqueeProps) {

  if (!logosData || logosData.length === 0) {
    return null;
  }

  return (
    <Box component="section" className={classes.wrapper}>
      {title && (
        <Container size="xl" pt="xl">
            <Title order={2} ta="center" mb="xl">
                {title}
            </Title>
        </Container>
      )}

      <Box pt={title ? 0 : 'xl'} pb="xl">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
          >
            {logosData.map((logo: Logo, index: number) => (
              <Box key={index} className={classes.logoBox}>
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