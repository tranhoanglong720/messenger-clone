import * as React from "react";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";

export interface IAppProps {
  messages: FullMessageType[];
}

export default function Body(props: IAppProps) {
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
