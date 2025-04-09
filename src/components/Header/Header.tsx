import { useState } from 'react';
import { Container, Grid, Burger, Group, Anchor, Image, Text, Button, Box, Flex, Popover, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Logo from '../../assets/img/logo.png';
import classes from './Header.module.css';

export function AppHeader() {
  const [opened, setOpened] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false); // Состояние для Popover
  const isMobile = useMediaQuery('(max-width: 990px)');

  const toggleMenu = () => setOpened((prev) => !prev);

  return (
    <header className={classes.header}>
      <Container size="xl">
        <Grid align="center" justify="space-between">
          <Grid.Col span={{ base: 4, sm: 3, md: 3 }} className={classes.logo}>
            <Image src={Logo} alt="Logo" width={150} />
          </Grid.Col>

          {!isMobile && (
            <Grid.Col span={{ base: 6, sm: 7, md: 7 }} className={classes.menu}>
              <Group gap="md">
                {[
                  'Home', 
                  'About', 
                  'Services', 
                  'Portfolio', 
                  'Reviews', 
                  'Pricing', 
                  'Contacts'
                ].map((item) => (
                  <Anchor 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className={classes.link}>
                    <Text size="lg">
                      {item}
                    </Text>
                  </Anchor>
                ))}
              </Group>
            </Grid.Col>
          )}

          {!isMobile && (
            <Grid.Col span={{ base: 2, sm: 2, md: 2 }} className={classes.buttonCol}>
              <Popover
                opened={popoverOpened}
                onChange={setPopoverOpened}
                width={300}
                position="bottom"
                withArrow
                shadow="md"
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
                  <form>
                    <Text 
                    size="sm"
                    className={classes.formTitle}
                    >
                      Let’s Build Something Great Together!
                    </Text>
                    <TextInput
                      label="Name"
                      placeholder="Your name"
                      required
                      mb="md"
                      classNames={{ 
                        input: classes.transparentInput, // Стили для поля ввода
                        label: classes.whiteLabel, // Стили для лейбла
                      }}
                    />
                    <TextInput
                      label="Phone"
                      placeholder="Your phone number"
                      required
                      mb="md"
                      classNames={{ 
                        input: classes.transparentInput, // Стили для поля ввода
                        label: classes.whiteLabel, // Стили для лейбла
                      }}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Your email"
                      required
                      mb="md"
                      classNames={{ 
                        input: classes.transparentInput, // Стили для поля ввода
                        label: classes.whiteLabel, // Стили для лейбла
                      }}
                    />
                    <Button 
                      type="submit"
                      variant="outline" 
                      radius={0}  
                      fullWidth
                      className={classes.submitButton}
                    >
                      Submit
                    </Button>
                  </form>
                </Popover.Dropdown>
              </Popover>
            </Grid.Col>
          )}

          {isMobile && (
            <Grid.Col span="content" className={classes.burger}>
              <Burger opened={opened} onClick={toggleMenu} color="white" />
            </Grid.Col>
          )}
        </Grid>
      </Container>

      {/* Блок мобильного меню */}
      {isMobile && opened && (
        <Box className={classes.mobileMenu}>
          <Flex 
            direction="column" 
            align="flex-start" 
            gap="lg"
          >
            {[
              'Home', 
              'About', 
              'Services', 
              'Portfolio', 
              'Reviews', 
              'Pricing', 
              'Contacts'
            ].map((item) => (
              <Box key={item} className={classes.menuItem}>
                <Anchor 
                  href={`#${item.toLowerCase()}`} 
                  onClick={toggleMenu} 
                  className={classes.mobileLink}
                >
                  <Text size="xl" fw={700}>
                    {item}
                  </Text>
                </Anchor>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </header>
  );
}