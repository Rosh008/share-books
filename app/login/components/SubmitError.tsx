import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface SubmitErrorProps {
  errorMsg: string;
}

export default function SubmitError({
  errorMsg,
}: SubmitErrorProps): JSX.Element {
  return (
    <div className="w-full p-3 flex gap-2 justify-center bg-base-200 rounded-lg">
      <ExclamationTriangleIcon className="h-6 w-6 text-error" />
      <p className="text-error font-semibold">{errorMsg}</p>
    </div>
  );
}
