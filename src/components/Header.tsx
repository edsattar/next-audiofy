"use client";

import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

import Button from "./Buttons/Button";
import { NavButton } from "./Buttons/NavButton";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: Props) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const player = usePlayer();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={cn("h-fit bg-gradient-to-b from-emerald-800 p-6", className)}>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <NavButton variant="left" onClick={() => router.back()} />
          <NavButton variant="right" onClick={() => router.forward()} />
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <NavButton variant="home" onClick={() => router.push("/")} />
          <NavButton variant="search" onClick={() => router.push("/search")} />
        </div>
        <div className="ml-4 flex items-end gap-x-4">
          {user ? (
            <>
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button onClick={() => router.push("/account")} className="bg-white">
                <FaUserAlt />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={authModal.openAuthModal} className="whitespace-nowrap px-6 py-2 text-white">
                Sign up
              </Button>
              <Button onClick={authModal.openAuthModal} className="whitespace-nowrap bg-white px-6 py-2">
                Log in
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
