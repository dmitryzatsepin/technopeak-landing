// src/components/AnimatedNumbers/AnimatedNumbers.tsx
import React from 'react';
import { Box, Text, Title, Grid, Flex, Paper, Container } from '@mantine/core';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import classes from './AnimatedNumbers.module.css';
import { digitsData, DigitItem } from '../../data/animatedNumbersData';

export function AnimatedNumbers() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <Box ref={ref} id="numbers" className={classes.wrapper}>
      <Container size="xl" className={classes.innerContainer}>
        <Box> 
          <Grid gutter="xl" justify="center">
            {digitsData.map((item: DigitItem) => (
              <Grid.Col key={item.id} span={{ base: 12, xs: 6, sm: 4, md: 'auto' }}>
                <Paper withBorder radius="md" className={classes.digitBox} p="lg">
                  <Flex direction="column" align="center" gap="md">
                    <Box className={classes.iconContainer}>
                      {item.icon}
                    </Box>
                    <Title order={2} className={classes.digit}>
                      {inView ? <CountUp end={item.number} duration={2.5} suffix=" +" /> : `0 +`}
                    </Title>
                    <Text size="md" ta="center" className={classes.label}>
                      {item.label}
                    </Text>
                  </Flex>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}