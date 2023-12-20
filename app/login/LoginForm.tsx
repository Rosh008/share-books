"use client";
import FormInput from "@/app/components/FormInput";
import {
  MAX_FORM_INPUT_LENGTH,
  MAX_FORM_PASSWORD_LENGTH,
} from "@/app/lib/constants";
import { MainRoutes } from "@/app/lib/routes";
import PasswordInput from "@/app/login/components/PasswordInput";
import SubmitError from "@/app/login/components/SubmitError";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type LoginFormFields = z.infer<typeof loginFormSchema>;

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: LoginFormFields) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) setError(error.message);
    router.push(MainRoutes.HOME);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onFormSubmit(data))}
      className="flex flex-col gap-6 mt-8 w-4/5"
    >
      <FormInput
        type="email"
        placeholder="Email"
        rightIcon={<EnvelopeIcon className="h-6 w-6 text-secondary" />}
        register={register("email")}
        errorMsg={errors.email?.message}
        maxLength={MAX_FORM_INPUT_LENGTH}
      />
      <div>
        <PasswordInput
          placeholder="Password"
          register={register("password")}
          errorMsg={errors.password?.message}
          maxLength={MAX_FORM_PASSWORD_LENGTH}
        />
        <div className="mt-3">
          <Link
            href={MainRoutes.RESET_PASSWORD}
            className="text-sm text-primary hover:cursor-pointer px-2"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="self-center mt-3 btn btn-primary text-white w-full rounded-full text-lg"
      >
        Log In
      </button>
      {error ? (
        <SubmitError errorMsg={error || "Something went wrong!"} />
      ) : null}
    </form>
  );
}
