// app/components/admin/AdminList.tsx
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/lib/axios';
import {
  AdminUpdateInput,
  adminUpdateSchema,
} from '@/app/lib/validators/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Admin = {
  id: number;
  fullName: string;
  age: number;
  status: 'active' | 'inactive';
  email: string;
};

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminUpdateInput>({ resolver: zodResolver(adminUpdateSchema) });

  const fetchAdmins = async (q?: string) => {
    setLoading(true);
    try {
      const res = await api.get('/admin', { params: q ? { q } : {} });
      setAdmins(res.data || []);
    } catch {
      setMsg('Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // PATCH status
  const changeStatus = async (id: number, current: 'active' | 'inactive') => {
    try {
      await api.patch(`/admin/${id}/status`, {
        status: current === 'active' ? 'inactive' : 'active',
      });
      setMsg('Status updated');
      fetchAdmins();
    } catch {
      setMsg('Failed to update status');
    }
  };

  // PUT update
  const onUpdate = async (data: AdminUpdateInput) => {
    if (!selectedId) return;
    try {
      await api.put(`/admin/${selectedId}`, data);
      setMsg('Updated');
      reset();
      setSelectedId(null);
      fetchAdmins();
    } catch (e: any) {
      setMsg(e?.response?.data?.message || 'Update failed');
    }
  };

  // DELETE
  const removeAdmin = async (id: number) => {
    if (!confirm('Delete this admin?')) return;
    try {
      await api.delete(`/admin/${id}`);
      setMsg('Deleted');
      fetchAdmins();
    } catch {
      setMsg('Delete failed');
    }
  };

  // Filters
  const fetchInactive = async () => {
    try {
      const res = await api.get('/admin/filter/inactive');
      setAdmins(res.data || []);
      setMsg('Showing inactive admins');
    } catch {
      setMsg('Failed to fetch inactive');
    }
  };

  const fetchOlderThan = async (min = 40) => {
    try {
      const res = await api.get(`/admin/filter/age/${min}`);
      setAdmins(res.data || []);
      setMsg(`Showing admins age >= ${min}`);
    } catch {
      setMsg('Failed to fetch age filter');
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Admins (GET)</h2>
        <div className="flex gap-2">
          <button
            onClick={() => fetchAdmins()}
            className="px-3 py-1 rounded bg-gray-200"
          >
            All
          </button>
          <button
            onClick={() => fetchInactive()}
            className="px-3 py-1 rounded bg-yellow-200"
          >
            Inactive
          </button>
          <button
            onClick={() => fetchOlderThan(40)}
            className="px-3 py-1 rounded bg-purple-200"
          >
            Age ≥ 40
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">#</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Age</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id} className="border-b">
                <td className="py-2">{a.id}</td>
                <td className="py-2">{a.fullName}</td>
                <td className="py-2">{a.email}</td>
                <td className="py-2">{a.age}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-0.5 rounded ${
                      a.status === 'active' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => changeStatus(a.id, a.status)}
                      className="px-2 py-1 bg-yellow-200 rounded"
                    >
                      Toggle Status (PATCH)
                    </button>
                    <a
                      href={`/admin/${a.id}`}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      View (SSR)
                    </a>
                    <button
                      onClick={() => removeAdmin(a.id)}
                      className="px-2 py-1 bg-red-200 rounded"
                    >
                      Delete (DELETE)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(a.id);
                        reset({
                          fullName: a.fullName,
                          email: a.email,
                          age: a.age,
                        } as any);
                      }}
                      className="px-2 py-1 bg-blue-200 rounded"
                    >
                      Edit ↴
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Inline Update Form */}
      {selectedId && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-medium mb-2">Update Admin #{selectedId} (PUT)</h3>
          <form
            onSubmit={handleSubmit(onUpdate)}
            className="grid grid-cols-1 md:grid-cols-4 gap-2"
          >
            <div>
              <input
                {...register('fullName')}
                placeholder="Full Name"
                className="w-full border p-2 rounded"
              />
              {errors.fullName && (
                <p className="text-red-600 text-xs">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('email')}
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              {errors.email && (
                <p className="text-red-600 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('age')}
                placeholder="Age"
                className="w-full border p-2 rounded"
              />
              {errors.age && (
                <p className="text-red-600 text-xs">{errors.age.message}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                disabled={isSubmitting}
                className="px-3 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  reset();
                }}
                className="px-3 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {msg && <div className="text-sm text-gray-600 mt-3">{msg}</div>}
    </div>
  );
}
