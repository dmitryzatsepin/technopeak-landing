// src/components/Header/DesktopNavigation.tsx
import { useState } from 'react';
import { Group, Anchor, Text, Button, Popover } from '@mantine/core';
import { ContactPopoverForm } from './ContactPopoverForm';
import classes from './Header.module.css';
import { HEADER_HEIGHT_PX } from '../../hooks/useHeaderState';

interface MenuItem {
  label: string;
  link: string;
}

interface DesktopNavigationProps {
  menuItems: MenuItem[];
  // scrollToSection: (targetId: string) => void; // Если используем функцию из хука
}

export function DesktopNavigation({ menuItems }: DesktopNavigationProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
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
    <Anchor
      key={item.label}
      href={item.link}
      className={classes.link}
      onClick={(e) => handleSmoothScroll(e, item.link)}
    >
      <Text size="lg">{item.label}</Text>
    </Anchor>
  ));

  return (
    <Group justify="flex-end" gap="xl">
      <Group gap="md">{links}</Group>
      <Popover
        opened={popoverOpened}
        onChange={setPopoverOpened}
        width={300}
        position="bottom-end"
        withArrow
        shadow="xl"
        radius={0}
        offset={10}
        classNames={{
          dropdown: classes.popoverDropdown,
          arrow: classes.popoverArrow,
        }}
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
          <ContactPopoverForm onFormSubmitSuccess={() => setPopoverOpened(false)} />
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
}