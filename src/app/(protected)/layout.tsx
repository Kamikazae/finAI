import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/SideBar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-purple-50">
      <Sidebar />
      <main className="flex-1 p-8 bg-white rounded-l-3xl shadow-lg md:ml-64 max-w-[1200px] mx-auto w-full min-h-screen">
        {children}
      </main>
    </div>
  );
}
