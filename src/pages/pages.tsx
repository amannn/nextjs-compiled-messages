import Hello from '@/components/Hello';
import fetchMessages from '@/utils/fetchMessages';
import {compileMessages, getClientKeys} from '@/next-intl';
import deepPick from '@/utils/deepPick';

export default function Pages() {
  return <Hello />;
}

// export async function getServerSideProps() {
//   // Step 1: User can freely load this either locally or from a CDN
//   const messages = await fetchMessages('en');

//   // Step 2: Tree-shake the messages
//   const clientMessages = deepPick(
//     messages,
//     // This function gets replaced at compile time with the result
//     getClientKeys()
//   );

//   // Step 3: Compile the messages
//   const compiled = await compileMessages(clientMessages);

//   return {props: {messages: compiled}};
// }

// Can also be implemented with a shared utility function:
// export async function getServerSideProps() {
//   const locale = 'en';
//   // Step 1: User can freely load this either locally or from a CDN
//   const messages = await fetchMessages('en');
// possible con: getClientKeys() might not be helpful, if theres no hash
// const compiled = loadMessages(locale, getClientKeys());
//   return {props: {messages: compiled}};
// }
export async function getServerSideProps() {
  const locale = 'en';
  // Step 1: User can freely load this either locally or from a CDN
  const messages = await fetchMessages('en');
  const compiled = compileClientMessages(messages /* injected hash */);
  return {props: {messages: compiled}};
}

function compileMessages(messages) {
  // has caching, should be executed with the same messages for server and client
}

function compileClientMessages(messages, hash) {
  // caching for pick?
  return pick(compileMessages(messages));
  // splits out server-only messages
}

// async function loadMessages(locale: string, keys: any) {
//   // Step 1: User can freely load this either locally or from a CDN
//   const messages = await fetchMessages('en');

//   // Step 2: Tree-shake the messages
//   const clientMessages = deepPick(messages, keys);

//   // Step 3: Compile the messages
//   const compiled = await compileMessages(clientMessages);

//   return compiled;
// }
