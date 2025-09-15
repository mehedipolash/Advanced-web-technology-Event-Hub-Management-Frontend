import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#19183B] text-white p-4 flex justify-between items-center">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="EventHub"
          className="h-9 w-9 object-contain"
        />
        <span className="font-bold text-xl">EventHub</span>
      </div>

      {/* Links */}
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          Home
        </Link>
        <Link
          href="/admin/login"
          className="hover:text-gray-300 transition-colors"
        >
          Admin Login
        </Link>
        <Link
          href="/admin/dashboard"
          className="hover:text-gray-300 transition-colors"
        >
          Admin Dashboard
        </Link>
      </div>
    </nav>
  );
}
