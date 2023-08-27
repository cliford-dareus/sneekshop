"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/input";
import Label from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/libs/funtions/auth";

type Props = {};

export type InputProps = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();

  const mutation = useMutation({
    mutationFn: (formdata: InputProps) => signup(formdata),
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
      className="flex flex-col"
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
      <button>Sign Up</button>
    </form>
  );
};

export default RegisterForm;
