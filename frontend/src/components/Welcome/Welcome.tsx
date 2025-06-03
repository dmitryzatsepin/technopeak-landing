// Исправленный компонент Welcome.tsx
import { useState } from 'react';
import {
  Text, Title, Container, Button, Group, Modal, TextInput, Stack, Box, LoadingOverlay, 
  useMantineTheme, rem, Loader, ThemeIcon, useMantineColorScheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-scroll';
import { IconCheck } from '@tabler/icons-react';
import mainClasses from './Welcome.module.css'; // Стили специфичные для Welcome
import headerFormClasses from '../Header/Header.module.css';
import classNames from 'classnames';
import { sendToBitrix } from '../../utils/sendToBitrix';

const HEADER_HEIGHT_PX = 80;

interface FreeTrialFormValues {
  name: string;
  phone: string;
}

export function Welcome() {
  const [opened, setOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme(); // Получаем цветовую схему через хук

  const form = useForm<FreeTrialFormValues>({
    initialValues: { name: '', phone: '' },
    validate: {
      name: (value: string) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      phone: (value: string) => (/^\+?[0-9\s-()]{7,}$/.test(value) ? null : 'Invalid phone number'),
    },
  });

  const handleFormSubmit = async (values: FreeTrialFormValues) => {
    setIsSubmitting(true);
    setShowSuccessMessage(false);

    const leadData = {
      TITLE: `Free Trial Request - ${values.name}`,
      NAME: values.name,
      PHONE: [{ VALUE: values.phone, VALUE_TYPE: 'WORK' }],
      COMMENTS: `Free Trial Request from Welcome page.\nName: ${values.name}\nPhone: ${values.phone}`,
      SOURCE_ID: 'WEBFORM_FREE_TRIAL',
    };

    const success = await sendToBitrix(leadData, "Free Trial Request");
    
    setIsSubmitting(false);

    if (success) {
      form.reset();
      setShowSuccessMessage(true);
      setTimeout(() => {
        setOpened(false);
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  const handleModalOpen = () => {
    console.log('Welcome.tsx: handleModalOpen CALLED');
    form.reset();
    setShowSuccessMessage(false);
    setOpened(true);
    console.log('Welcome.tsx: setOpened(true) was called'); 
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      setOpened(false);
      form.reset();
      setShowSuccessMessage(false);
    }
  };

  return (
    <Container size="xl" className={classNames(mainClasses.container)}>
      <Title className={classNames(mainClasses.title)} ta="left">
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
          className={classNames(mainClasses.button, mainClasses.freeTrial)}
          onClick={handleModalOpen}
        >
          Free Trial
        </Button>

        <Link to="numbers" smooth={true} duration={800} offset={-HEADER_HEIGHT_PX}>
          <Button
            size="md"
            variant="outline"
            radius={0}
            className={classNames(mainClasses.button, mainClasses.learnMore)}
          >
            Learn More
          </Button>
        </Link>
      </Group>

      <Modal
        opened={opened}
        onClose={handleModalClose}
        title={showSuccessMessage ? '' : "Request Free Trial"}
        size="sm"
        centered
        withCloseButton={!showSuccessMessage}
        closeOnClickOutside={!isSubmitting && !showSuccessMessage}
        radius={0}
        classNames={{
          root: headerFormClasses.popoverDropdown,
          overlay: mainClasses.modalOverlayCustom,
          inner: mainClasses.modalInnerCustom,
          header: showSuccessMessage ? mainClasses.hiddenHeader : headerFormClasses.modalHeaderCustom,
          title: headerFormClasses.modalTitleCustom,
          close: headerFormClasses.modalCloseButtonCustom,
          // body: mainClasses.modalBodyCustom, // Если нужны спец. стили для body
        }}
        styles={{
          root: {
            backgroundColor: colorScheme === 'dark' 
              ? 'rgba(30, 30, 30, 0.9)'
              : 'rgba(255, 255, 255, 0.95)',
            border: colorScheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : `1px solid ${theme.colors.gray[3]}`,
            boxShadow: theme.shadows.md,
          }
        }}
        overlayProps={{
          color: colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Box pos="relative">
          <LoadingOverlay
            visible={isSubmitting && !showSuccessMessage}
            zIndex={1000}
            opacity={0.65}
            overlayProps={{
              blur: 1,
              backgroundOpacity: 0.65,
              color: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            }}
            loaderProps={{
              color: colorScheme === 'dark' ? 'var(--accent-green)' : theme.colors.green[6],
              type: 'oval',
              size: 'md',
            }}
          />
          
          {showSuccessMessage ? (
            <Stack align="center" justify="center" mih={200} gap="md" py="md">
              <ThemeIcon color="teal" size={60} radius="xl">
                <IconCheck style={{ width: rem(32), height: rem(32) }} />
              </ThemeIcon>
              <Title order={4} ta="center">Thank You!</Title>
              <Text ta="center" c="dimmed" size="sm">
                Your request has been submitted. We will contact you shortly.
              </Text>
            </Stack>
          ) : (
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Your Name"
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                  {...form.getInputProps('name')}
                />
                <TextInput
                  label="Your Phone Number"
                  placeholder="+1 234 567 890"
                  required
                  disabled={isSubmitting}
                  {...form.getInputProps('phone')}
                />
                <Button 
                  type="submit" 
                  mt="md" 
                  className={colorScheme === 'dark' ? headerFormClasses.submitButton : undefined}
                  variant={colorScheme === 'dark' ? 'outline' : 'filled'}
                  color={colorScheme === 'dark' ? undefined : 'accentGreen'}
                  disabled={isSubmitting}
                  leftSection={isSubmitting ? <Loader color="currentColor" size="xs" type="oval"/> : undefined}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </Stack>
            </form>
          )}
        </Box>
      </Modal>
    </Container>
  );
}