// This lives in user code (e.g. `i18n.tsx` in next-intl)
export default async function fetchMessages(locale: 'en') {
  const messagesModule = await import(`../messages/${locale}.json`);

  // In the Pages Router, the result of the JSON
  // import needs some help to be serializable
  const messages = {...messagesModule};

  return messages;
}
