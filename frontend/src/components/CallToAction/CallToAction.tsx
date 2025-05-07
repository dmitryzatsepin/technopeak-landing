import { Container, Text, Title, Button, Group } from '@mantine/core';
import { Link as ScrollLink } from 'react-scroll'; // Для плавной прокрутки
import classes from './CallToAction.module.css'; // Создайте этот CSS-модуль

interface CallToActionProps {
  title: React.ReactNode; // Делаем title React узлом для возможности вставки <br/> или стилизованных span
  description: string;
  buttonText: string;
  scrollToId: string; // ID секции, к которой нужно прокрутить (наша форма в футере)
}

export function CallToAction({ title, description, buttonText, scrollToId }: CallToActionProps) {
  return (
    <div className={classes.wrapper}> {/* Обертка для фона/градиента */}
      <Container size="lg" py="xl">
        <Group justify="center">
          <div className={classes.content}>
            <Title className={classes.title} order={2}>{title}</Title>
            <Text className={classes.description} mt="sm" mb="md">
              {description}
            </Text>
            <ScrollLink to={scrollToId} smooth duration={800}>
              <Button
                variant="white" // Белая кнопка на цветном фоне
                color="dark" // Темный текст на белой кнопке
                size="lg"
                className={classes.button}
              >
                {buttonText}
              </Button>
            </ScrollLink>
          </div>
        </Group>
      </Container>
    </div>
  );
}