import React, { useRef, useState } from 'react';
import { Container, Title, Text, Card, Image } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const navigationPrevRef = useRef<HTMLDivElement>(null);
    const navigationNextRef = useRef<HTMLDivElement>(null);
  
    return (
      <Container size="xl" py="xl" className={classes.sliderContainer}>
        <Title order={2} mb="sm">Our History</Title>
        <Text mb="xl" c="dimmed">The description of timeline slider</Text>
  
        <Swiper
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor
        loop
        centeredSlides
        slidesPerView={4} // фиксированное количество видимых слайдов
        spaceBetween={30} // уменьшаем расстояние между слайдами
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100, // уменьшаем глубину эффекта
          modifier: 1,
          slideShadows: false,
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSwiper={setSwiper}
        className={classes.swiper}
      >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className={classes.slide}>
              <Card shadow="lg" radius="lg" className={classes.card}>
                <Card.Section>
                  <Image src={slide.image} alt={slide.title} height={300} fit="cover" />
                </Card.Section>
                <Title order={4} mt="md">{slide.title}</Title>
                <Text size="sm" mt="xs" c="dimmed">{slide.description}</Text>
              </Card>
            </SwiperSlide>
          ))}
  
          <div className={classes.navigationWrapper}>
            <div 
              ref={navigationPrevRef} 
              className={classes.swiperButtonPrev} 
              onClick={() => swiper?.slidePrev()}
            />
            <div 
              ref={navigationNextRef} 
              className={classes.swiperButtonNext}
              onClick={() => swiper?.slideNext()}
            />
          </div>
        </Swiper>
      </Container>
    );
  };