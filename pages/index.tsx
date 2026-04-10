import Head from 'next/head';
import { NextPage } from 'next';
import Landing from '@/components/Landing/Landing';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Romashko.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </>
  );
};

export default Home;
