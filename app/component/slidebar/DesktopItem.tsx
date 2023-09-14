"use client";

import Link from "next/link";
import * as React from "react";
import clsx from "clsx";

export interface DestopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick: () => void;
  active?: boolean;
}
const DesktopItem: React.FC<DestopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          active && "bg-gray-100 text-black !important",
          "group flex gap-x-3  text p-3 font-semibold text-gray-500 hover:text-black hover:bg-gray-100"
        )}
      >
        <Icon className="w-6 h-6" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};
export default DesktopItem;
