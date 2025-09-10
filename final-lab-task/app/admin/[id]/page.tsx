interface AdminPageProps {
  params: { id: string };
}

export default function AdminPage({ params }: AdminPageProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Profile</h1>
      <p>Showing details for Admin ID: {params.id}</p>
    </div>
  );
}
