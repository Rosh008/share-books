import FormInput from "@/app/components/FormInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputprops {
  placeholder: string;
  register: UseFormRegisterReturn;
  errorMsg?: string;
  maxLength?: number;
}

export default function PasswordInput({
  placeholder,
  register,
  errorMsg,
  maxLength,
}: PasswordInputprops): JSX.Element {
  const [isVisible, setVisible] = React.useState(false);
  return (
    <FormInput
      type={isVisible ? "text" : "password"}
      placeholder={placeholder}
      rightIcon={
        isVisible ? (
          <EyeIcon className="h-6 w-6 text-secondary" />
        ) : (
          <EyeSlashIcon className="h-6 w-6 text-secondary" />
        )
      }
      register={register}
      errorMsg={errorMsg}
      onIconClick={() => {
        setVisible(!isVisible);
      }}
      maxLength={maxLength}
    />
  );
}
