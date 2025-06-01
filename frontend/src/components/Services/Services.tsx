import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Button, Box, rem } from '@mantine/core';
import { IconArrowRight, IconCpu, IconDatabase, IconCloudComputing } from '@tabler/icons-react';
import classes from './Services.module.css';

const solutionsData = [
  {
    icon: IconCpu,
    title: 'Government',
    description: 'Seamless integration and customization of leading CRM platforms to fit your business needs perfectly.',
    link: '/solutions/crm-implementation',
  },
  {
    icon: IconDatabase,
    title: 'Real Estate Developer',
    description: 'Secure and efficient data migration services, ensuring data integrity and accessibility.',
    link: '/solutions/data-migration',
  },
  {
    icon: IconCloudComputing,
    title: 'Real Estate Brokerage',
    description: 'Leverage the power of the cloud with our expert consultation and implementation services.',
    link: '/solutions/cloud',
  },
];

export function Services() {
  const features = solutionsData.map((solution) => (
    <Card key={solution.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <ThemeIcon
        size="xl"
        radius={0}
        color="accentPink"
      >
        <solution.icon style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" fw={500} mt="md">
        {solution.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {solution.description}
      </Text>
      <Button classNames={{
        root: classes.learnMoreButton
      }} 
        component="a"
        href={solution.link}
        variant="outline"
        mt="md"
        color="accentGreen"
        rightSection={<IconArrowRight size={14} />}
      >
        Learn More
      </Button>
    </Card>
  ));

  return (
    <Box className={classes.wrapper} id="solutions">
      {/* Внутренний Container для контента */}
      <Container size="xl" py="xl">
        <Title order={2} ta="center" mt="sm">
          Our Solutions
        </Title>
        <Text c="dimmed" ta="center" mt="md" mb="xl">
          Tailored IT solutions designed to drive growth and efficiency for your business in the Middle East.
        </Text>

        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
    </Box>
  );
}