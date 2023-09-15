"use client";

import { FullConversationType } from "@/app/types";
import { MdOutlineGroupAdd } from "react-icons/md";

import * as React from "react";
import ItemConversation from "./ItemConversation";
import useConversation from "@/app/hooks/useConversation";

export interface IAppProps {
  items: FullConversationType[];
}

export default function ConversationList(props: IAppProps) {
  const { conversationId, isOpen } = useConversation();

  return (
    <div
      className="
  fixed
  inset-y-0
  pb-20
  lg:pb-20
  lg:left-20
  left-0
  lg:w-80
  lg:block
  block
  p-3
  w-full
  overflow-y-auto

  "
    >
      <div
        className="
      px-5
      "
      >
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-xl font-bold text-gray-950 ">Messages</div>
          <div className="flex justify-center items-center cursor-pointer hover:rounded-full hover:opacity-75 transition py-2">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {props.items?.map((item: any) => (
          <ItemConversation
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </div>
  );
}
