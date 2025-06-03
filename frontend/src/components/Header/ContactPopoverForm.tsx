// src/components/Header/ContactPopoverForm.tsx
import { useState } from 'react';
import { Box, TextInput, Button, Text, LoadingOverlay, rem, useMantineTheme } from '@mantine/core'; 
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import classes from './Header.module.css';

interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
}

interface ContactPopoverFormProps {
  onFormSubmitSuccess: () => void;
}

const BITRIX_WEBHOOK_URL = 'https://b24.technopeak.ae/rest/3162/hk8pqe4k5gcxadla/crm.lead.add.json';

export function ContactPopoverForm({ onFormSubmitSuccess }: ContactPopoverFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useMantineTheme();

  const form = useForm<ContactFormValues>({
    initialValues: { name: '', phone: '', email: '' },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      phone: (value) => (/^\+?[0-9\s-()]{7,}$/.test(value) ? null : 'Invalid phone number'),
      email: (value) => (value.trim() ? (/^\S+@\S+\.\S+$/.test(value.trim()) ? null : 'Invalid email') : null),
    },
  });

  const handleFormSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    const leadData = {
      fields: {
        TITLE: `${values.name || 'Website Request'}`,
        NAME: values.name,
        PHONE: [{ VALUE: values.phone, VALUE_TYPE: 'WORK' }],
        ...(values.email.trim() && { EMAIL: [{ VALUE: values.email.trim(), VALUE_TYPE: 'WORK' }] }),
        COMMENTS: `Website Request (Contact Us Header Form).\nName: ${values.name}\nPhone: ${values.phone}${values.email.trim() ? `\nEmail: ${values.email.trim()}` : ''}`,
        SOURCE_ID: 'WEBFORM',
      },
    };

    try {
      const response = await fetch(BITRIX_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (response.ok && result.result) {
        notifications.show({
          title: 'Success!',
          message: 'Thank you! We will contact you soon.',
          color: 'teal',
          icon: <IconCheck size={18} />,
          autoClose: 5000,
        });
        form.reset();
        onFormSubmitSuccess();
      } else {
        console.error('Bitrix24 Submission Error:', result.error_description || result.error || result || 'Unknown error from Bitrix24');
        notifications.show({
          title: 'Error!',
          message: result.error_description || 'An error occurred. Please try again.',
          color: 'red',
          icon: <IconX size={18} />,
          autoClose: 7000,
        });
      }
    } catch (error) {
      console.error('Network or server error:', error);
      notifications.show({
        title: 'Network Error!',
        message: 'Could not connect to the server. Please check your connection and try again.',
        color: 'red',
        icon: <IconX size={rem(18)} />,
        autoClose: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isSubmitting}
        zIndex={1000}
        overlayProps={{
          backgroundOpacity: 0.65,
          blur: 1,
          color: theme.colors.dark[7],
        }}
        loaderProps={{
          color: 'var(--accent-green)',
          type: 'oval',
          size: 'md',
        }}
      />
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Text size="sm" className={classes.formTitle}>
          Let's Build Something Great Together!
        </Text>
        <TextInput
          label="Name"
          placeholder="Your name"
          required
          mb="md"
          radius={0}
          classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Phone"
          placeholder="Your phone number"
          required
          mb="md"
          radius={0}
          classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
          {...form.getInputProps('phone')}
        />
        <TextInput
          label="Email"
          placeholder="Your email"
          type="email"
          mb="md"
          radius={0}
          classNames={{ input: classes.transparentInput, label: classes.whiteLabel }}
          {...form.getInputProps('email')}
        />
        <Button 
          type="submit" 
          variant="outline" 
          radius={0} 
          fullWidth 
          className={classes.submitButton} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Box>
  );
}