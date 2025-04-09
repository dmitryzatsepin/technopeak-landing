import { Container, Title, Accordion, Text } from '@mantine/core';
import classes from './Faq.module.css'; // Создай этот CSS-модуль

const faqData = [
  {
    value: 'experience',
    question: 'How much experience does TECHNOPEAK have?',
    answer:
      'We have over 10 years of experience in IT consulting and CRM integration, serving diverse clients across the Middle East.',
  },
  {
    value: 'crm-platforms',
    question: 'Which CRM platforms do you specialize in?',
    answer:
      'We specialize in major CRM platforms like Salesforce, Microsoft Dynamics 365, HubSpot, and Zoho CRM, offering customization and integration services for each.',
  },
  {
    value: 'support',
    question: 'Do you offer ongoing support after implementation?',
    answer:
      'Yes, we provide comprehensive post-implementation support and maintenance packages tailored to your needs, ensuring your systems run smoothly.',
  },
  {
    value: 'pricing',
    question: 'How does your pricing work?',
    answer:
      'Our pricing is project-based or retainer-based, depending on the scope and complexity. We provide detailed quotes after an initial consultation to understand your requirements.',
  },
];

export function Faq() {
  const items = faqData.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.question}</Accordion.Control>
      <Accordion.Panel>{item.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Container size="md" py="xl" className={classes.wrapper} id="faq"> {/* Добавлен ID */}
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>
      <Text ta="center" c="dimmed" mb="xl">
          Find answers to common questions about our services and processes.
      </Text>

      <Accordion variant="separated" radius="md" defaultValue="experience">
        {items}
      </Accordion>
    </Container>
  );
}