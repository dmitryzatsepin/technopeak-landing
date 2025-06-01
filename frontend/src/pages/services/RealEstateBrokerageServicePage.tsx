// src/pages/services/RealEstateBrokerageServicePage.tsx
import { Text, List, ListItem, ThemeIcon, Stack } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { ServicePageLayout } from '../../layouts/solutions/ServicePageLayout'; // Проверьте путь

export function RealEstateBrokerageServicePage() {
  const pageTitle = "Solutions for Real Estate Brokerages";
  const breadcrumb = "Real Estate Brokerages";

  return (
    <ServicePageLayout title={pageTitle} breadcrumbLabel={breadcrumb}>
      <Stack gap="lg">
        <Text>
          TechnoPeak enables real estate brokerages to leverage the full power of the cloud. 
          Our expert consultation and implementation services for CRM and other cloud technologies 
          help you manage listings, clients, and agents more effectively.
        </Text>
        
        <Text fw={500}>Cloud Solutions for Brokerages:</Text>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="cyan" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <ListItem>Custom Bitrix24 CRM Implementation</ListItem>
          <ListItem>Agent Management and Performance Tracking Tools</ListItem>
          <ListItem>Automated Marketing Campaigns and Lead Nurturing</ListItem>
          <ListItem>Virtual Tour and Online Showing Integrations</ListItem>
          <ListItem>Secure Document Management and Transaction Coordination</ListItem>
        </List>
        <Text>
          Boost your brokerage's productivity and client satisfaction with our tailored cloud solutions.
        </Text>
      </Stack>
    </ServicePageLayout>
  );
}