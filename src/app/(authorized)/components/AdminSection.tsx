"use client";

import { ButtonLink } from "@/app/components/button";
import { useUser } from "@/hooks/useUser";

const AdminSection = () => {
  const { roles } = useUser();
  const isAdmin = roles.includes("Admin");

  return isAdmin ? (
    <section className="admin flex gap-6 max-w-[500px] items-center justify-center">
      <ButtonLink size="md" href="/game/lobby">
        Cadastrar Peças
      </ButtonLink>
      <ButtonLink href="/store" size="md">
        Cadastrar Tabuleiros
      </ButtonLink>
    </section>
  ) : (
    <></>
  );
};

export default AdminSection;
