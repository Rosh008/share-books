import { MainRoutes } from "@/app/lib/routes";
import LoginForm from "@/app/login/LoginForm";
import Link from "next/link";

export default function login() {
  return (
    <div className="w-full p-4 ml-5 mt-4">
      <div className="my-2">
        <p className="text-5xl font-bold">Log in</p>
        <p className="mt-3 px-1 text-secondary">
          Don't have an account?{" "}
          <Link
            href={MainRoutes.SIGNUP}
            className="text-primary hover:cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
