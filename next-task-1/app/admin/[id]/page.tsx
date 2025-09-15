// app/admin/[id]/page.tsx
import Image from 'next/image';
type Props = { params: { id: string } };

export default async function AdminDetail({ params }: Props) {
  const id = params.id;
  const res = await fetch(`http://localhost:3001/admin/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="max-w-lg mx-auto mt-10 bg-red-50 border border-red-200 p-6 rounded-2xl shadow-md text-center">
        <h2 className="text-red-600 font-bold text-xl mb-2">⚠️ Error</h2>
        <p className="text-gray-700">
          Admin not found or error fetching details.
        </p>
      </div>
    );
  }

  const data = await res.json();

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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
