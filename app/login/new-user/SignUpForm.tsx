"use client";

import FormInput from "@/app/components/FormInput";
import { handleSignUpFormSubmit } from "@/app/lib/actions/loginActions";
import PasswordInput from "@/app/login/components/PasswordInput";
import { EnvelopeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signupFormSchema = z.object({
  firstName: z.string().max(50).min(1, { message: "Field is required" }),
  lastName: z.string().max(50).min(1, { message: "Field is required" }),
  email: z.string().email({ message: "Field is required" }),
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
      className="flex flex-col gap-6 mt-8 w-4/5"
    >
      <div className="flex gap-6">
        <FormInput
          type="text"
          placeholder="First name"
          rightIcon={<UserCircleIcon className="h-6 w-6 text-secondary" />}
          register={register("firstName")}
          errorMsg={errors.firstName?.message}
        />
        <FormInput
          type="text"
          placeholder="Last name"
          rightIcon={<UserCircleIcon className="h-6 w-6 text-secondary" />}
          register={register("lastName")}
          errorMsg={errors.lastName?.message}
        />
      </div>
      <FormInput
        type="email"
        placeholder="Email"
        rightIcon={<EnvelopeIcon className="h-6 w-6 text-secondary" />}
        register={register("email")}
        errorMsg={errors.email?.message}
      />
      <PasswordInput
        placeholder="Password"
        register={register("password")}
        errorMsg={errors.password?.message}
      />
      <PasswordInput
        placeholder="Confirm Password"
        register={register("confirmPassword")}
        errorMsg={errors.confirmPassword?.message}
      />
      <button
        type="submit"
        className="mt-3 btn btn-primary text-white w-full rounded-full text-lg"
      >
        Create account
      </button>
    </form>
  );
}
