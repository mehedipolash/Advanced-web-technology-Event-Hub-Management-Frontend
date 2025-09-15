// app/admin/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

type Props = { params: Promise<{ id: string }> }; // 👈 params is now a Promise

export default function AdminDetail({ params }: Props) {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // unwrap params asynchronously
    params.then(({ id }) => {
      setId(id);

      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:3001/admin/${id}`, {
            cache: 'no-store',
          });

          if (!res.ok) {
            setError(true);
            toast.error('⚠️ Admin not found or error fetching details.');
            return;
          }

          const json = await res.json();
          setData(json);
          toast.success('✅ Admin details loaded successfully!');
        } catch (err) {
          setError(true);
          toast.error('⚠️ Something went wrong while fetching admin.');
        }
      };

      fetchData();
    });
  }, [params]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-10 bg-red-50 border border-red-200 p-6 rounded-2xl shadow-md text-center">
        <Toaster position="top-right" />
        <h2 className="text-red-600 font-bold text-xl mb-2">⚠️ Error</h2>
        <p className="text-gray-700">
          Admin not found or error fetching details.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <Toaster position="top-right" />
        Loading admin details...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
        <Image
          src="/admin.jpg"
          alt="Admin"
          width={128}
          height={128}
          className="mx-auto rounded-full shadow-md mb-4"
        />{' '}
        ID: {data.id}
      </h1>

      <div className="space-y-3">
        <p className="text-gray-700">
          <strong className="text-indigo-600">Name:</strong> {data.fullName}
        </p>
        <p className="text-gray-700">
          <strong className="text-indigo-600">Email:</strong> {data.email}
        </p>
        <p className="text-gray-700">
          <strong className="text-indigo-600">Age:</strong> {data.age}
        </p>
        <p className="text-gray-700">
          <strong className="text-indigo-600">Status:</strong>{' '}
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              data.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {data.status}
          </span>
        </p>
      </div>
    </div>
  );
}
