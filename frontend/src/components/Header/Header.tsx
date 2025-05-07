// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Burger, Group, Anchor, Image, Text, Button, Box, Flex, Popover, TextInput, rem, LoadingOverlay, Notification
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useWindowScroll } from '@mantine/hooks';
import cx from 'clsx';
import Logo from '../../assets/img/logo.png';
import classes from './Header.module.css';
import { IconCheck, IconX } from '@tabler/icons-react'; // Иконки для уведомлений

// Примерная высота хедера для расчета отступа мобильного меню
const HEADER_HEIGHT_PX = 80;

// Генерация ссылок меню (вынесена для ясности)
const menuItems = [
  { label: 'Home', link: '#home' }, // Используйте реальные ID или пути
  { label: 'About', link: '#history' },
  { label: 'Services', link: '#services' },
  { label: 'Portfolio', link: '#portfolio' },
  { label: 'Reviews', link: '#testimonials' },
  // { label: 'Pricing', link: '#pricing' }, // Если есть секция
  { label: 'Contacts', link: '#contact-form' }, // Убедитесь, что есть элемент с id="contact-form" или это имя формы
];

export function AppHeader() {
  const [opened, setOpened] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Состояния для формы ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  // -------------------------

  // Эффект для определения мобильной версии
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 990px)');
    const updateIsMobile = () => setIsMobile(mobileQuery.matches);
    updateIsMobile(); // Initial check
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  // Эффект для определения прокрутки страницы
  useEffect(() => {
    const shouldBeScrolled = scroll.y > 10;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  }, [scroll.y, isScrolled]); // Добавили isScrolled в зависимости, чтобы избежать лишних срабатываний

  const toggleMenu = () => setOpened((prev) => !prev);

  // --- Настройка useForm ---
  const form = useForm({
    initialValues: { name: '', phone: '', email: '' },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      phone: (value) => (/^\+?[0-9\s-()]{7,}$/.test(value) ? null : 'Invalid phone number'),
      email: (value) => (value ? (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email') : null), // Email не обязателен, но если есть - валидируем
    },
  });
  // -----------------------

  // --- Функция отправки формы ---
  const handleFormSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setNotificationMessage('');

    try {
      const response = await fetch('/api/submit-bitrix-form', { // URL твоего бэкенд-обработчика
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, formType: 'Header Contact Form' }), // Добавляем тип формы
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setNotificationMessage('Thank you! We will contact you soon.');
        form.reset(); // Сбросить форму
        setPopoverOpened(false); // Закрыть поповер
      } else {
        console.error('Submission error:', result.message || result.error || 'Unknown error');
        setSubmitStatus('error');
        setNotificationMessage(result.message || result.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setSubmitStatus('error');
      setNotificationMessage('Could not connect to the server. Please check your connection.');
    } finally {
      setIsSubmitting(false);
      // Скрываем уведомление через некоторое время
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };
  // ---------------------------

  // Генерация ссылок для десктопа
  const desktopLinks = menuItems.map((item) => (
    <Anchor
      key={item.label}
      href={item.link}
      className={classes.link}
      // Здесь можно добавить логику для плавной прокрутки с react-scroll или нативно
      onClick={(e) => {
        e.preventDefault(); // Предотвращаем стандартный переход по якорю
        const targetId = item.link.substring(1); // Убираем #
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = HEADER_HEIGHT_PX; // Учитываем высоту хедера
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetElement.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            // Если элемент не найден, можно просто перейти по ссылке
            window.location.hash = item.link;
        }
      }}
    >
      <Text size="lg">{item.label}</Text>
    </Anchor>
  ));

  // Генерация ссылок для мобильного меню
  const mobileLinks = menuItems.map((item) => (
    <Box key={item.label} className={classes.menuItem}>
      <Anchor
        href={item.link}
        onClick={(e) => {
           e.preventDefault(); // Предотвращаем стандартный переход по якорю
           setOpened(false); // Закрываем меню при клике
           const targetId = item.link.substring(1); // Убираем #
           const targetElement = document.getElementById(targetId);
           if (targetElement) {
                const offset = HEADER_HEIGHT_PX;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
           } else {
              window.location.hash = item.link;
           }
        }}
        className={classes.mobileLink}
      >
        <Text size="xl" fw={700}>{item.label}</Text>
      </Anchor>
    </Box>
  ));


  return (
    <> {/* Обертка для хедера и уведомления */}
      <header className={cx(classes.header, { [classes.scrolled]: isScrolled })}>
         <Container size="xl" className={classes.innerContainer}>
            <Grid align="center" justify="space-between" gutter={0}>
                {/* Логотип */}
                <Grid.Col span={{ base: 'content' }} className={classes.logo}>
                    <Anchor href="#home"> {/* Ссылка на главную */}
                       <Image src={Logo} alt="TECHNOPEAK Logo" h={rem(40)} w="auto" fit="contain" />
                    </Anchor>
                </Grid.Col>

                {/* Меню и Кнопка для десктопа */}
                {!isMobile && (
                    <Grid.Col span="auto">
                        <Group justify="flex-end" gap="xl">
                            {/* Группа ссылок */}
                            <Group gap="md">{desktopLinks}</Group>
                            {/* Кнопка и Popover с формой */}
                            <Popover
                                opened={popoverOpened}
                                onChange={setPopoverOpened}
                                width={300}
                                position="bottom-end"
                                withArrow
                                shadow="md"
                                radius={0}
                                // Закрываем поповер при клике вне его, но не во время отправки
                                closeOnClickOutside={!isSubmitting}
                            >
                                <Popover.Target>
                                  <Button
                                    size="md"
                                    variant="outline"
                                    radius={0}
                                    className={classes.contactButton}
                                    // Сбрасываем статус при открытии, чтобы не висело старое уведомление
                                    onClick={() => { setPopoverOpened((o) => !o); setSubmitStatus(null); }}
                                  >
                                      Contact Us
                                  </Button>
                                </Popover.Target>

                                <Popover.Dropdown className={classes.popoverDropdown}>
                                  <Box pos="relative"> {/* Для LoadingOverlay */}
                                    <LoadingOverlay visible={isSubmitting} overlayProps={{ radius: 0, blur: 2 }} />
                                    <form onSubmit={form.onSubmit(handleFormSubmit)}>
                                      <Text size="sm" className={classes.formTitle}>
                                        Let’s Build Something Great Together!
                                      </Text>
                                      <TextInput
                                        label="Name" placeholder="Your name" required mb="md" radius={0}
                                        classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
                                        {...form.getInputProps('name')}
                                      />
                                      <TextInput
                                        label="Phone" placeholder="Your phone number" required mb="md" radius={0}
                                        classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
                                        {...form.getInputProps('phone')}
                                      />
                                      <TextInput
                                        label="Email" placeholder="Your email" type="email" mb="md" radius={0}
                                        classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
                                        {...form.getInputProps('email')}
                                      />
                                      <Button type="submit" variant="outline" radius={0} fullWidth className={classes.submitButton} disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                      </Button>
                                    </form>
                                  </Box>
                                </Popover.Dropdown>
                              </Popover>
                        </Group>
                    </Grid.Col>
                )}

                {/* Бургер для мобильных */}
                {isMobile && (
                    <Grid.Col span="content">
                        <Burger
                            opened={opened}
                            onClick={toggleMenu}
                            color={isScrolled || opened ? 'black' : 'white'} // Делаем бургер черным при скролле или если меню открыто
                            aria-label="Toggle navigation"
                         />
                    </Grid.Col>
                )}
            </Grid>
        </Container>

        {/* Мобильное меню */}
         {isMobile && opened && (
            <Box className={classes.mobileMenu} style={{ top: rem(HEADER_HEIGHT_PX) }}>
                <Flex direction="column" align="stretch" gap={0}>
                    {mobileLinks}
                </Flex>
            </Box>
         )}
      </header>

      {/* --- Уведомление об отправке --- */}
      {submitStatus && ( // Открывающая скобка
        <Notification
          icon={submitStatus === 'success' ? <IconCheck size={rem(18)} /> : <IconX size={rem(18)} />}
          color={submitStatus === 'success' ? 'teal' : 'red'}
          title={submitStatus === 'success' ? 'Success!' : 'Error!'}
          onClose={() => setSubmitStatus(null)}
          className={classes.notification} // Добавь стили для позиционирования
          withCloseButton
          // Добавляем автозакрытие через 5 секунд (совпадает с setTimeout в finally)
          // onClose вызывается и при клике на крестик, и при автозакрытии
          // Mantine v7: autoClose={5000}
          // Если используешь Mantine v6 или ниже, автозакрытие может не быть или настраиваться иначе
        >
          {notificationMessage}
        </Notification>
      )} {/* <--- ИСПРАВЛЕНО: Добавлена закрывающая скобка */}
      {/* ----------------------------- */}
    </>
  );
}