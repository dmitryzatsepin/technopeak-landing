import React, { useRef } from 'react';
import { Container, Title, Text, Card, Image, Group, ActionIcon, Box, rem, useMantineTheme } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

// Стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';

import classes from './TimelineSlider.module.css';

interface SlideData {
  image: string;
  title: string;
  description: string;
}

const slides: SlideData[] = [
    { image: 'https://menaa.com/wp-content/uploads/2020/04/our-story-822x1024.jpg', title: '2019', description: 'Description for 2019' },
    { image: 'https://menaa.com/wp-content/uploads/2020/04/our-story-822x1024.jpg', title: '2020', description: 'Description for 2020' },
    { image: 'https://menaa.com/wp-content/uploads/2020/04/our-story-822x1024.jpg', title: '2021', description: 'Description for 2021' },
    { image: 'https://menaa.com/wp-content/uploads/2020/04/our-story-822x1024.jpg', title: '2022', description: 'Description for 2022' },
    { image: 'https://menaa.com/wp-content/uploads/2020/04/our-story-822x1024.jpg', title: '2023', description: 'Description for 2023' },
    { image: 'https://menaa.com/wp-content/uploads/2020/04/our-story-822x1024.jpg', title: '2024', description: 'Description for 2024' },
    { image: 'https://menaa.com/wp-content/uploads/2020/04/our-story-822x1024.jpg', title: '2025', description: 'Description for 2025' },
];

export const TimelineSlider = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const theme = useMantineTheme();

    const handlePrev = () => {
        console.log('Prev button clicked. Calling slidePrev()');
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        console.log('Next button clicked. Calling slideNext()');
        swiperRef.current?.slideNext();
    };

    const slideElements = slides.map((slide, index) => (
        <SwiperSlide key={index} className={classes.slide}>
          <Card shadow="md" radius={0} className={classes.card}>
            <Card.Section>
              <Image src={slide.image} alt={slide.title} height={400} fit="cover" />
            </Card.Section>
            <Box p="md">
                <Title order={4} mt="xs">{slide.title}</Title>
                <Text size="sm" mt={5} c="dimmed">{slide.description}</Text>
            </Box>
          </Card>
        </SwiperSlide>
      ));

    return (
      <Container size="xl" py="xl" className={classes.sliderContainer}>
        <Group justify="space-between" mb="lg">
            <div>
                <Title order={2} ta="center" mb="xs">Our History</Title>
                {/* <Text ta="center" c="dimmed">The description of timeline slider</Text> */}
            </div>
            <Group gap="xs" className={classes.navigationWrapper}>
              {/* Кнопки навигации */}
              <ActionIcon
                variant="filled" 
                color={theme.primaryColor} 
                size="lg"
                onClick={handlePrev}
                aria-label="Previous slide" 
                className={classes.navButton}
              >
                <IconArrowLeft style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                variant="filled" 
                color={theme.primaryColor} 
                size="lg"
                onClick={handleNext}
                aria-label="Next slide" 
                className={classes.navButton}
              >
                <IconArrowRight style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </ActionIcon>
            </Group>
        </Group>

        <Swiper
            modules={[Navigation]}
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={30}
            breakpoints={{
              [theme.breakpoints.sm]: { slidesPerView: 2, spaceBetween: theme.spacing.lg },
              [theme.breakpoints.lg]: { slidesPerView: 3, spaceBetween: theme.spacing.xl },
              [theme.breakpoints.xl]: { slidesPerView: 4, spaceBetween: theme.spacing.xl },
          }}
            navigation={false}
            onSwiper={(swiperInstance) => {
                swiperRef.current = swiperInstance;
                console.log('Swiper initialized (simplified).');
            }}
            className={classes.swiperContainer}
        >
          {slideElements}
        </Swiper>
      </Container>
    );
};