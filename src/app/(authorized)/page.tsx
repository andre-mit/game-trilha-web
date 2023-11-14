import { GiCrown } from "react-icons/gi";
import { ButtonLink } from "@/app/components/button";
import Link from "next/link";
import BalanceLink from "../components/BalanceLink";
import LogoutButton from "../components/LogoutButton";
import AdminSection from "./components/AdminSection";
import UserContainer from "./components/UserContainer";

export default function Home() {
  return (
    <div className="wrapper flex flex-col justify-between h-screen">
      <header className="flex justify-between pt-4 pl-4 pr-4">
        <BalanceLink />
        <div className="rank">
          <Link href="ranking">
            <GiCrown className="w-24 h-24 fill-yellow-300 hover:fill-yellow-500 transition-colors" />
          </Link>
        </div>
      </header>
      <main className="place-self-center flex flex-col justify-around h-full">
        <AdminSection />
        <section className="avatar flex flex-wrap gap-6 max-w-[500px] items-center justify-center">
          <UserContainer suppressHydrationWarning />
        </section>
        <section className="player flex flex-wrap gap-6 max-w-[500px] items-center justify-center">
          <ButtonLink size="md" href="/game/lobby">
            Jogar
          </ButtonLink>
          <ButtonLink href="/store" size="md">
            Loja
          </ButtonLink>
          <ButtonLink href="/inventory" size="md">
            Inventário
          </ButtonLink>
        </section>
      </main>
      <footer className="self-center flex items-center p-4 text-white">
        <LogoutButton />
      </footer>
    </div>
  );
}
