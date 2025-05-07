// src/components/LocationsMap/LocationsMap.tsx
import React, { useState } from 'react'; // <-- ИСПРАВЛЕНО: Добавлен импорт useState
import {
  Box,
  Container,
  Title,
  Image,
  Popover,
  Text,
  Stack,
  useMantineTheme,
  ActionIcon,
} from '@mantine/core';
import { IconMapPinFilled } from '@tabler/icons-react';
import classes from './LocationsMap.module.css';

// ... (импорты карты, фото, интерфейс LocationData, массив locations) ...
// Импортируем карту
import worldMapImage from '../../assets/img/world-map.png'; // <-- Укажи правильный путь!

// Импортируем фото локаций (или используй import.meta.glob как в LogoMarquee)
import dubaiImage from '../../assets/img/locations/dubai.png'; // Пример
import londonImage from '../../assets/img/locations/london.png'; // Пример
import moscowImage from '../../assets/img/locations/moscow.png'; // Пример
// ... добавь импорты для всех фото

// Описываем структуру данных для локации
interface LocationData {
  id: string;
  name: string;
  coords: { x: number; y: number }; // Координаты в % (left, top)
  image: string;
  description: string;
}

// Определяем данные филиалов
// ВАЖНО: Координаты (coords) нужно будет подбирать вручную!
const locations: LocationData[] = [
  {
    id: 'dubai',
    name: 'Dubai Office',
    coords: { x: 59.5, y: 61 }, // Примерные координаты для ОАЭ (left: 59.5%, top: 61%)
    image: dubaiImage,
    description: 'Our main hub in the Middle East, driving innovation.',
  },
  {
    id: 'london',
    name: 'London Office',
    coords: { x: 48.8, y: 38.5 }, // Примерные координаты для UK (left: 48.8%, top: 38.5%)
    image: londonImage,
    description: 'Connecting with European markets.',
  },
   {
    id: 'moscow',
    name: 'Moscow Office',
    coords: { x: 56, y: 35 }, // Примерные координаты для Москвы
    image: moscowImage,
    description: 'Supporting our clients in Eastern Europe.',
  },
  // ... Добавь остальные филиалы по аналогии
  // Пример для Северной Америки (Канада?)
  {
    id: 'canada',
    name: 'North America Office',
    coords: { x: 22, y: 30 }, // Примерные координаты
    image: londonImage, // Замени на реальное фото
    description: 'Serving clients across North America.',
  },
];


interface LocationsMapProps {
  title?: string;
}

export function LocationsMap({ title = 'Our Global Presence' }: LocationsMapProps) {
  const theme = useMantineTheme();
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

  return (
    <Box component="section" className={classes.wrapper}>
      <Container size="lg" py="xl">
        {title && (
          <Title order={2} ta="center" mb="xl">
            {title}
          </Title>
        )}

        <Box className={classes.mapContainer}>
          <Image src={worldMapImage} alt="World map showing company locations" className={classes.mapImage} />

          {locations.map((location) => (
            <Popover
              key={location.id}
              position="top"
              withArrow
              shadow="md"
              withinPortal
              opened={hoveredLocationId === location.id}
              transitionProps={{
                transition: 'fade',
                duration: 200,
                timingFunction: 'ease-in-out',
              }}
            >
              <Popover.Target>
                 <ActionIcon
                   variant="transparent"
                   className={classes.marker}
                   style={{
                     left: `${location.coords.x}%`,
                     top: `${location.coords.y}%`,
                   }}
                   aria-label={`Show details for ${location.name}`}
                   onMouseEnter={() => setHoveredLocationId(location.id)}
                   onMouseLeave={() => setHoveredLocationId(null)}
                >
                    <IconMapPinFilled
                       size={30}
                       color={theme.colors.accentPink[0]} // Используй свой цвет
                    />
                </ActionIcon>
              </Popover.Target>

              <Popover.Dropdown className={classes.popoverDropdown}>
                 <Stack gap="xs">
                  <Image src={location.image} alt={location.name} height={100} fit="cover" />
                  <Text fw={500} size="sm">{location.name}</Text>
                  <Text size="xs">{location.description}</Text>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          ))}
        </Box>
      </Container>
    </Box>
  );
}