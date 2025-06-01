// src/components/Header/MobileMenu.tsx
import { Box, Anchor, Text, Flex, rem, Burger } from '@mantine/core';
import classes from './Header.module.css'; // Используем те же стили
import { HEADER_HEIGHT_PX } from '../../hooks/useHeaderState';

interface MenuItem {
  label: string;
  link: string;
}

interface MobileMenuProps {
  menuItems: MenuItem[];
  opened: boolean;
  isScrolled: boolean; // Для цвета бургера
  toggleMenu: () => void;
  // scrollToSection: (targetId: string) => void; // Если используем функцию из хука
}

export function MobileMenu({ menuItems, opened, isScrolled, toggleMenu }: MobileMenuProps) {
  const handleSmoothScrollAndClose = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    toggleMenu(); // Закрываем меню
    const targetId = link.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = HEADER_HEIGHT_PX;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      window.location.hash = link;
    }
  };

  const links = menuItems.map((item) => (
    <Box key={item.label} className={classes.menuItem}>
      <Anchor
        href={item.link}
        onClick={(e) => handleSmoothScrollAndClose(e, item.link)}
        className={classes.mobileLink}
      >
        <Text size="xl" fw={700}>{item.label}</Text>
      </Anchor>
    </Box>
  ));

  return (
    <>
      <Burger
        opened={opened}
        onClick={toggleMenu}
        color={isScrolled || opened ? 'black' : 'white'}
        aria-label="Toggle navigation"
      />
      {opened && (
        <Box className={classes.mobileMenu} style={{ top: rem(HEADER_HEIGHT_PX) }}>
          <Flex direction="column" align="stretch" gap={0}>
            {links}
          </Flex>
        </Box>
      )}
    </>
  );
}