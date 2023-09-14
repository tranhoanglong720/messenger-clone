"use Client";

import getCurrentUser from "@/app/action/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";

export default async function Slidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
}
