import Hello from '@/components/Hello';
import {NextIntlClientProviderRSC} from '@/next-intl';

// VARIANT 2: Only provide the namespace (automatically)

export default async function ImplicitPage() {
  return (
    <NextIntlClientProviderRSC
      _namespaces={/* automatically provided */ ['Hello']}
    >
      <Hello />
    </NextIntlClientProviderRSC>
  );
}
