import {ReactNode} from 'react';
import fetchMessages from './utils/fetchMessages';
import deepPick from './utils/deepPick';

export type Messages = typeof import('../messages/en.json');

// This function is replaced at compile-time with the result.
// Using a function for retrieving the keys might have the
// benefit that it's clear which module determines where
// the keys are coming from. E.g. calling this in a shared
// utility module would result in no keys being found.
// That might be a bit clearer with this API in comparison
// to providing a magic argument to an API like `pickMessages`.
// This also allows to to move loading of messages as well
// as compilation of messages into a utility function like
// `loadMessages(locale, getClientKeys())`.
export function getClientKeys() {
  return {
    'Hello.text': true
  };
}

export function compileMessages(
  messages: Partial<Messages>
): Partial<Messages> {
  // Would call `compile` from `icu-to-json/compiler`
  const compiled: Partial<Messages> = compilePart(messages);
  (compiled as any)._icuToJson = true;
  return compiled;
}

function compilePart(messages: Partial<Messages>) {
  const compiled: Partial<Messages> = {};
  for (const key of Object.keys(messages)) {
    const value = (messages as any)[key];
    (compiled as any)[key] =
      typeof value === 'string'
        ? value + ' (compiled with icu-to-json)'
        : compilePart(value);
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
export async function NextIntlAutoClientProvider({
  children,
  _keys
}: {
  children: ReactNode;
  _keys: Record<string, boolean>;
}) {
  // Step 1: Fetch messages from `i18n.ts`
  const messages = await getMessages();

  // Step 2: Tree-shake the messages
  const clientMessages = deepPick(messages, _keys);

  // Step 3: Compile the messages
  const compiled = compileMessages(clientMessages);

  // Would be React context in the actual implementation
  (globalThis as any).messages = compiled;

  return <>{children}</>;
}

export function useTranslations(namespace: string) {
  const messages = (globalThis as any).messages;
  const isCompiled = (messages as any)._icuToJson;

  if (isCompiled) {
    // Load runtime from icu-to-json
  } else {
    // Load parser from intl-messagesformat
  }

  return function t(key: string) {
    return messages[namespace][key];
  };
}

export async function getMessages() {
  // Can be read based on a route segment
  const locale = 'en';

  return fetchMessages(locale);
}
