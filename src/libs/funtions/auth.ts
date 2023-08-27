import { InputProps } from "@/components/forms/signupForm";
import axios from "axios";

export const signup = async (formdata: InputProps) => {
  console.log(formdata);
  return await axios.post("/api/register", formdata);
};
