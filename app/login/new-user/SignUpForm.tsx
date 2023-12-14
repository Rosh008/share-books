"use client";

import FormInput from "@/app/components/FormInput";
import {
  MAX_FORM_INPUT_LENGTH,
  MAX_FORM_PASSWORD_LENGTH,
} from "@/app/lib/constants";
import { MainRoutes } from "@/app/lib/routes";
import PasswordInput from "@/app/login/components/PasswordInput";
import SubmitError from "@/app/login/components/SubmitError";
import VerifyUser from "@/app/login/new-user/VerifyUser";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signupFormSchema = z
  .object({
    // firstName: z.string().max(50).min(1, { message: "Field is required" }),
    // lastName: z.string().max(50).min(1, { message: "Field is required" }),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormFields = z.infer<typeof signupFormSchema>;

export default function SignUpForm(): JSX.Element {
  const supabase = createClientComponentClient();
  const [error, setError] = React.useState("");
  const [showVerify, setShowVerify] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signupFormSchema),
  });

  const onFormSubmit = async (data: SignUpFormFields) => {
    const { data: userData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (authError) setError(authError.message);
    else {
      if (!userData.user?.confirmed_at) {
        setShowVerify(true);
      } else {
        setError("User already exists, try logging in");
      }
    }
  };

  return (
    <>
      {showVerify ? (
        <VerifyUser email={getValues("email")} />
      ) : (
        <>
          <div className="my-2">
            <p className="text-5xl font-bold">Create new account</p>
            <p className="mt-3 px-2 text-secondary">
              Already A Member?{" "}
              <Link
                href={MainRoutes.LOGIN}
                className="text-primary hover:cursor-pointer"
              >
                Log In
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit((data) => onFormSubmit(data))}
            className="flex flex-col gap-6 mt-8 w-4/5"
          >
            {/* Removed firstName and lastName input field's for now}
      {/* <div className="flex gap-6">
        <FormInput
          type="text"
          placeholder="First name"
          rightIcon={<UserCircleIcon className="h-6 w-6 text-secondary" />}
          register={register("firstName")}
          errorMsg={errors.firstName?.message}
          maxLength={MAX_FORM_INPUT_LENGTH}
        />
        <FormInput
          type="text"
          placeholder="Last name"
          rightIcon={<UserCircleIcon className="h-6 w-6 text-secondary" />}
          register={register("lastName")}
          errorMsg={errors.lastName?.message}
          maxLength={MAX_FORM_INPUT_LENGTH}
        />
      </div> */}
            <FormInput
              type="email"
              placeholder="Email"
              rightIcon={<EnvelopeIcon className="h-6 w-6 text-secondary" />}
              register={register("email")}
              errorMsg={errors.email?.message}
              maxLength={MAX_FORM_INPUT_LENGTH}
            />
            <PasswordInput
              key="password"
              placeholder="Password"
              register={register("password")}
              errorMsg={errors.password?.message}
              maxLength={MAX_FORM_PASSWORD_LENGTH}
            />
            <PasswordInput
              key="confirmPassword"
              placeholder="Confirm Password"
              register={register("confirmPassword")}
              errorMsg={errors.confirmPassword?.message}
              maxLength={MAX_FORM_PASSWORD_LENGTH}
            />
            <button
              type="submit"
              className="mt-3 btn btn-primary text-white w-full rounded-full text-lg"
            >
              Create account
            </button>
            {error ? (
              <SubmitError errorMsg={error || "Something went wrong!"} />
            ) : null}
          </form>
        </>
      )}
    </>
  );
}
