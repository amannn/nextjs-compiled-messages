import {ReactNode} from 'react';

export const metadata = {
  title: 'Messages test (App Router)'
};

export default async function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
