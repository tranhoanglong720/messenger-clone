import * as React from "react";
import MessageBox from "./MessageBox";

export interface IAppProps {}

export default function Body(props: IAppProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <MessageBox />
    </div>
  );
}
