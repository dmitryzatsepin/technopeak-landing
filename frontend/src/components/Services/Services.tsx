// src/components/Services/Services.tsx
import React from 'react';
import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Button, Box, rem } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom';
import classes from './Services.module.css';
import { solutionsData, SolutionItem } from '../../data/servicesData';

export function Services() {
  const features = solutionsData.map((solution: SolutionItem) => {
    const SolutionIcon = solution.icon;
    return (
      <Card key={solution.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <ThemeIcon
          size="xl"
          radius="md"
          variant="light"
          color="accentPink"
        >
          <SolutionIcon style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
        </ThemeIcon>
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {solution.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {solution.description}
        </Text>
        <Button
          className={classes.learnMoreButton}
          component={RouterLink}
          to={solution.link}
          variant="outline"
          mt="md"
          color="accentGreen"
          rightSection={<IconArrowRight size={16} stroke={1.5} />}
        >
          Learn More
        </Button>
      </Card>
    );
  });

  return (
    <Box className={classes.wrapper} id="services">
      <Container size="xl" py="xl">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Our Solutions
        </Title>
        <Text c="dimmed" ta="center" mt="md" mb="xl" className={classes.description}>
          Tailored IT solutions designed to drive growth and efficiency for your business in the Middle East.
        </Text>
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
    </Box>
  );
}