import React from 'react';
import { Box, Text, Title, Grid, Flex, Paper, Container, rem } from '@mantine/core'; // Импортируем Container
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaProjectDiagram, FaSmile, FaCalendarAlt, FaUsers, FaAward } from 'react-icons/fa';
import classes from './AnimatedNumbers.module.css';

// Данные digitsData остаются без изменений
const digitsData = [
  { id: 'projects', number: 100, label: 'Projects Completed', icon: <FaProjectDiagram /> },
  { id: 'clients', number: 50, label: 'Happy Clients', icon: <FaSmile /> },
  { id: 'experience', number: 10, label: 'Years of Experience', icon: <FaCalendarAlt /> },
  { id: 'employees', number: 200, label: 'Employees', icon: <FaUsers /> },
  { id: 'awards', number: 5, label: 'Awards Received', icon: <FaAward /> },
];

export function AnimatedNumbers() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    // Внешний Box - ТОЛЬКО для useInView ref и ID
    // Убираем className={classes.section} отсюда
    <Box ref={ref} id="numbers" className={classes.wrapper}> {/* Добавляем класс для возможного внешнего фона */}
      {/* Используем Container для ограничения ширины и задания фона/паддингов */}
      <Container size="xl" className={classes.innerContainer}>
        {/* Обертка для Grid с overflow: hidden */}
        <Box style={{ overflow: 'hidden' }}>
          <Grid gutter="xl" justify="center">
            {digitsData.map((item) => (
              <Grid.Col key={item.id} span={{ base: 12, xs: 6, md: 4, lg: 'auto' }}>
                <Paper withBorder radius={0} className={classes.digitBox} p="lg">
                  <Flex direction="column" align="center" gap="md">
                    <Box className={classes.icon} c="accentGreen">
                      {item.icon}
                    </Box>
                    <Title order={2} className={classes.digit}>
                      {inView ? <CountUp end={item.number} duration={2.5} /> : '0'} +
                    </Title>
                    <Text size="md" className={classes.label}>
                      {item.label}
                    </Text>
                  </Flex>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Box> {/* Конец обертки для Grid */}
      </Container>
    </Box>
  );
}