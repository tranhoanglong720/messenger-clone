import * as React from "react";

export interface IAppProps {}

export default function Empty(props: IAppProps) {
  return (
    <div
      className="
        flex
        justify-center
        items-center
        h-full
        px-4
        py-8
        bg-gray-200
        "
    >
      <div className=" text-center items-center flex flex-col">
        <h3 className="mt-2 text-xl text-gray-900 font-semibold">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
}
