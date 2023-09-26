import getConversationById from "@/app/action/getConversationById";
import getMessages from "@/app/action/getMessages";
import Empty from "@/app/component/Empty";
import Header from "./component/Header";
import Body from "./component/Body";
import Form from "./component/Form";
import { useState, useEffect } from "react";
import io from "socket.io-client";
interface IParams {
  conversationId: string;
}
let socket: any;
const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  // const [messages, setMessages] = useState<any[]>([]);

  const messages = await getMessages(params.conversationId);
  // useEffect(() => {
  //   socketInitializer();

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // async function socketInitializer() {
  //   await fetch("/api/socket");

  //   socket = io();

  //   socket.on("receive-message", (data: any) => {
  //     setMessages((pre) => [...pre, data]);
  //   });
  // }

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Empty />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col bg-gray-200">
        <Header conversation={conversation} />
        <Body messages={messages!} conversationId={params.conversationId} />
        <Form />
      </div>
    </div>
  );
};

export default ChatId;
