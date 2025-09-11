// app/admin/[id]/page.tsx
type Props = { params: { id: string } };

export default async function AdminDetail({ params }: Props) {
  const id = params.id;
  const res = await fetch(`http://localhost:3001/admin/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        Admin not found or error fetching details.
      </div>
    );
  }
  const data = await res.json();

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-2">Admin #{data.id}</h1>
      <p>
        <strong>Name:</strong> {data.fullName}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Age:</strong> {data.age}
      </p>
      <p>
        <strong>Status:</strong> {data.status}
      </p>
    </div>
  );
}
