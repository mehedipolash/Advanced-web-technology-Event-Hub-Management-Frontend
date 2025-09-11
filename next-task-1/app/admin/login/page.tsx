'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '@/app/lib/axios';
import AdminForm from '@/app/components/admin/AdminForm';

type LoginForm = { email: string; password: string };

export default function AdminLoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [err, setErr] = useState<string | null>(null);
  const [seedOpen, setSeedOpen] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setErr(null);
    try {
      await api.post('/admin/login', data);
      router.replace('/admin/dashboard');
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Login card */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h1 className="text-xl font-semibold mb-4">Admin Login (POST)</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <input
            {...register('email')}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        {err && <div className="text-red-600 mt-2">{err}</div>}
      </div>

      {/* Create-first-admin helper */}
      <div className="bg-white shadow p-4 rounded-xl">
        <button
          onClick={() => setSeedOpen(v => !v)}
          className="w-full text-left px-3 py-2 rounded bg-gray-100"
        >
          {seedOpen ? '▾' : '▸'} Create first admin (if you can’t log in)
        </button>

        {seedOpen && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-3">
              Use this once to create a valid admin (password will be stored
              hashed). After creating, log in above.
            </p>
            <AdminForm
              onCreated={() => {
                setSeedMsg(
                  '✅ Admin created. Now log in with those credentials.'
                );
              }}
            />
            {seedMsg && <div className="text-sm mt-2">{seedMsg}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
