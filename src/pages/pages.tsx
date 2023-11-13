import Hello from '../components/Hello';
import fetchMessages from '../fetchMessages';
import {compileMessages, pickMessages} from '../next-intl';

export default function Pages() {
  return <Hello />;
}

export async function getServerSideProps() {
  // Step 1: User can freely load this either locally or from a CDN
  const messages = await fetchMessages('en');

  // Step 2: Tree-shake the messages
  const clientMessages = pickMessages(
    messages,
    /* automatically provided */ ['Hello']
  );

  // Step 3: Compile the messages
  const compiled = await compileMessages(clientMessages);

  return {props: {messages: compiled}};
}
