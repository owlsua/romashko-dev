import React, { useContext } from 'react';
import Title from '@/components/Title/Title';
import About from '@/components/About/About';
import { AppContext } from '@/context/app.context';

import styles from './styles.module.css';

const title = ['Romashko', '.dev'];

const Welcome = () => {
  const { aboutContent } = useContext(AppContext);
  return (
    <div className={styles.welcome} data-testid="welcome">
      <Title title={title} />
      <About content={aboutContent} />
    </div>
  );
};

export default Welcome;
