// src/components/CallToAction/CallToAction.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Text,
  Title,
  Button,
  Group,
  Modal,
  TextInput,
  Stack,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form'; // Импортируем useForm
import classes from './CallToAction.module.css';

interface CallToActionProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
}

// Определяем тип для значений формы
interface FormValues {
  companyName: string;
  name: string;
  phone: string;
  email: string;
}

export function CallToAction({ title, description, buttonText }: CallToActionProps) {
  const [opened, setOpened] = useState(false); // Состояние для модального окна

  const form = useForm<FormValues>({
    initialValues: {
      companyName: '',
      name: '',
      phone: '',
      email: '',
    },
    validate: {
      companyName: (value) => (value.trim().length < 2 ? 'Company name must have at least 2 letters' : null),
      name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      phone: (value) => (/^\+?[0-9\s-()]{7,}$/.test(value) ? null : 'Invalid phone number'),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    console.log('CTA Form Submitted:', values);
    // Здесь будет ваша логика отправки данных (например, в CRM Битрикс24)
    alert(`Thank you, ${values.name} from ${values.companyName}! We will contact you soon at ${values.phone} or ${values.email}.`);
    form.reset();
    setOpened(false); // Закрываем модальное окно после отправки
  };

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // или 'unset' или то, что было до
    }
    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto'; // или 'unset'
    };
  }, [opened]);

  const openModal = () => {
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
    form.reset();
  };

  return (
    <> {/* Оборачиваем в React.Fragment, т.к. Modal будет рядом */}
      <div className={classes.wrapper}>
        <Container size="lg" py="xl">
          <Group justify="center">
            <div className={classes.content}>
              <Title className={classes.title} order={2}>{title}</Title>
              <Text className={classes.description} mt="sm" mb="md">
                {description}
              </Text>
              <Button
                variant="white"
                color="dark"
                size="lg"
                className={classes.button}
                onClick={() => setOpened(true)} // Открываем модальное окно по клику
              >
                {buttonText}
              </Button>
              {/* </ScrollLink> */}
            </div>
          </Group>
        </Container>
      </div>

      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          form.reset(); // Сбрасываем форму при закрытии
        }}
        title={`Request: ${buttonText}`} // Динамический заголовок модалки
        centered // Центрируем модальное окно
        size="md" // Размер модального окна, можно подобрать
        // Добавляем стили для модалки, если нужно, через classNames или стили в theme.ts
        // classNames={{ modal: classes.modalRoot, header: classes.modalHeader, title: classes.modalTitle }}
      >
        <Box component="form" onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack>
            <TextInput
              label="Company Name"
              placeholder="Your Company LLC"
              required
              {...form.getInputProps('companyName')}
            />
            <TextInput
              label="Your Name"
              placeholder="John Doe"
              required
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Phone Number"
              placeholder="+1 234 567 890"
              required
              {...form.getInputProps('phone')}
            />
            <TextInput
              label="Email"
              placeholder="you@company.com"
              type="email"
              required
              {...form.getInputProps('email')}
            />
            <Button type="submit" mt="md" color="accentGreen"> {/* Используйте свой акцентный цвет */}
              Submit Request
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}