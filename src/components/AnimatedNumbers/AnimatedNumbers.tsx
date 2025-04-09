import React from 'react';
import { Box, Text, Title, Grid, Flex } from '@mantine/core';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaProjectDiagram, FaSmile, FaCalendarAlt, FaUsers, FaAward } from 'react-icons/fa';
import classes from './AnimatedNumbers.module.css';

const digitsData = [
  { number: 100, label: 'Projects Completed', icon: <FaProjectDiagram /> },
  { number: 50, label: 'Happy Clients', icon: <FaSmile /> },
  { number: 10, label: 'Years of Experience', icon: <FaCalendarAlt /> },
  { number: 200, label: 'Employees', icon: <FaUsers /> },
  { number: 5, label: 'Awards Received', icon: <FaAward /> },
];

export function AnimatedNumbers() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <Box ref={ref} className={classes.section}>
      <Grid gutter="xl" justify="center">
        {digitsData.map((item, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 2 }}>
            <Box className={classes.digitBox}>
              <Flex direction="column" align="center" gap="sm">
                {/* Цифра */}
                <Title className={classes.digit}>
                  {inView ? <CountUp end={item.number} duration={3} /> : 0}+
                </Title>

                {/* Иконка и текст */}
                <Flex align="center" gap="sm">
                  <Box className={classes.icon}>
                    {item.icon}
                  </Box>
                  <Text className={classes.label}>{item.label}</Text>
                </Flex>
              </Flex>
            </Box>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}