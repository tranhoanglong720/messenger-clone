"use client";

import * as React from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
export interface IAppProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function MessageInput(props: IAppProps) {
  return (
    <div className="relative w-full">
      <input
        id={props.id}
        type={props.type}
        autoComplete={props.id}
        {...props.register(props.id, { required: props.required })}
        placeholder={props.placeholder}
        className="
        text-black
        font-light
        py-2
        px-4
        bg-neutral-300 
        w-full 
        rounded-full
        focus:outline-none
      "
      />
    </div>
  );
}
