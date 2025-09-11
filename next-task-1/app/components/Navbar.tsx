// app/components/Navbar.tsx
'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-teal-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="EventHub" className="h-8 w-8" />
        <span className="font-bold">EventHub</span>
      </div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/admin/login">Admin Login</Link>
        <Link href="/admin/dashboard">Admin Dashboard</Link>
      </div>
    </nav>
  );
}
