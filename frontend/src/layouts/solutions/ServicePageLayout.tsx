// src/layouts/ServicePageLayout.tsx
import React from 'react';
import { Container, Title, Text, Paper, Breadcrumbs, Anchor, Box, Space } from '@mantine/core';
import { Link as RouterLink } from 'react-router-dom';
import classes from './ServicePageLayout.module.css';
import { AppHeader } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { HEADER_HEIGHT_PX } from '../../hooks/useHeaderState';

interface ServicePageLayoutProps {
  title: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
}

const breadcrumbItems = (currentServiceLabel: string, currentServicePath: string) => [
  { title: 'Home', href: '/' },
  { title: currentServiceLabel, href: currentServicePath },
].map((item, index, array) => (
  item.href && (window.location.pathname !== item.href || index < array.length - 1) ? (
    <Anchor component={RouterLink} to={item.href} key={index} className={classes.breadcrumbLink}>
      {item.title}
    </Anchor>
  ) : (
    <Text key={index} className={classes.breadcrumbActive}>
      {item.title}
    </Text>
  )
));

export function ServicePageLayout({ title, breadcrumbLabel, children }: ServicePageLayoutProps) {
  const currentPath = window.location.pathname; // Получаем текущий путь для хлебных крошек

  return (
    <Box 
      className={classes.pageWrapper}
      // style={{ '--header-height': `${HEADER_HEIGHT_PX}px` } as React.CSSProperties} // Переменная может быть не нужна, если отступ теперь управляется иначе
    >
      <AppHeader /> 
      <Container size="xl" className={classes.outerContentContainer}>
        <Breadcrumbs separator="→" mt="md" mb="lg" className={classes.breadcrumbs}>
          {breadcrumbItems(breadcrumbLabel, currentPath)}
        </Breadcrumbs>
        
        <Paper shadow="sm" p="xl" radius="md" withBorder className={classes.mainContentPaper}>
          <Title order={1} className={classes.pageTitle} mb="lg">
            {title}
          </Title>
          <Box className={classes.serviceContent}>
            {children} 
          </Box>
        </Paper>
        <Space h="xl" /> 
      </Container>
      <Footer /> 
    </Box>
  );
}