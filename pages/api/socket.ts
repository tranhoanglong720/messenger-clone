import { Server } from "socket.io";
import getMessages from "@/app/action/getMessages";

export default function SocketHandler(req: any, res: any) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket_io",
    // @ts-ignore
    addTrailingSlash: false,
  });

  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", async ({ conversationId, data }) => {
      console.log("As", data);
      const dataMess = await getMessages(conversationId);
      io.emit(`receive-message`, dataMess);
    });
  });

  console.log("Setting up socket");
  res.end();
}
