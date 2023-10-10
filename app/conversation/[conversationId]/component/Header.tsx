"use client";

import Avatar from "@/app/component/avatar/Avatar";
import useActiveList from "@/app/hooks/useActiveList";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import * as React from "react";
import { useMemo } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";

export interface IAppProps {
  conversation: Conversation & {
    users: User[];
  };
}

export default function Header(props: IAppProps) {
  const otherUser = useOtherUser(props.conversation);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (props.conversation.isGroup) {
      return `${props.conversation.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [props.conversation, isActive]);

  return (
    <div
      className="
    flex
    justify-between
    items-center
    
    p-3
    border-b-2
    border-gray-300
    "
    >
      <div
        className="
      flex 
      items-center
      gap-x-3
      "
      >
        <Avatar user={otherUser} />
        <div>
          <div
            className="
          text-sm
          font-bold
          
          "
          >
            {props.conversation.name || otherUser.name}
          </div>
          <div
            className="
           text-xs
           font-sans
           text-gray-500
           "
          >
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        className="
        text-sky-500
        cursor-pointer
        hover:text-sky-600
        transition
        pl-3
        "
      />
    </div>
  );
}
