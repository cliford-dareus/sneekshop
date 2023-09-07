import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InputProps } from "../forms/signupForm";

type Props = {
  name: string;
  placeholder: string;
  type: string;
  register: UseFormRegister<InputProps | any>;
  errors: FieldErrors<InputProps | any>
};

const Input = ({ type, placeholder, register, name, errors }: Props) => {
  return (
    <input
      className="text-black rounded-md px-4 py-1 outline mt-1 placeholder:text-slate-400"
      type={type}
      placeholder={placeholder}
      {...(register(name))}
      aria-invalid={errors.name ? "true" : "false"}
    />
  );
};

export default Input;
