import { GiTakeMyMoney, GiCrown, GiQueenCrown } from "react-icons/gi";
import Button, { ButtonLink } from "@/app/components/button";

export default function Home() {
  const male = true;
  return (
    <div className="wrapper flex flex-col justify-between h-screen">
      <header className="flex justify-between pt-4 pl-4 pr-4">
        <div className="money h-4 w-4 flex-no-shrink fill-current">
          <button className="flex flex-col items-center justify-center gap-1">
            <GiTakeMyMoney className="w-24 h-24 fill-green-500 dark:fill-green-400 drop-shadow-xl shadow-slate-800 dark:drop-shadow-md dark:shadow-white" />
            <span className="text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-green-500 dark:bg-green-400 rounded-full px-3 py-1 min-w-full">
              300 +
            </span>
          </button>
        </div>
        <div className="rank">
          <button>
            {male ? (
              <GiCrown className="w-24 h-24 fill-yellow-300" />
            ) : (
              <GiQueenCrown className="w-20 h-20 fill-yellow-300" />
            )}
          </button>
        </div>
      </header>
      <main className="flex flex-wrap gap-6 max-w-[500px] place-self-center items-center justify-center">
        <ButtonLink href="/game">Jogar</ButtonLink>
        <Button className="">Loja</Button>
        <Button>Inventário</Button>
      </main>
      <footer className="self-center p-4 text-white">
        <span>Jogo da Trilha</span>
      </footer>
    </div>
  );
}
