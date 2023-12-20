import { Input, InputComponentProps } from "@/app/components/Input";
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
  const { ref, ...other } = register;
  return (
    <div className="w-full">
      <Input ref={(e) => ref(e)} {...other} {...rest} />
      {errorMsg ? <p className="mt-3 text-sm text-error">{errorMsg}</p> : null}
    </div>
  );
}
