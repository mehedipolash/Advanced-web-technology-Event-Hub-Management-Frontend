export default function AdminDashboard() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
      <p className="mt-2">Here admin can manage users and organizers.</p>
      <img
        src="/admin.png"
        alt="Admin Image"
        className="mt-4 w-80 rounded-lg shadow mx-auto items-center justify-center"
      />
    </div>
  );
}
