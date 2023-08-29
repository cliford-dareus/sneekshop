import SigninProvidersBtn from "@/components/forms/signinProvidersBtn";
import RegisterForm from "@/components/forms/signupForm";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="max-w-[450px] w-full mx-auto  p-4 rounded-md flex flex-col gap-4">
      <div className="">
        <h1 className="font-koulen text-2xl">Sign Up</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <RegisterForm />

      <span className="w-full text-center font-koulen">or</span>

      <SigninProvidersBtn
        className="-full flex items-center justify-center border"
        provider="google"
      >
        Google
      </SigninProvidersBtn>
    </div>
  );
};

export default Register;
