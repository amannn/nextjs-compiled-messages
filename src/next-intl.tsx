import pick from 'lodash/pick';
import {ReactNode} from 'react';

export type Messages = typeof import('../messages/en.json');

export function pickMessages(
  messages: Messages,
  // This could be an object like
  // `{"PagesRouter": { "hello": true }}`
  // to allow tree shaking deeply.
  namespaces: Array<string>
): Partial<Messages> {
  return pick(messages, namespaces);
}

export function compileMessages(
  messages: Partial<Messages>
): Partial<Messages> {
  // Would call `compile` from `icu-to-json/compiler`
  const compiled: Partial<Messages> = compilePart(messages);
  (compiled as any)._compiled = true;
  return compiled;
}

function compilePart(messages: Partial<Messages>) {
  const compiled: Partial<Messages> = {};
  for (const key of Object.keys(messages)) {
    const value = (messages as any)[key];
    (compiled as any)[key] =
      typeof value === 'string' ? value + ' (compiled)' : compilePart(value);
  }
  return compiled;
}

export function NextIntlClientProvider({
  messages,
  children
}: {
  messages: Partial<Messages>;
  children: ReactNode;
}) {
  // Would be React context in the actual implementation
  (globalThis as any).messages = messages;
  return children;
}

// Could be the implementation of NextIntlClientProvider for the `react-server` environment
// (i.e. depending on if you import this component into an RSC or not, we can swap the
// implementation of the provider). Or maybe we should be more explicit about this
// and have e.g. `NextIntlProvider` for the legacy implementation and `NextIntlClientProvider`
// for the modern implementation that automatically tree-shakes and uses `icu-to-json`.
export async function NextIntlClientProviderRSC({
  children,
  _namespaces
}: {
  children: ReactNode;
  _namespaces: Array<string>;
}) {
  // Step 1: Fetch messages from `i18n.ts`
  const messages = await getMessages('en');

  // Step 2: Tree-shake the messages
  const clientMessages = pickMessages(messages, _namespaces);

  // Step 3: Compile the messages
  const compiled = compileMessages(clientMessages);

  // Would be React context in the actual implementation
  (globalThis as any).messages = compiled;

  return <>{children}</>;
}

export function useTranslations(namespace: string) {
  const messages = (globalThis as any).messages;
  const isCompiled = (messages as any)._compiled;

  if (isCompiled) {
    // Load runtime from icu-to-json
  } else {
    // Load parser from intl-messagesformat
  }

  return function t(key: string) {
    return messages[namespace][key];
  };
}

export async function getMessages(locale: 'en') {
  const messagesModule = await import(`../messages/${locale}.json`);

  // In the Pages Router, the result of the JSON
  // import needs some help to be serializable
  const messages = {...messagesModule};

  return messages;
}
