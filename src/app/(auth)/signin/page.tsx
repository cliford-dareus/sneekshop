import LoginForm from "@/components/forms/signinForm";
import SigninProvidersBtn from "@/components/forms/signinProvidersBtn";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="max-w-[450px] w-full mx-auto  p-4 rounded-md flex flex-col gap-4">
      <div className="">
        <h1 className="font-koulen text-2xl">Sign In</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <LoginForm />

      <span className="w-full text-center font-koulen">or</span>

      <SigninProvidersBtn
        className="w-full flex items-center justify-center border"
        provider="google"
      >
        Sign In with Google
      </SigninProvidersBtn>
    </div>
  );
};

export default Login;
