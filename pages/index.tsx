import Head from 'next/head';
import { NextPage } from 'next';
import MainFlow from '@/components/MainFlow/MainFlow';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainFlow />
      </main>
    </>
  );
};

export default Home;
