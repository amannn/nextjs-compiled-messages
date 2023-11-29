import Hello from '@/components/Hello';
import {NextIntlAutoClientProvider, getClientKeys} from '@/next-intl';

// VARIANT 2: Only provide the namespace (automatically)

export default async function ImplicitPage() {
  return (
    <NextIntlAutoClientProvider
      // Automatically provided
      // _keys={getClientKeys()}
      _keys={
        // Build time: hash / location of file
        // Run time: load used keys from disk
        // ??? how to load from disk?
        //
      }
    >
      <Hello />
    </NextIntlAutoClientProvider>
  );
}
