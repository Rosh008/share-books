"use client";
import { handleLoginFormSubmit } from "@/app/lib/actions/loginActions";
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
      className="flex flex-col gap-4 mt-5"
    >
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
      <button
        type="submit"
        className="self-center mt-3 btn btn-primary text-white w-full rounded-full text-lg"
      >
        Log In
      </button>
    </form>
  );
}
