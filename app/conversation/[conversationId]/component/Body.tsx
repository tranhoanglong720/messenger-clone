"use client";

import * as React from "react";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { useEffect } from "react";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";

export interface IAppProps {
  messages: FullMessageType[];
}

export default function Body(props: IAppProps) {
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`api/conversation/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {props.messages?.map((item: FullMessageType, index: number) => (
        <MessageBox
          key={item.id}
          isLast={index === props.messages?.length - 1}
          data={item}
        />
      ))}
    </div>
  );
}
