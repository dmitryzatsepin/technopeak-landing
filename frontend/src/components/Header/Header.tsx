// src/components/Header/Header.tsx (предполагаем, что это основной файл компонента хедера)
import { Container, Grid, Anchor, Image, rem } from '@mantine/core';
import cx from 'clsx';
import Logo from '../../assets/img/logo.png'; // ПУТЬ: Проверьте этот путь
import classes from './Header.module.css';     // ПУТЬ: Этот файл должен быть в той же папке
import { useHeaderState, HEADER_HEIGHT_PX } from '../../hooks/useHeaderState'; // ПУТЬ: Проверьте этот путь
import { DesktopNavigation } from './DesktopNavigation'; // ПУТЬ: Этот файл должен быть в той же папке
import { MobileMenu } from './MobileMenu';             // ПУТЬ: Этот файл должен быть в той же папке

// menuItems можно вынести в отдельный файл constants/navigation.ts, если он будет использоваться еще где-то
// или если этот файл станет слишком большим. Пока оставим здесь.
const menuItems = [
  { label: 'Home', link: '#home' },
  { label: 'About', link: '#history' },
  { label: 'Services', link: '#services' },
  { label: 'Portfolio', link: '#portfolio' },
  { label: 'Reviews', link: '#testimonials' },
  { label: 'Contacts', link: '#contact-form' },
];

export function AppHeader() { // Если вы экспортируете как AppHeader, так и оставляем
  const { isMobile, isScrolled, mobileMenuOpened, toggleMobileMenu } = useHeaderState();

  // Логика плавной прокрутки для логотипа
  const handleLogoScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetElement = document.getElementById('home'); // Предполагаем, что "home" это ID верхней секции
    if (targetElement) {
      // Прокрутка к самому верху страницы
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.warn('AppHeader: Target element with ID "home" for logo scroll not found.');
      window.location.hash = '#home'; // Фоллбэк
    }
  };

  return (
    // Уведомление теперь полностью управляется из ContactPopoverForm,
    // поэтому здесь обертка в React.Fragment (<>) не нужна, если только <header>
    <header className={cx(classes.header, { [classes.scrolled]: isScrolled })}>
      <Container size="xl" className={classes.innerContainer}>
        <Grid align="center" justify="space-between" gutter={0}>
          <Grid.Col span={{ base: 'content' }} className={classes.logo}>
            <Anchor href="#home" onClick={handleLogoScroll}>
              <Image src={Logo} alt="TECHNOPEAK Logo" h={rem(40)} w="auto" fit="contain" />
            </Anchor>
          </Grid.Col>

          {!isMobile && (
            <Grid.Col span="auto">
              <DesktopNavigation menuItems={menuItems} />
            </Grid.Col>
          )}

          {isMobile && (
            <Grid.Col span="content">
              <MobileMenu
                menuItems={menuItems}
                opened={mobileMenuOpened}
                isScrolled={isScrolled}
                toggleMenu={toggleMobileMenu}
              />
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </header>
  );
}