"use client";

import * as React from "react";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";

import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import getMessages from "@/app/action/getMessages";

export interface IAppProps {
  messages: FullMessageType[];
  conversationId: string;
}
let socket: any;
export default function Body(props: IAppProps) {
  const [messages, setMessages] = useState<any[]>(props.messages);

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io({
      path: "/api/socket_io",
    });

    socket.on(`receive-message`, (data: any) => {
      console.log("da", data);
      setMessages((pre) => [...pre, data]);
    });
  }

  // const messagess = getMessages("6503d5511c4bf7b1e0c91b4d");

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.map((item: FullMessageType, index: number) => (
        <MessageBox
          key={item.id}
          isLast={index === props.messages?.length - 1}
          data={item}
        />
      ))}
    </div>
  );
}
