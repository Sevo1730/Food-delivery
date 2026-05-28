import AdminSidebar from "./_components/Admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f4f5]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
