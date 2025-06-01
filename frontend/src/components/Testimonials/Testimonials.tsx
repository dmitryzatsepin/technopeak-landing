import { Container, Title, Text, SimpleGrid, Blockquote, Avatar, Rating } from '@mantine/core';
import classes from './Testimonials.module.css'; // Создай этот CSS-модуль

// Пример данных
const testimonialsData = [
  {
    quote: "Working with TECHNOPEAK was a game-changer for our customer relations. Their CRM expertise is unmatched in the region.",
    name: 'Ahmed Al Futtaim',
    title: 'CEO, Retail Solutions Inc.',
    avatar: 'https://i.pravatar.cc/150?img=1', // Используй реальные аватары или плейсхолдеры
    rating: 5,
  },
  {
    quote: "The team's professionalism and dedication during the cloud migration project were outstanding. Highly recommended.",
    name: 'Fatima Al Hammadi',
    title: 'CTO, Finance Group ME',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
  },
  {
    quote: "They delivered a complex data analytics platform on time and budget. The insights we gain now are invaluable.",
    name: 'Johnathan Lee',
    title: 'Operations Director, Global Logistics',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 4,
  },
  // Добавь больше отзывов
];

export function Testimonials() {
  const items = testimonialsData.map((testimonial) => (
    <Blockquote
      key={testimonial.name}
      color="white"
      cite={
        <>
          <Avatar src={testimonial.avatar} radius="xl" mr="sm" />
          <Text size="sm" fw={500}>
            {testimonial.name}
          </Text>
          <Text size="xs" c="dimmed">
            {testimonial.title}
          </Text>
        </>
      }
      mt="xl"
      className={classes.testimonial}
    >
      <Rating value={testimonial.rating} fractions={2} readOnly mb="xs"/>
      {testimonial.quote}
    </Blockquote>
  ));

  return (
    <Container size="xl" py="xl" className={classes.wrapper} id="testimonials"> {/* Добавлен ID */}
       <Title order={2} ta="center" mt="sm">
        What Our Clients Say
      </Title>
      <Text c="dimmed" ta="center" mt="md" mb="xl">
        Don't just take our word for it – hear from clients who have experienced the TECHNOPEAK difference.
      </Text>

      {/* Можно использовать Swiper для карусели, если отзывов много */}
      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 'lg', md: 'xl' }}>
        {items}
      </SimpleGrid>
    </Container>
  );
}