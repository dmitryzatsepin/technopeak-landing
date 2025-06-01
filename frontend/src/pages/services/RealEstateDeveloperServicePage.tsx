// src/pages/services/RealEstateDeveloperServicePage.tsx
import { Text, List, ListItem, ThemeIcon, Stack, Image } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { ServicePageLayout } from '../../layouts/solutions/ServicePageLayout'; // Проверьте путь
// import developerImage from '../../assets/img/services/developer.jpg'; // Пример изображения

export function RealEstateDeveloperServicePage() {
  const pageTitle = "Solutions for Real Estate Developers";
  const breadcrumb = "Real Estate Developers";

  return (
    <ServicePageLayout title={pageTitle} breadcrumbLabel={breadcrumb}>
      <Stack gap="lg">
        {/* {developerImage && <Image src={developerImage} alt={pageTitle} radius="md" mb="lg" height={300} fit="cover" />} */}
        <Text>
          For real estate developers, TechnoPeak provides secure and efficient data migration services, 
          ensuring the integrity and accessibility of your critical project and client information. 
          We help streamline your operations from land acquisition to sales.
        </Text>
        
        <Text fw={500}>How We Help Developers:</Text>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <ListItem>Secure Data Migration from legacy systems</ListItem>
          <ListItem>Project Management CRM Customization</ListItem>
          <ListItem>Sales and Lead Management Automation</ListItem>
          <ListItem>Integration with Financial and ERP Systems</ListItem>
          <ListItem>Client Portals and Post-Sales Support Systems</ListItem>
        </List>
        <Text>
          Our solutions empower developers to manage projects effectively, enhance client communication, 
          and accelerate sales cycles.
        </Text>
      </Stack>
    </ServicePageLayout>
  );
}