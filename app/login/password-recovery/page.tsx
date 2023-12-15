import { MainRoutes } from "@/app/lib/routes";
import PasswordRecoveryForm from "@/app/login/password-recovery/PasswordRecoveryForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UpdatePasswordPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(MainRoutes.LOGIN);
  }

  return <PasswordRecoveryForm />;
}
