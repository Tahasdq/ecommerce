// app/admin/layout.tsx
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen w-full bg-background">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">{children}<Toaster richColors/></main>
        </div>
      </body>
    </html>
  );
}
