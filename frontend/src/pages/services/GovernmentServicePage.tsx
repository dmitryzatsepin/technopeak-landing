// src/pages/services/GovernmentServicePage.tsx
import { Text, List, ListItem, ThemeIcon, Stack } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { ServicePageLayout } from '../../layouts/solutions/ServicePageLayout'; // Проверьте путь

export function GovernmentServicePage() {
  const pageTitle = "Government Solutions";
  const breadcrumb = "Government";

  return (
    <ServicePageLayout title={pageTitle} breadcrumbLabel={breadcrumb}>
      <Stack gap="lg">
        <Text>
          TechnoPeak offers comprehensive IT solutions tailored for government institutions, 
          focusing on seamless integration and customization of leading CRM platforms. 
          Our goal is to enhance operational efficiency, improve citizen services, and ensure data security.
        </Text>
        
        <Text fw={500}>Key Offerings:</Text>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <ListItem>Custom Bitrix24 CRM Implementation</ListItem>
          <ListItem>Data Migration and System Integration</ListItem>
          <ListItem>Process Automation and Workflow Optimization</ListItem>
          <ListItem>Citizen Portal Development</ListItem>
          <ListItem>Enhanced Security and Compliance Solutions</ListItem>
        </List>

        <Text>
          We understand the unique challenges faced by public sector organizations and provide robust, scalable, 
          and secure solutions to meet specific requirements.
        </Text>
        {/* Добавьте больше контента: кейсы, преимущества, CTA и т.д. */}
      </Stack>
    </ServicePageLayout>
  );
}