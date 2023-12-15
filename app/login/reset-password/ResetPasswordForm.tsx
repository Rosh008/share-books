"use client";

import FormInput from "@/app/components/FormInput";
import { MAX_FORM_INPUT_LENGTH } from "@/app/lib/constants";
import { MainRoutes } from "@/app/lib/routes";
import SubmitError from "@/app/login/components/SubmitError";
import VerifyUser from "@/app/login/new-user/VerifyUser";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordFormSchema = z.object({
  email: z.string().email(),
});

export type ResetPasswordFormFields = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordForm(): JSX.Element {
  const supabase = createClientComponentClient();
  const [error, setError] = React.useState("");
  const [showVerify, setShowVerify] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ResetPasswordFormFields>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const onFormSubmit = async (data: ResetPasswordFormFields) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    if (error) setError(error.message);
    else {
      setShowVerify(true);
    }
  };

  return (
    <>
      {showVerify ? (
        <VerifyUser email={getValues("email")} />
      ) : (
        <>
          <div className="my-2">
            <p className="text-5xl font-bold">Reset Password</p>
            <p className="mt-3 px-2 text-secondary">
              Try{" "}
              <Link
                href={MainRoutes.LOGIN}
                className="text-primary hover:cursor-pointer"
              >
                Login
              </Link>{" "}
              instead?
            </p>
          </div>

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
        </>
      )}
    </>
  );
}
