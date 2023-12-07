import Input, { InputComponentProps } from "@/app/components/Input";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps extends InputComponentProps {
  register: UseFormRegisterReturn;
  errorMsg?: string;
}

export default function FormInput({
  register,
  errorMsg,
  ...rest
}: FormInputProps): JSX.Element {
  return (
    <div className="w-full">
      <Input {...register} {...rest} />
      {errorMsg ? <p className="mt-3 text-sm text-error">{errorMsg}</p> : null}
    </div>
  );
}
