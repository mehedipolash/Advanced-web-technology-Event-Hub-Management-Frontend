// app/components/admin/AdminForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  adminCreateSchema,
  AdminCreateInput,
} from '@/app/lib/validators/admin';
import { api } from '@/app/lib/axios';

export default function AdminForm({ onCreated }: { onCreated: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdminCreateInput>({ resolver: zodResolver(adminCreateSchema) });
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (data: AdminCreateInput) => {
    setMsg(null);
    try {
      await api.post('/admin/register', data);
      setMsg('✅ Admin created');
      reset();
      onCreated();
    } catch (e: any) {
      setMsg(e?.response?.data?.message || 'Failed to create admin');
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white shadow">
      <h2 className="font-semibold mb-3">Create Admin (POST)</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <input
          {...register('fullName')}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm">{errors.fullName.message}</p>
        )}

        <input
          {...register('age')}
          placeholder="Age"
          className="w-full border p-2 rounded"
        />
        {errors.age && (
          <p className="text-red-600 text-sm">{errors.age.message}</p>
        )}

        <input
          {...register('email')}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? 'Creating...' : 'Create Admin'}
        </button>
      </form>
      {msg && <div className="mt-2 text-sm">{msg}</div>}
    </div>
  );
}
