'use client';

import AdminAuthGuard from '@/app/components/admin/AdminAuthGuard';
import AdminForm from '@/app/components/admin/AdminForm';
import AdminList from '@/app/components/admin/AdminList';
import { api } from '@/app/lib/axios';
import { useState } from 'react';

export default function AdminDashboardPage() {
  const [msg, setMsg] = useState<string | null>(null);

  const logout = async () => {
    try {
      await api.post('/admin/logout');
      window.location.href = '/admin/login';
    } catch {
      setMsg('Logout failed');
    }
  };

  return (
    <AdminAuthGuard>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-gray-800 text-white"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminForm onCreated={() => {}} />
        <div className="md:col-span-2">
          <AdminList />
        </div>
      </div>

      {msg && <div className="text-sm text-gray-600 mt-3">{msg}</div>}
    </AdminAuthGuard>
  );
}
