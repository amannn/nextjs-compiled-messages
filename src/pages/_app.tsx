import Head from 'next/head';
import {NextIntlClientProvider} from '@/next-intl';

export default function App({Component, pageProps}: any) {
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <Head>
        <title>Messages test (Pages Router)</title>
      </Head>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
