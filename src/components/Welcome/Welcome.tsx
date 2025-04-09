import { Text, Title, Container, useMantineColorScheme, Button } from '@mantine/core';
import { Link } from 'react-scroll';
import classes from './Welcome.module.css';
import classNames from 'classnames';

export function Welcome() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Container size="xl"
      className={classNames(
        classes.container
    )}
    >
      <Title
        className={classes.title}
        ta="left"
        style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}
      >
        <span className={colorScheme === 'dark' ? classes.textWhite : classes.textGray}>
          Your trusted
        </span> <br />
        <span className={colorScheme === 'dark' ? classes.textWhite : classes.textGray}>
          CRM Integrator
        </span> <br />
        <Text inherit variant="gradient" component="span" gradient={{ from: 'accentPink', to: 'accentPink' }}>
          in the Middle East
        </Text>
      </Title>
      <Button
        size="md"
        variant="outline" 
        radius={0}
        mt="xl"
        className={classNames(classes.button, classes.freeTrial)}
      >
        Free Trial
      </Button>
      <Link to="next-section" smooth duration={800}>
        <Button
          size="md"
          variant="outline" 
          radius={0}
          mt="xl"
          className={classNames(classes.button, classes.learnMore)}
        >
          Learn More
        </Button>
      </Link>
   </Container>
  );
}
