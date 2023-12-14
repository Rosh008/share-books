"use client";

import { MainRoutes } from "@/app/lib/routes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.push(MainRoutes.LOGIN);
  };

  return (
    <main>
      <div>
        <button onClick={() => handleLogOut()} className="btn btn-primary">
          Sign out
        </button>
      </div>
    </main>
  );
}
