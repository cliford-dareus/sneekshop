"use client";

import React, { useEffect } from "react";
import Label from "../ui/label";
import Input from "../ui/input";
import { useForm } from "react-hook-form";
import { InputProps } from "./signupForm";
import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";

type Props = {};

const LoginForm = (props: Props) => {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  });

  const mutation = useMutation({
    mutationFn: (formdata: InputProps) =>
      signIn("credentials", { ...formdata, redirect: false }),
    onSuccess: () => {
      // Invalidate and refetch
    },
    onError: (err) => {
      console.log("Invalid");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((formdata: InputProps) =>
        mutation.mutate(formdata)
      )}
      className="flex flex-col gap-2"
    >
      <div className="w-full flex flex-col">
        <Label name="Name" />
        <Input
          type="text"
          register={register}
          placeholder="John Doe"
          name="name"
          errors={errors}
        />
        {errors.name?.type === "required" && (
          <div role="alert">Field must not be empty</div>
        )}
      </div>
      <div className="w-full flex flex-col">
        <Label name="Email" />
        <Input
          type="email"
          register={register}
          placeholder="johndoe@gmail.com"
          name="email"
          errors={errors}
        />
        {errors.email && <p role="alert">Field must not be empty</p>}
      </div>
      <div className="w-full flex flex-col">
        <Label name="Password" />
        <Input
          type="password"
          register={register}
          placeholder=""
          name="password"
          errors={errors}
        />
      </div>

      <Button className="w-full flex items-center justify-center bg-red-600 mt-2">Sign In</Button>
    </form>
  );
};

export default LoginForm;
