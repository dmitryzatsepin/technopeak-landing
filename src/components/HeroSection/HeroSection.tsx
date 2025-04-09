import { BackgroundImage, Overlay, Flex, Box } from '@mantine/core';
import { AppHeader } from '../Header/Header';
import { Welcome } from '../Welcome/Welcome';
import bgImage from '../../assets/img/bg.jpg';

export function HeroSection() {
  return (
    <Box style={{ position: 'relative' }}>

      <BackgroundImage src={bgImage} style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 0 
        }}
      >
      <Overlay color="black" opacity={0.8} zIndex={1} />
      </BackgroundImage>

      <Box style={{ 
        position: 'relative', 
        zIndex: 2 
        }}
      >
        <AppHeader />
        <Flex 
          mih="calc(100vh - 80px)" 
          align="center"
        >
          <Welcome />
        </Flex>
      </Box>
    </Box>
  );
}