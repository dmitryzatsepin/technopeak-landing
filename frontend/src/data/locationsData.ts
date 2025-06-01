// src/data/locationsData.ts

import dubaiImage from '../assets/img/locations/dubai.png';
import londonImage from '../assets/img/locations/london.png';
import moscowImage from '../assets/img/locations/moscow.png';

export interface LocationData {
  id: string;
  name: string;
  coords: { x: number; y: number };
  image: string;
  description: string;
}

export const locations: LocationData[] = [
  {
    id: 'dubai',
    name: 'Dubai Office',
    coords: { x: 60, y: -52 },
    image: dubaiImage,
    description: 'Our main hub in the Middle East, driving innovation.',
  },
  {
    id: 'london',
    name: 'London Office',
    coords: { x: 41.5, y: -72 },
    image: londonImage,
    description: 'Connecting with European markets.',
  },
  {
    id: 'moscow',
    name: 'Moscow Office',
    coords: { x: 50, y: -75 },
    image: moscowImage,
    description: 'Supporting our clients in Eastern Europe.',
  },
];