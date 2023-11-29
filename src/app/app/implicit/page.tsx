import Hello from '@/components/Hello';
import {NextIntlAutoClientProvider, getClientKeys} from '@/next-intl';

// VARIANT 2: Only provide the namespace (automatically)

export default async function ImplicitPage() {
  return (
    <NextIntlAutoClientProvider
      // Automatically provided
      _keys={getClientKeys()}
    >
      <Hello />
    </NextIntlAutoClientProvider>
  );
}
