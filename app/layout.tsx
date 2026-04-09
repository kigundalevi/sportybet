import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Solamibet\n — Sports Betting',
  description: 'Bet on Soccer, Live events and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script type="module" src="https://unpkg.com/ionicons@7/dist/ionicons/ionicons.esm.js" />
        <Script noModule src="https://unpkg.com/ionicons@7/dist/ionicons/ionicons.js" />
      </body>
    </html>
  );
}