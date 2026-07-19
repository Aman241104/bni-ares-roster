import Link from "next/link";
import { logoutAction } from "../login/actions";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminNav />
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
          <Link href="/" className="text-sm text-zinc-500 hover:text-brand-600">
            ← View Site
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-medium text-zinc-500 hover:text-brand-600">
              Log Out
            </button>
          </form>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
