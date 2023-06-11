"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const SupabaseProvider = ({ children }: Props) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
