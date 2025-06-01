// src/layouts/CaseStudyPageLayout.tsx
import React from 'react';
import { Container, Title, Text, Paper, Breadcrumbs, Anchor, Box, Space, Image, Badge, Group, Divider } from '@mantine/core';
import { Link as RouterLink } from 'react-router-dom';
import { AppHeader } from '../../components/Header/Header'; // Проверьте путь
import { Footer } from '../../components/Footer/Footer';   // Проверьте путь
import classes from './CaseStudyPageLayout.module.css'; // Создадим этот CSS модуль
import { HEADER_HEIGHT_PX } from '../../hooks/useHeaderState'; // Если нужна высота хедера

interface CaseStudyPageLayoutProps {
  caseTitle: string;
  category: string;
  heroImage?: string; // Опциональное главное изображение кейса
  breadcrumbLabel: string; // Название кейса для хлебных крошек
  children: React.ReactNode; // Основной контент кейса (секции "Проблема", "Решение", "Результаты")
}

const breadcrumbItems = (currentCaseLabel: string, currentCasePath: string) => [
  { title: 'Home', href: '/' },
  { title: 'Portfolio', href: '/#portfolio' }, // Ссылка на секцию портфолио на главной
  { title: currentCaseLabel, href: currentCasePath },
].map((item, index, array) => (
  item.href && (window.location.pathname !== item.href || index < array.length - 1) ? (
    <Anchor component={RouterLink} to={item.href.startsWith('/') ? item.href : `/${item.href}`} key={index} className={classes.breadcrumbLink}>
      {item.title}
    </Anchor>
  ) : (
    <Text key={index} className={classes.breadcrumbActive}>
      {item.title}
    </Text>
  )
));

export function CaseStudyPageLayout({
  caseTitle,
  category,
  heroImage,
  breadcrumbLabel,
  children,
}: CaseStudyPageLayoutProps) {
  const currentPath = window.location.pathname;

  return (
    <Box 
      className={classes.pageWrapper}
      style={{ '--header-height': `${HEADER_HEIGHT_PX}px` } as React.CSSProperties}
    >
      <AppHeader />
      <Container size="lg" className={classes.contentArea}>
        <Breadcrumbs separator="→" mt="md" mb="lg" className={classes.breadcrumbs}>
          {breadcrumbItems(breadcrumbLabel, currentPath)}
        </Breadcrumbs>
        
        <Paper shadow="sm" p="xl" radius="md" withBorder className={classes.mainContentPaper}>
          <Badge color="accentPink" variant="light" size="lg" mb="md">
            {category}
          </Badge>
          <Title order={1} className={classes.pageTitle} mb="lg">
            {caseTitle}
          </Title>

          {heroImage && (
            <Image
              src={heroImage}
              alt={`Hero image for ${caseTitle}`}
              radius="md"
              mah={400} // Максимальная высота изображения
              fit="cover"
              mb="xl"
            />
          )}
          
          <Divider my="lg" />

          <Box className={classes.caseStudyContent}>
            {children}
          </Box>
        </Paper>
        <Space h="xl" />
        {/* Здесь можно добавить секцию "Другие кейсы" или CTA */}
      </Container>
      <Footer />
    </Box>
  );
}