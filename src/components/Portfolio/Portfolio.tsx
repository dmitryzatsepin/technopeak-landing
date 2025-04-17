// src/components/Portfolio/Portfolio.tsx

import { Container, Title, Text, SimpleGrid, Card, Image, Badge, Stack,Button, Group, rem } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './Portfolio.module.css'; // Убедитесь, что этот файл существует и содержит необходимые классы

// --- ИМПОРТИРУЕМ ИЗОБРАЖЕНИЯ ---
// Убедитесь, что пути верны относительно этого файла
import case1ImageUrl from '../../assets/img/case1.png';
import case2ImageUrl from '../../assets/img/case2.png';
import case3ImageUrl from '../../assets/img/case3.png';
// ---------------------------------

const casesData = [
  {
    image: case1ImageUrl,
    title: 'CRM Overhaul for Retail Giant',
    category: 'Retail',
    description: 'Complete CRM system implementation resulting in a 30% increase in sales efficiency.',
    link: '/cases/retail-crm',
  },
  {
    image: case2ImageUrl,
    title: 'Cloud Migration for Finance Corp',
    category: 'Finance',
    description: 'Migrated legacy systems to a secure cloud infrastructure, improving performance and scalability.',
    link: '/cases/finance-cloud',
  },
  {
    image: case3ImageUrl,
    title: 'Data Analytics Platform for Logistics Company with Extremely Long Name',
    category: 'Logistics',
    description: 'Developed a custom data analytics platform providing real-time insights into operations. This involved complex data warehousing and BI tool integration.',
    link: '/cases/logistics-data',
  },
  // Добавьте больше кейсов по необходимости
];

export function Portfolio() {
  const caseCards = casesData.map((caseItem) => (
    <Card
      key={caseItem.title}
      shadow="sm"
      padding="lg"
      radius={0}
      withBorder
      className={classes.card}
    >
      <Card.Section>
        <Image
          src={caseItem.image}
          height={180}
          alt={caseItem.title}
          fallbackSrc="https://via.placeholder.com/400x180?text=Image+Not+Found"
        />
      </Card.Section>

      <Stack justify="space-between" mt="md" mb="xs">
        {/* Категория (category) - Graphik LCG Medium */}
        <Badge
          color="accentPink"
          variant="light"
          fw={300}
        >
          {caseItem.category}
        </Badge>
        {/* Заголовок карточки (title) - Graphik LCG Medium */}
        <Text
          fw={300}
          lineClamp={1}
          className={classes.cardTitle}
        >
          {caseItem.title}
        </Text>
      </Stack>

      {/* Описание (description) - Graphik LCG Light */}
      <Text
        size="sm"
        c="dimmed"
        lineClamp={3}
        fw={300}
        className={classes.cardDescription}
      >
        {caseItem.description}
      </Text>

      {/* Кнопка - Graphik LCG Medium */}
      <Button
        className={classes.viewCaseButton}
        component="a"
        href={caseItem.link}
        target="_blank"
        rel="noopener noreferrer"
        variant="light"
        color="accentGreen"
        fullWidth
        mt="md" // Отступ сверху
        rightSection={<IconArrowRight style={{ width: rem(14), height: rem(14) }} />}
        fw={500}
      >
        View Case Study
      </Button>
    </Card>
  ));

  return (
    // Контейнер секции
    <Container size="xl" py="xl" className={classes.wrapper} id="portfolio">
      <Title
        order={2}
        ta="center"
        mt="sm"
        fw={700}
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

      {/* Сетка для карточек */}
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="lg"
      >
        {caseCards}
      </SimpleGrid>
    </Container>
  );
}