"use client";

import Button from "@/app/component/Button";
import Input from "@/app/component/inputs/Input";
import * as React from "react";
import { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton ";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";
export interface IAppProps {}

export default function AuthForm(props: IAppProps) {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onsubmit = () => {};

  const socialAction = (data: string) => {};

  return (
    <div className="mt-8 sm:w-full lg:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
              type="text"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <Button type="submit" disabled={isLoading} fullWidth>
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>
        <div className="mt-6 ">
          <div className="relative">
            <div
              className="absolute
                     inset-0
                    flex
                    items-center
                "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <div className="w-full">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
          </div>
          <div className="w-full">
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="mt-6
        flex justify-center px-2 text-gray-500 gap-2
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
