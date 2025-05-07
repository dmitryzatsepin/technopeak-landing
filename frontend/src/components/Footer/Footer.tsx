import React, { useState } from 'react'; // Добавлен useState
import {
  Container, Group, ActionIcon, Text, Anchor, SimpleGrid, Image, Stack,
  Box, // Добавлен Box
  Title, // Добавлен Title
  Grid, // Добавлен Grid
  TextInput, // Добавлен TextInput
  Textarea, // Добавлен Textarea
  Button // Добавлен Button
} from '@mantine/core';
import { useForm } from '@mantine/form'; // Используем Mantine Form для удобства
import { IconBrandTwitter, IconBrandLinkedin, IconBrandFacebook, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import Logo from '../../assets/img/logo.png';
import classes from './Footer.module.css';

const footerLinks = [
  // Ваши ссылки...
  { link: '#home', label: 'Home' },
  { link: '#services', label: 'Solutions' },
  { link: '#portfolio', label: 'Cases' },
  { link: '#faq', label: 'FAQ' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  // --- Логика формы ---
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      message: (value) => (value.trim().length === 0 ? 'Message cannot be empty' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Form submitted:', values);
    // Здесь будет логика отправки данных (напр., fetch POST запрос)
    alert('Thank you for your message! We will get back to you soon.'); // Простое уведомление
    form.reset(); // Очистить форму после отправки
  };
  // --- Конец логики формы ---


  const mainLinks = footerLinks.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      size="sm"
      className={classes.link}
      // Для react-scroll используйте Link из react-scroll или добавьте onClick={scrollToSection}
      // Пример для hash-ссылок (если у вас scroll-behavior: smooth в CSS):
      onClick={(e) => {
         e.preventDefault();
         const targetId = link.link.substring(1); // Убираем #
         const targetElement = document.getElementById(targetId);
         if (targetElement) {
           targetElement.scrollIntoView({ behavior: 'smooth' });
         }
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <footer className={classes.footer} id="contacts"> {/* Основной ID для секции */}
      <Container size="xl">
        {/* --- Верхняя часть с колонками --- */}
        <div className={classes.inner}>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
              {/* Колонка 1: Лого и описание */}
              <Stack>
                <Image src={Logo} alt="TECHNOPEAK Logo" h={40} w="auto" fit="contain" />
                {/* <Text size="xs" c="dimmed" className={classes.description}>
                  Your trusted CRM Integrator in the Middle East, driving digital transformation.
                </Text> */}
              </Stack>

              {/* Колонка 2: Навигация */}
              <Stack>
                <Text fw={500}>Navigation</Text>
                {mainLinks}
                 <ScrollLink to="contact-form" smooth duration={800} style={{ textDecoration: 'none' }}>
                    <Anchor component="button" type="button" c="dimmed" size="sm" className={classes.link}>
                      Contact Form
                    </Anchor>
                 </ScrollLink>
              </Stack>

              {/* Колонка 3: Контакты */}
              <Stack>
                <Text fw={500}>Contact Us</Text>
                {/* ... ваши контакты (email, phone, address) ... */}
                <Anchor href="mailto:info@technopeak.com" size="sm" c="dimmed" className={classes.link}>
                  <Group gap="xs">
                    <IconMail size={16} /> info@technopeak.com
                  </Group>
                </Anchor>
                <Anchor href="tel:+971000000000" size="sm" c="dimmed" className={classes.link}>
                <Group gap="xs">
                  <IconPhone size={16} /> +971 00 000 0000 {/* Замени на реальный номер */}
                </Group>
                </Anchor>
                <Group gap="xs" wrap="nowrap" align="flex-start">
                  <ThemeIcon variant="transparent" color="dimmed" size="sm" mt={4}>
                      <IconMapPin size={16} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed" component="span">
                      Dubai, UAE {/* Замени на реальный адрес */}
                  </Text>
              </Group>
              </Stack>

              {/* Колонка 4: Соцсети */}
              <Stack>
                <Text fw={500}>Follow Us</Text>
                <Group gap="xs">
                  {/* ... ваши иконки соцсетей ... */}
                   <ActionIcon size="lg" variant="default" radius="xl" component="a" href="https://twitter.com" target="_blank">
                    <IconBrandTwitter stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon size="lg" variant="default" radius="xl" component="a" href="https://linkedin.com" target="_blank">
                    <IconBrandLinkedin stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon size="lg" variant="default" radius="xl" component="a" href="https://facebook.com" target="_blank">
                    <IconBrandFacebook stroke={1.5} />
                  </ActionIcon>
                </Group>
              </Stack>
            </SimpleGrid>
        </div>

        {/* --- Раздел Формы Контактов --- */}
        {/* <Box className={classes.formSection} mt="xl" pt="xl" id="contact-form">
           <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Title order={2} mb="md">Get in Touch</Title>
                <Text c="dimmed" mb="lg">
                  Have a project in mind or just want to say hi? Fill out the form and we'll get back to you soon.
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 7 }}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Stack>
                    <TextInput
                      label="Your Name"
                      placeholder="John Doe"
                      required
                      {...form.getInputProps('name')}
                    />
                    <TextInput
                      label="Your Email"
                      placeholder="john.doe@example.com"
                      required
                      type="email"
                      {...form.getInputProps('email')}
                    />
                    <Textarea
                      label="Your Message"
                      placeholder="Tell us about your project or inquiry..."
                      required
                      minRows={4}
                      {...form.getInputProps('message')}
                    />
                    <Group justify="flex-end" mt="md">
                      <Button type="submit" size="md">
                        Send Message
                      </Button>
                    </Group>
                  </Stack>
                </form>
              </Grid.Col>
           </Grid>
        </Box> */}

        {/* --- Нижняя часть футера --- */}
        <div className={classes.afterFooter}>
          <Text c="dimmed" size="sm">
            © {currentYear} TECHNOPEAK. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
}

// --- Добавьте импорт ScrollLink, если его еще нет ---
import { Link as ScrollLink } from 'react-scroll';
import { ThemeIcon } from '@mantine/core'; // Убедитесь, что ThemeIcon импортирован