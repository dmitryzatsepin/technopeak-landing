import { Container, Title, Text, SimpleGrid, Card, Image, Badge, Button, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './Portfolio.module.css'; // Создай этот CSS-модуль

// Пример данных
const casesData = [
  {
    image: 'https://via.placeholder.com/400x250/CCCCCC/969696?text=Case+Study+1', // Замени на реальные изображения
    title: 'CRM Overhaul for Retail Giant',
    category: 'Retail',
    description: 'Complete CRM system implementation resulting in a 30% increase in sales efficiency.',
    link: '/cases/retail-crm',
  },
  {
    image: 'https://via.placeholder.com/400x250/EEEEEE/969696?text=Case+Study+2',
    title: 'Cloud Migration for Finance Corp',
    category: 'Finance',
    description: 'Migrated legacy systems to a secure cloud infrastructure, improving performance and scalability.',
    link: '/cases/finance-cloud',
  },
  {
    image: 'https://via.placeholder.com/400x250/DDDDDD/969696?text=Case+Study+3',
    title: 'Data Analytics Platform for Logistics',
    category: 'Logistics',
    description: 'Developed a custom data analytics platform providing real-time insights into operations.',
    link: '/cases/logistics-data',
  },
  // Добавь больше кейсов
];

export function Portfolio() {
  const caseCards = casesData.map((caseItem) => (
    <Card key={caseItem.title} shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
      <Card.Section>
        {/* Используй Next/Image или оптимизируй изображения */}
        <Image
          src={caseItem.image}
          height={180}
          alt={caseItem.title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{caseItem.title}</Text>
        <Badge color="accentPink" variant="light" radius={0}>
            {caseItem.category}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {caseItem.description}
      </Text>

      <Button className={classes.viewCaseButton} 
        component="a"
        href={caseItem.link} 
        variant="light"
        fullWidth
        mt="md"
        rightSection={<IconArrowRight size={14} />}
      >
        View Case Study
      </Button>
    </Card>
  ));

  return (
    <Container size="xl" py="xl" className={classes.wrapper} id="cases"> {/* Добавлен ID */}
      <Title order={2} ta="center" mt="sm">
        Our Latest Cases
      </Title>
      <Text c="dimmed" ta="center" mt="md" mb="xl">
        See how we've helped businesses like yours succeed with our innovative solutions.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {caseCards}
      </SimpleGrid>
    </Container>
  );
}