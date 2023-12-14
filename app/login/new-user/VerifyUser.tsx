import { InboxIcon } from "@heroicons/react/24/outline";

interface VerifyUserProps {
  email: string;
}

export default function VerifyUser({ email }: VerifyUserProps): JSX.Element {
  return (
    <div className="mt-8 w-full flex flex-col items-center justify-center gap-4 text-center">
      <div className="flex gap-4">
        <h2 className="mb-2 text-5xl font-bold">Check your inbox</h2>
        <InboxIcon className="h-14 w-14 text-primary" />
      </div>
      <p className="mb-2 text-xl text-secondary">
        We are glad, that you’re with us ! We’ve sent you a verification link to
        the email address{" "}
        <span className="font-medium text-primary">{email}</span>.
      </p>
    </div>
  );
}
