import Hello from '@/components/Hello';

export default function ServerComponent() {
  // Evtl für server actions?
  return (
    <NextIntlAutoClientProvider>
      <Hello />
    </NextIntlAutoClientProvider>
  );
}
