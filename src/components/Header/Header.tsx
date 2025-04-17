import { useState, useEffect } from 'react';
import { Container, Grid, Burger, Group, Anchor, Image, Text, Button, Box, Flex, Popover, TextInput, rem } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import cx from 'clsx'; // Убедитесь, что установлен: pnpm add clsx
import Logo from '../../assets/img/logo.png'; // Убедитесь, что путь к лого верный
import classes from './Header.module.css';

// Примерная высота хедера для расчета отступа мобильного меню
// Лучше измерить реальную высоту или сделать ее фиксированной
const HEADER_HEIGHT_PX = 80;

export function AppHeader() {
  const [opened, setOpened] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const updateIsMobile = () => {
    const mobileQuery = window.matchMedia('(max-width: 990px)');
    setIsMobile(mobileQuery.matches);
  };

  useEffect(() => {
    updateIsMobile(); // Initial check
    window.addEventListener('resize', updateIsMobile);

    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  const [scroll, scrollTo] = useWindowScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  console.log('[AppHeader Render] Raw Scroll Y:', scroll.y);


  useEffect(() => {
    const shouldBeScrolled = scroll.y > 10;
    console.log('[AppHeader Effect] scroll.y:', scroll.y, 'Trying to set isScrolled:', shouldBeScrolled);
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  }, [scroll.y, isScrolled]);
  
  
  
  const toggleMenu = () => setOpened((prev) => !prev);

  // Генерация ссылок меню
  const menuItems = [
    { label: 'Home', link: '#home' }, // Используйте реальные ID или пути
    { label: 'About', link: '#history' },
    { label: 'Services', link: '#services' },
    { label: 'Portfolio', link: '#portfolio' },
    { label: 'Reviews', link: '#testimonials' },
    // { label: 'Pricing', link: '#pricing' }, // Если есть секция
    { label: 'Contacts', link: '#contact-form' },
  ];

  const desktopLinks = menuItems.map((item) => (
    <Anchor
      key={item.label}
      href={item.link}
      className={classes.link}
      // Для плавной прокрутки react-scroll замените на <ScrollLink>
      // onClick={(e) => { /* логика плавной прокрутки для hash-ссылок */ }}
    >
      <Text size="lg">{item.label}</Text>
    </Anchor>
  ));

  const mobileLinks = menuItems.map((item) => (
     <Box key={item.label} className={classes.menuItem}>
      <Anchor
        href={item.link}
        onClick={toggleMenu}
        className={classes.mobileLink}
      >
        <Text size="xl" fw={700}>{item.label}</Text>
      </Anchor>
    </Box>
  ));


  return (
    <header className={cx(classes.header, { [classes.scrolled]: isScrolled })}>
      <Container size="xl" className={classes.innerContainer}>
        <Grid align="center" justify="space-between" gutter={0}>
          {/* Логотип */}
          <Grid.Col span={{ base: 'content' }} className={classes.logo}>
             {/* Можно добавить Link на главную, если нужно */}
            <Image src={Logo} alt="TECHNOPEAK Logo" h={rem(40)} w="auto" fit="contain" />
          </Grid.Col>

          {/* Меню и Кнопка для десктопа */}
          {!isMobile && (
            <Grid.Col span="auto">
              <Group justify="flex-end" gap="xl">
                <Group gap="md">
                  {desktopLinks}
                </Group>
                 <Popover
                    opened={popoverOpened}
                    onChange={setPopoverOpened}
                    width={300}
                    position="bottom-end" // Позиционируем справа
                    withArrow
                    shadow="md"
                    radius={0} // Убираем радиус у Popover
                  >
                    <Popover.Target>
                      <Button
                        size="md"
                        variant="outline"
                        radius={0}
                        className={classes.contactButton}
                        onClick={() => setPopoverOpened((o) => !o)}
                      >
                        Contact Us
                      </Button>
                    </Popover.Target>

                    <Popover.Dropdown className={classes.popoverDropdown}>
                      <form onSubmit={(e) => { e.preventDefault(); console.log('Form submit'); setPopoverOpened(false); }}>
                        <Text size="sm" className={classes.formTitle}>
                          Let’s Build Something Great Together!
                        </Text>
                        <TextInput
                          label="Name" placeholder="Your name" required mb="md" radius={0}
                          classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
                        />
                        <TextInput
                          label="Phone" placeholder="Your phone number" required mb="md" radius={0}
                          classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
                        />
                        <TextInput
                          label="Email" placeholder="Your email" required type="email" mb="md" radius={0}
                          classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
                        />
                        <Button type="submit" variant="outline" radius={0} fullWidth className={classes.submitButton}>
                          Submit
                        </Button>
                      </form>
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
                color={isScrolled ? 'black' : 'white'}
                aria-label="Toggle navigation"
              />
            </Grid.Col>
          )}
        </Grid>
      </Container>

      {/* Мобильное меню */}
      {isMobile && opened && (
        <Box className={classes.mobileMenu} style={{ top: rem(HEADER_HEIGHT_PX) }}>
          <Flex direction="column" align="stretch" gap={0}> {/* Убираем gap, контролируем через menuItem */}
            {mobileLinks}
          </Flex>
        </Box>
      )}
    </header>
  );
}