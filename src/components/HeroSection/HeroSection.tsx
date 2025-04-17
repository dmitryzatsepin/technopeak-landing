import { BackgroundImage, Overlay, Flex, Box, rem } from '@mantine/core';
import { Welcome } from '../Welcome/Welcome';
import bgImage from '../../assets/img/bg.jpg';

const HEADER_HEIGHT_PX = 80;

export function HeroSection() {
  return (
    <Box style={{ position: 'relative', minHeight: '100vh' }}>

      <BackgroundImage src={bgImage} style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 0, 
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        }}
      >
      <Overlay color="black" opacity={0.8} zIndex={1} />
      </BackgroundImage>

      <Box style={{ 
        position: 'relative', 
        zIndex: 2 
        }}
      >
        <Flex 
          mih="100vh" 
          align="center"
          justify="center"
          style={{ paddingTop: rem(HEADER_HEIGHT_PX) }}
        >
          <Welcome />
        </Flex>
      </Box>
    </Box>
  );
}