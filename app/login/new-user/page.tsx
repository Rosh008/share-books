import { MainRoutes } from "@/app/lib/routes";
import SignUpForm from "@/app/login/new-user/SignUpForm";
import Link from "next/link";

export default function NewUser() {
  return (
    <div className="w-full p-4 ml-5 mt-4">
      <div className="my-2">
        <p className="text-5xl font-bold">Create new account</p>
        <p className="mt-3 px-2 text-secondary">
          Already A Member?{" "}
          <Link
            href={MainRoutes.LOGIN}
            className="text-primary hover:cursor-pointer"
          >
            Log In
          </Link>
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
