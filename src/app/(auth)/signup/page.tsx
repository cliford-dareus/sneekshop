import RegisterForm from "@/components/forms/signupForm";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="max-w-[450px] w-full mx-auto  p-4 rounded-md">
      <h1 className="">Register</h1>
      <RegisterForm />
      <span>or</span>
    </div>
  );
};

export default Register;
