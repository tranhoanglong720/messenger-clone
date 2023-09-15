"use client";

import Avatar from "@/app/component/avatar/Avatar";
import { User } from "@prisma/client";
import axios from "axios";

import { useRouter } from "next/navigation";

import * as React from "react";

export interface IAppProps {
  items: User[];
}

export default function UserList(props: IAppProps) {
  const router = useRouter();

  const handleAddConversation = (id: string) => {
    axios.post("/api/conversation", { userId: id }).then((data) => {
      router.push(`/conversation/${data.data.id}`);
    });
  };

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
        <div className="flex-col">
          <div className="text-xl font-bold text-gray-950 py-4">People</div>
        </div>
        {props.items?.map((item: User) => (
          <div
            onClick={() => {
              handleAddConversation(item.id);
            }}
            key={item?.id}
            className="w-full relative cursor-pointer flex items-center space-x-3 rounded-lg hover:bg-neutral-100"
          >
            <Avatar user={item!} />
            <div className="flex flex-col">
              <span className="text-sm">{item?.name}</span>
              <span className="text-sm"> {item?.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
