"use client";

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import * as React from "react";

import clsx from "clsx";
import Avatar from "@/app/component/avatar/Avatar";

export interface IAppProps {
  data: FullMessageType;
  isLast?: boolean;
}

export default function MessageBox(props: IAppProps) {
  const session = useSession();
  const isOwn = session.data?.user?.email !== props.data?.sender?.email;

  const container = clsx(
    `
    flex gap-3 p-4`,
    isOwn && "justify-end"
  );
  const avatar = clsx("flex items-start", isOwn && "order-2");
  const body = clsx("flex flex-col gap-2 justify-end", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-300 text-white" : "bg-gray-100",
    props.data?.image ? "rounded-md p-0" : "rounded-xl py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar />
      </div>
      <div className={body}>
        <div className={message}>
          <div className="flex gap-x-2">
            <div
              className={clsx(
                `
          text-sm 
          font-bold`,
                isOwn ? " text-sky-600" : " text-gray-500"
              )}
            >
              Long
            </div>
            <div
              className={clsx(
                `
          text-sm 
          font-bold`,
                isOwn ? " text-sky-600" : " text-gray-500"
              )}
            >
              12:00 AM
            </div>
          </div>
          <div>
            asdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdasdsada
            sdasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdasdsadasdasdasd
            asdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdasdsadasdasdasd
          </div>

          {/* <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} /> */}
          {/* {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)} 
              src={data.image} 
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div> */}
          {/* {isLast && isOwn && seenList.length > 0 && (
          <div 
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
}
