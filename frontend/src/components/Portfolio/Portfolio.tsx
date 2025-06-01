// src/components/Portfolio/Portfolio.tsx
import { Container, Title, Text, SimpleGrid, Card, Image, Badge, Stack, Button, Box, rem } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom';
import classes from './Portfolio.module.css';

import { casesData, CaseItem } from '../../data/portfolioData';

export function Portfolio() {
  const caseCards = casesData.map((caseItem: CaseItem) => (
    <Card
      key={caseItem.title}
      shadow="sm"
      padding="lg"
      radius={'md'}
      withBorder
      className={classes.card}
    >
      <Card.Section>
        <Image
          src={caseItem.image}
          height={180}
          alt={caseItem.title}
          fallbackSrc="https://via.placeholder.com/400x180?text=Image+Not+Found" // Хорошая практика
        />
      </Card.Section>

      <Stack justify="space-between" mt="md" mb="xs" gap="xs">
        <Badge
          color="accentPink"
          variant="light"
          size="sm"
        >
          {caseItem.category}
        </Badge>
        <Text
          fw={500}
          lineClamp={2}
          className={classes.cardTitle}
          component="h3"
          size="lg"
        >
          {caseItem.title}
        </Text>
      </Stack>

      <Text
        size="sm"
        c="dimmed"
        lineClamp={3}
        fw={300}
        className={classes.cardDescription}
        mt="xs"
      >
        {caseItem.description}
      </Text>

      <Button
        className={classes.viewCaseButton}
        component={RouterLink} 
        to={caseItem.link}
        variant="outline"
        mt="md"
        color="accentGreen"
        rightSection={<IconArrowRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
      >
        View Case Study
      </Button>
    </Card>
  ));

  return (
    <Box className={classes.wrapper} id="portfolio">
      <Container size="xl" py="xl">
        <Title
          order={2}
          ta="center"
          mt="sm"
          className={classes.sectionTitle}
        >
          Our Latest Cases
        </Title>
        <Text
          c="dimmed"
          ta="center"
          mt="md"
          mb="xl"
          fw={300}
          className={classes.sectionSubtitle}
        >
          See how we've helped businesses like yours succeed with our innovative solutions.
        </Text>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 'md', sm: 'lg', lg: 'xl' }} // Адаптивные отступы
          verticalSpacing={{ base: 'md', sm: 'lg', lg: 'xl' }}
        >
          {caseCards}
        </SimpleGrid>
      </Container>
    </Box>
  );
}