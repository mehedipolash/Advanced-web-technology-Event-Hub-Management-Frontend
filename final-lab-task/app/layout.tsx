// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



export const metadata: Metadata = {
  title: 'EventHub',
  description: 'Admin Registration — EventHub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gray-50 min-h-screen"
        suppressHydrationWarning
      >
        <Navbar></Navbar>
        {/* <AdminRegisterForm></AdminRegisterForm> */}
        {children}
        {/* <AdminRegisterPage></AdminRegisterPage> */}
        <Footer></Footer>
      </body>
    </html>
  );
}

