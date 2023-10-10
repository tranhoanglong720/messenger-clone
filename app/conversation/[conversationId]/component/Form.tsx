"use client";

import * as React from "react";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import io from "socket.io-client";

export interface IAppProps {}
let socket: any;
export default function Form(props: IAppProps) {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = async (data: any) => {
    setValue("message", "", { shouldValidate: true });

    const result = await axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });

    if (result) {
      console.log("re", result);
      await fetch("/api/socket");

      socket = io({
        path: "/api/socket_io",
      });

      socket.emit(`send-message`, {
        conversationId: conversationId,
        data: result.data,
      });
    }
  };
  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId: conversationId,
    });
  };
  return (
    <div
      className="
  py-2
  px-2 
  bg-white 
  border-t 
  flex 
  items-center 
  gap-2 
  lg:gap-2
  w-full
"
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="sqymntz8"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <HiPaperAirplane size={15} className="text-white" />
        </button>
      </form>
    </div>
  );
}
