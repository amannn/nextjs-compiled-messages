import Hello from '@/components/Hello';
import {
  NextIntlClientProvider,
  compileMessages,
  getClientKeys,
  getMessages
} from '@/next-intl';
import deepPick from '@/utils/deepPick';

// VARIANT 1: Explicitly calling all required APIs (verbose)

export default async function ExplicitPage() {
  // Step 1: In the next-intl RSC implementation, messages are defined
  // in `i18n.ts` and can be imported into any Server Component.
  // The `locale` is already known at this point.
  const messages = await getMessages();

  // Step 2: Tree-shake the messages
  const clientMessages = deepPick(
    messages,
    // This function gets replaced at compile time with the result
    getClientKeys()
  );

  // Step 3: Compile the messages
  const compiled = compileMessages(clientMessages);

  return (
    <NextIntlClientProvider messages={compiled}>
      <Hello />
    </NextIntlClientProvider>
  );
}
