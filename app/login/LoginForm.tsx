"use client";
import FormInput from "@/app/components/FormInput";
import { handleLoginFormSubmit } from "@/app/lib/actions/loginActions";
import {
  MAX_FORM_INPUT_LENGTH,
  MAX_FORM_PASSWORD_LENGTH,
} from "@/app/lib/constants";
import PasswordInput from "@/app/login/components/PasswordInput";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type LoginFormFields = z.infer<typeof loginFormSchema>;

export default function LoginForm(): JSX.Element {
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
    await handleLoginFormSubmit(data);
    console.log("submitted!");
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
      <PasswordInput
        placeholder="Password"
        register={register("password")}
        errorMsg={errors.password?.message}
        maxLength={MAX_FORM_PASSWORD_LENGTH}
      />
      <button
        type="submit"
        className="self-center mt-3 btn btn-primary text-white w-full rounded-full text-lg"
      >
        Log In
      </button>
    </form>
  );
}
