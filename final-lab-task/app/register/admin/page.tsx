// components/forms/AdminRegisterForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  adminRegisterSchema,
  AdminRegisterInput,
} from '@/app/lib/validators/admin';
import { api } from '@/app/lib/axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminRegisterForm() {
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdminRegisterInput>({
    resolver: zodResolver(adminRegisterSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (values: AdminRegisterInput) => {
    setServerMsg(null);
    try {
      const payload = {
        fullName: values.fullName,
        age: Number(values.age),
        email: values.email,
        password: values.password,
      };

      const res = await api.post('/admin/register', payload);

      const successMsg = `✅ Registered: ${res.data.fullName || 'Success'}`;
      setServerMsg(successMsg);
      toast.success(successMsg); // ✅ success toast
      reset();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || 'Registration failed';
      const errorMsg = `❌ ${msg}`;
      setServerMsg(errorMsg);
      toast.error(errorMsg); // ✅ error toast
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
      <Toaster position="top-right" reverseOrder={false} />{' '}
      {/* Toast container */}
      <h1 className="text-2xl font-semibold mb-1">Admin Registration</h1>
      <p className="text-sm text-gray-500 mb-6">
        Enter your information for Sign-up
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="write your name"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            placeholder="set your age"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
            {...register('age')}
          />
          {errors.age && (
            <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="********"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-emerald-700 text-white py-2 font-medium hover:bg-lime-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
