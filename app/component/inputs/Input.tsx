"use client";

import clsx from "clsx";
import * as React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IAppProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

export default function Input({
  label,
  id,
  type = "text",
  required,
  register,
  errors,
  disabled,
}: IAppProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `
      form-input
      block 
      w-full
      rounded-md
      border-0
      py-1.5
      px-2
      ring-1
      ring-inset
      ring-gray-300
      placeholder:text-gray-400 
      focus:ring-2 
      focus:ring-inset 
      focus:ring-sky-600 
      sm:text-sm 
      sm:leading-6`,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  );
}
