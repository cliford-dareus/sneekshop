import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InputProps } from "../forms/signupForm";

type Props = {
  name: "name" | "email" | "password";
  placeholder: string;
  type: string;
  register: UseFormRegister<InputProps>;
  errors: FieldErrors<InputProps>
};

const Input = ({ type, placeholder, register, name, errors }: Props) => {
  return (
    <input
      className="text-black"
      type={type}
      placeholder={placeholder}
      {...(register(name))}
      aria-invalid={errors.name ? "true" : "false"}
    />
  );
};

export default Input;
