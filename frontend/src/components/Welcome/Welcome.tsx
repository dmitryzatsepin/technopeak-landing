//src/components/Welcome/Welcome.tsx

import { useState } from 'react';
import { Text, Title, Container, useMantineColorScheme, Button, Group, Modal, TextInput, Stack, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-scroll';
import classes from './Welcome.module.css';
import classNames from 'classnames';

const HEADER_HEIGHT_PX = 80;

export function Welcome() {
  const { colorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: { name: '', phone: '' },
    validate: {
      name: (value: string) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      phone: (value: string) => (/^\+?[0-9\s-()]{7,}$/.test(value) ? null : 'Invalid phone number'),
    },
  });

  const handleFormSubmit = (values: typeof form.values) => {
    console.log('Free Trial Form Submitted:', values);
    alert(`Thank you, ${values.name}! We will contact you soon at ${values.phone}.`);
    form.reset();
    setOpened(false);
  };

  return (
    <Container size="xl" className={classNames(classes.container)}>
      <Title className={classNames(classes.title)} ta="left">
        <span>Your trusted</span> <br />
        <span>CRM Integrator</span> <br />
        <Text inherit variant="gradient" component="span" gradient={{ from: 'accentPink', to: 'accentPink' }}>
          in the Middle East
        </Text>
      </Title>

      <Group mt="xl" justify="flex-start">
        <Button 
          size="md"
          variant="outline"
          radius={0}
          className={classNames(classes.button, classes.freeTrial)}
          onClick={() => setOpened(true)}
        >
          Free Trial
        </Button>

        <Link to="history" smooth={true} duration={800} offset={-HEADER_HEIGHT_PX}>
          <Button
            size="md"
            variant="outline"
            radius={0}
            className={classNames(classes.button, classes.learnMore)}
          >
            Learn More
          </Button>
        </Link>
      </Group>

      <Modal
        opened={opened}
        onClose={() => { setOpened(false); form.reset(); }}
        title="Request Free Trial"
        size="sm"
        centered
        keepMounted={false}
      >
        <Box component="form" onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Your Name"
              placeholder="John Doe"
              required
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Your Phone Number"
              placeholder="+1 234 567 890"
              required
              {...form.getInputProps('phone')}
            />
            <Button type="submit" mt="md" color="accentGreen">
              Submit Request
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}