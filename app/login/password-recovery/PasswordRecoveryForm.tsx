"use client";

import { MAX_FORM_PASSWORD_LENGTH } from "@/app/lib/constants";
import { MainRoutes } from "@/app/lib/routes";
import PasswordInput from "@/app/login/components/PasswordInput";
import SubmitError from "@/app/login/components/SubmitError";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordRecoveryFormSchema = z
  .object({
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordRecoveryFormFields = z.infer<
  typeof passwordRecoveryFormSchema
>;

export default function PasswordRecoveryForm(): JSX.Element {
  const supabase = createClientComponentClient();
  const [error, setError] = React.useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormFields>({
    resolver: zodResolver(passwordRecoveryFormSchema),
  });

  const onFormSubmit = async (data: PasswordRecoveryFormFields) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) setError(error.message);
    else {
      router.push(MainRoutes.LOGIN);
    }
  };

  return (
    <div className="w-full p-4 ml-5 mt-4">
      <div className="my-2">
        <p className="text-5xl font-bold">Reset Password</p>
      </div>

      <form
        onSubmit={handleSubmit((data) => onFormSubmit(data))}
        className="flex flex-col gap-6 mt-8 w-4/5"
      >
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
          className="self-center mt-3 btn btn-primary text-white w-full rounded-full text-lg"
        >
          Reset Password
        </button>
        {error ? (
          <SubmitError errorMsg={error || "Something went wrong!"} />
        ) : null}
      </form>
    </div>
  );
}
