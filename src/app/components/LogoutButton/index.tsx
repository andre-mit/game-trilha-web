"use client";
import Cookies from "js-cookie";

import Button from "@/app/components/button";
import { useRouter } from "next/navigation";
import { GiExitDoor } from "react-icons/gi";

const LogoutButton = () => {
  const router = useRouter();
  function handleLogout() {
    Cookies.remove("auth_token");
    router.push("/login");
  }
  
  return (
    <Button
      onClick={handleLogout}
      size="default"
      className="gap-3 text-2xl bg-red-600 hover:bg-red-800"
      title="sair"
    >
      <span>Sair</span>
      <GiExitDoor className="w-8 h-8 fill-white" />
    </Button>
  );
};

export default LogoutButton;
