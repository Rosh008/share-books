"use client";

import { handleSignUpFormSubmit } from "@/app/lib/actions/loginActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signupFormSchema = z.object({
  firstName: z.string().max(50).min(1, { message: "Field is required" }),
  lastName: z.string().max(50).min(1, { message: "Field is required" }),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
});

export type SignUpFormFields = z.infer<typeof signupFormSchema>;

export default function SignUpForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onFormSubmit = async (data: SignUpFormFields) => {
    await handleSignUpFormSubmit(data);
    console.log("submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onFormSubmit(data))}
      className="flex flex-col gap-4 mt-5"
    >
      <div className="flex gap-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="First name"
            {...register("firstName")}
            className="input input-bordered input-primary w-full bg-secondary"
          />
          {errors.firstName ? (
            <p className="mt-3 text-sm text-error">
              {errors.firstName.message}
            </p>
          ) : null}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Last name"
            {...register("lastName")}
            className="input input-bordered input-primary w-full"
          />
          {errors.lastName ? (
            <p className="mt-3 text-sm text-error">{errors.lastName.message}</p>
          ) : null}
        </div>
      </div>
      <input
        type="text"
        placeholder="Email"
        {...register("email")}
        className="input input-bordered input-primary w-full"
      />
      {errors.email ? (
        <p className="text-sm text-error">{errors.email.message}</p>
      ) : null}

      <input
        type="text"
        placeholder="Password"
        {...register("password")}
        className="input input-bordered input-primary w-full"
      />
      {errors.password ? (
        <p className="text-sm text-error">{errors.password.message}</p>
      ) : null}

      <input
        type="text"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        className="input input-bordered input-primary w-full"
      />
      {errors.confirmPassword ? (
        <p className="text-sm text-error">{errors.confirmPassword.message}</p>
      ) : null}

      <button
        type="submit"
        className="self-center mt-3 btn btn-primary text-white w-full rounded-full text-lg"
      >
        Create account
      </button>
    </form>
  );
}
