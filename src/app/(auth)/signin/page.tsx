

import LoginForm from "@/components/forms/signinForm";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import next from "next/types";

type Props = {};

const Login = (props: Props) => {

  return (
    <div className="max-w-[450px] w-full mx-auto  p-4 rounded-md">
      <h1 className="">Sign In</h1>
      <LoginForm />
      <span>or</span>
    </div>
  );
};

export default Login;
