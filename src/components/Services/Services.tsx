import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Button, rem } from '@mantine/core';
import { IconArrowRight, IconCpu, IconDatabase, IconCloudComputing } from '@tabler/icons-react'; // Пример иконок
import classes from './Services.module.css'; // Создай этот CSS-модуль

// Пример данных. В реальном приложении они могут приходить из API или CMS
const solutionsData = [
  {
    icon: IconCpu,
    title: 'Government',
    description: 'Seamless integration and customization of leading CRM platforms to fit your business needs perfectly.',
    link: '/solutions/crm-implementation', // Ссылка на детальную страницу (если есть)
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
  // Добавь больше решений по необходимости
];

export function Services() {
  const features = solutionsData.map((solution) => (
    <Card key={solution.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <ThemeIcon
        size="xl"
        radius={0} // Устанавливаем явно, если тема не сработала
        color="accentPink" // Используем цвет из темы
        // Убираем variant="gradient" и gradient={{...}}
      >
        <solution.icon style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" fw={500} mt="md">
        {solution.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {solution.description}
      </Text>
      {/* Используй Link из react-router-dom если это внутренний роут */}
      {/* Или просто Button/Anchor для внешних ссылок или модальных окон */}
      <Button className={classes.learnMoreButton} 
        component="a" // Или Link если используешь react-router-dom
        href={solution.link} // Или to={solution.link} для Link
        variant="outline"
        mt="md"
        rightSection={<IconArrowRight size={14} />}
      >
        Learn More
      </Button>
    </Card>
  ));

  return (
    <Container size="xl" py="xl" className={classes.wrapper} id="solutions"> {/* Добавлен ID */}
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
  );
}