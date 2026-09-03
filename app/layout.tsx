import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  icons: { icon: '/techparts-icon.png' },
  title: 'Consultar pedido ou lote | TechParts',
  description:
    'Consulte seu pedido ou lote e acompanhe as etapas do produto na TechParts Industrial.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b5ed7',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
