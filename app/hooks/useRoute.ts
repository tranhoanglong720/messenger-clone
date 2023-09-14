import { useMemo } from "react";
import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { signOut } from "next-auth/react";

import { HiChat } from "react-icons/hi";
import { HiUsers, HiArrowLeftOnRectangle } from "react-icons/hi2";

const useRoute = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversation",
        icon: HiChat,
        active: pathname === "/conversation" || !!conversationId,
      },
      {
        label: "User",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "/",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoute;
