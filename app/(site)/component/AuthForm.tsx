"use client";

import Button from "@/app/component/Button";
import Input from "@/app/component/inputs/Input";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton ";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";
export interface IAppProps {}

export default function AuthForm(props: IAppProps) {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status]);

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

  const onsubmit = (data: any) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then((data) => {
          signIn("credentials", {
            ...data,
            redirect: false,
          });
        })
        .catch(() => {
          toast.error("Register error", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

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
