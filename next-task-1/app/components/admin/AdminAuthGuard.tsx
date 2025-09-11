// app/components/admin/AdminAuthGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/axios';

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    api
      .get('/admin/me')
      .then(() => active && setLoading(false))
      .catch(() => router.replace('/admin/login'));
    return () => {
      active = false;
    };
  }, [router]);

  if (loading)
    return <div className="text-gray-600">Checking authentication...</div>;
  return <>{children}</>;
}
