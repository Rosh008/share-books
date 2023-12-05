"use server";

import { LoginFormFields } from "@/app/login/LoginForm";
import { SignUpFormFields } from "@/app/login/new-user/SignUpForm";

export async function handleLoginFormSubmit(data: LoginFormFields) {
    console.log({ password: data.password, email: data.email });
}
  
export async function handleSignUpFormSubmit(data: SignUpFormFields) {
    console.log(data)
}