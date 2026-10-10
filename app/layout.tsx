import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Legal Doc AI',
  description: 'AI-powered legal document review and drafting assistant for compliance and inconsistency review.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </body>
  );
}
