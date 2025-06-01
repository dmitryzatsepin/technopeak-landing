// src/components/LocationsMap/LocationsMap.tsx
import React, { useState } from 'react';
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
import { locations, LocationData } from '../../data/locationsData'; 
import worldMapImage from '../../assets/img/world-map.png'; // <-- Убедитесь, что путь корректен

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

          {locations.map((location: LocationData) => (
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
                       color={theme.colors.pink[6]}
                    />
                </ActionIcon>
              </Popover.Target>

              <Popover.Dropdown className={classes.popoverDropdown}>
                 <Stack gap="xs">
                  <Image src={location.image} alt={location.name} height={100} fit="cover" radius="sm" />
                  <Text fw={700} size="sm">{location.name}</Text>
                  <Text size="xs" c="dimmed">{location.description}</Text>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          ))}
        </Box>
      </Container>
    </Box>
  );
}