import {
  Container, Group, ActionIcon, Text, Anchor, SimpleGrid, Image, Stack
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandFacebook, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import Logo from '../../assets/img/logo.png';
import classes from './Footer.module.css';

const footerLinks = [
  { link: 'home', label: 'Home' },
  { link: 'services', label: 'Solutions' },
  { link: 'portfolio', label: 'Cases' },
  { link: 'faq', label: 'FAQ' },
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
      <Container size="xl" className={classes.inner}>
        <div className={classes.inner}>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
              <Stack>
                <Image src={Logo} alt="TECHNOPEAK Logo" h={40} w="auto" fit="contain" />
              </Stack>
              <Stack>
                <Text fw={500}>Navigation</Text>
                {mainLinks}
                 <ScrollLink to="contact-form" smooth duration={800} style={{ textDecoration: 'none' }}>
                    <Anchor component="button" type="button" c="dimmed" size="sm" className={classes.link}>
                      Contact Form
                    </Anchor>
                 </ScrollLink>
              </Stack>
              <Stack>
                <Text fw={500}>Contact Us</Text>
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
                      Dubai, UAE
                  </Text>
              </Group>
              </Stack>

              <Stack>
                <Text fw={500}>Follow Us</Text>
                <Group gap="xs">
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

        <div className={classes.afterFooter}>
          <Text c="dimmed" size="sm">
            © {currentYear} TECHNOPEAK. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
}

import { Link as ScrollLink } from 'react-scroll';
import { ThemeIcon } from '@mantine/core'; // Убедитесь, что ThemeIcon импортирован