// src/data/servicesData.tsx
import React from 'react'; // Нужен для типа React.ElementType
import { IconCpu, IconDatabase, IconCloudComputing, IconProps } from '@tabler/icons-react';

export interface SolutionItem {
  icon: React.ElementType<IconProps>;
  title: string;
  description: string;
  link: string;
}

export const solutionsData: SolutionItem[] = [
  {
    icon: IconCpu,
    title: 'Government',
    description: 'Seamless integration and customization of leading CRM platforms to fit your business needs perfectly.',
    link: '/solutions/government',
  },
  {
    icon: IconDatabase,
    title: 'Real Estate Developer',
    description: 'Secure and efficient data migration services, ensuring data integrity and accessibility.',
    link: '/solutions/real-estate-developer',
  },
  {
    icon: IconCloudComputing,
    title: 'Real Estate Brokerage',
    description: 'Leverage the power of the cloud with our expert consultation and implementation services.',
    link: '/solutions/real-estate-brokerage',
  },
];