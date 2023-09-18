"use client";

import Avatar from "@/app/component/avatar/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { data } from "autoprefixer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

export interface IAppProps {
  data: FullConversationType;
  selected?: boolean;
}

export default function ItemConversation(props: IAppProps) {
  const otherUser = useOtherUser(props.data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversation/${props.data.id}`);
  }, [props.data, router]);

  const lastMessage = useMemo(() => {
    const messages = props.data.messages || [];

    return messages[messages.length - 1];
  }, [props.data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="w-full relative cursor-pointer flex items-center space-x-3 rounded-lg hover:bg-neutral-100"
    >
      <Avatar user={otherUser!} />
      <div className="flex flex-col">
        <div className="flex justify-between items-center gap-x-3">
          <span className="text-sm">{otherUser?.name}</span>

          {lastMessage?.createdAt && (
            <p
              className="
                  text-sm
                  text-gray-400 
                  font-light
                  leading-5
                  text-center
                "
            >
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
        <span
          className="    text-xs 
                  text-gray-400 
                  font-light"
        >
          {lastMessageText}
        </span>
      </div>
    </div>
  );
}
