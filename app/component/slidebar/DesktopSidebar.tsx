"use client";

import useRoute from "@/app/hooks/useRoute";
import DesktopItem from "./DesktopItem";
import Avatar from "../avatar/Avatar";
import { User } from "@prisma/client";
import { useState } from "react";
interface DestopItemProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DestopItemProps> = ({ currentUser }) => {
  const routes = useRoute();
  const [isOpent, setIsOpen] = useState(false);

  return (
    <div
      className="
  hidden
  lg:fixed
  lg:inset-y-0
  lg:z-40
  lg:left-0
  lg:w-20
  lg:overflow-y-auto 
  lg:bg-white 
  lg:border-r-[1px]
  lg:pb-4
  lg:flex
  lg:flex-col
  justify-between
  "
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul>
          {routes.map((item: any) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav
        className="mt-2
      flex 
      flex-col
      justify-center
      items-center

      "
      >
        <div
          onClick={() => {
            setIsOpen(true);
          }}
          className="hover:opacity-75 cursor-pointer transition"
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};
export default DesktopSidebar;
