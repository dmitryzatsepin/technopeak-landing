// src/components/Header/ContactPopoverForm.tsx
import { useState, useEffect } from 'react';
import { Box, TextInput, Button, Text, LoadingOverlay, rem } from '@mantine/core';
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

export function ContactPopoverForm({ onFormSubmitSuccess }: ContactPopoverFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    if (submitStatus) {
      notifications.show({
        icon: submitStatus === 'success' ? <IconCheck size={rem(18)} /> : <IconX size={rem(18)} />,
        color: submitStatus === 'success' ? 'teal' : 'red',
        title: submitStatus === 'success' ? 'Success!' : 'Error!',
        message: notificationMessage,
        autoClose: 5000,
        withCloseButton: true,
      });
      setSubmitStatus(null); // Сбрасываем статус после показа уведомления
    }
  }, [submitStatus, notificationMessage]);

  const form = useForm<ContactFormValues>({
    initialValues: { name: '', phone: '', email: '' },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      phone: (value) => (/^\+?[0-9\s-()]{7,}$/.test(value) ? null : 'Invalid phone number'),
      email: (value) => (value ? (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email') : null),
    },
  });

  const handleFormSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setNotificationMessage('');
    try {
      const response = await fetch('/api/submit-bitrix-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, formType: 'Header Contact Form' }),
      });
      const result = await response.json();
      if (response.ok) {
        setNotificationMessage('Thank you! We will contact you soon.');
        setSubmitStatus('success');
        form.reset();
        onFormSubmitSuccess();
      } else {
        console.error('Submission error:', result.message || result.error || 'Unknown error');
        setNotificationMessage(result.message || result.error || 'An error occurred. Please try again.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setNotificationMessage('Could not connect to the server. Please check your connection.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isSubmitting} overlayProps={{ radius: 0, blur: 2 }} />
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Text size="sm" className={classes.formTitle}>
          <p>Let’s Build Something Great Together!</p> 
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