import Hello from '@/components/Hello';
import fetchMessages from '@/utils/fetchMessages';
import {compileMessages, getClientKeys} from '@/next-intl';
import deepPick from '@/utils/deepPick';

export default function Pages() {
  return <Hello />;
}

export async function getServerSideProps() {
  // Step 1: User can freely load this either locally or from a CDN
  const messages = await fetchMessages('en');

  // Step 2: Tree-shake the messages
  const clientMessages = deepPick(
    messages,
    // This function gets replaced at compile time with the result
    getClientKeys()
  );

  // Step 3: Compile the messages
  const compiled = await compileMessages(clientMessages);

  return {props: {messages: compiled}};
}
