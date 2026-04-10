import Head from 'next/head';
import { NextPage } from 'next';
import Gui from '@/components/Gui/Gui';

const GuiPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Romashko.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Gui />
    </>
  );
};

export default GuiPage;
