import Head from 'next/head';
import { NextPage } from 'next';
import MainFlow from '@/components/MainFlow/MainFlow';

const TerminalPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terminal | Romashko.dev</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainFlow />
      </main>
    </>
  );
};

export default TerminalPage;
