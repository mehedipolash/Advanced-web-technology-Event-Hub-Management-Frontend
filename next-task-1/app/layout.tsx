// app/layout.tsx
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Script from 'next/script';
import NotificationClient from './components/NotificationClient';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gray-50 min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        {/* Pusher Beams Web SDK */}
        <Script
          src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"
          strategy="afterInteractive"
        />
        <NotificationClient />

        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
