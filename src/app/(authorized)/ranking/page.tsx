import { GiCrown } from "react-icons/gi";
import BackButton from "@/app/components/backButton";
import RankingTable from "./components/rankingTable";

export default function Home() {



  return (
    <div className="wrapper flex flex-col justify-between h-screen">
      <header className="flex justify-center pt-4 pl-4 pr-4">
        <div className="crown flex-no-shrink fill-current">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className=" text-black drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-4xl bg-yellow-500 dark:bg-yellow-400 rounded-md px-3 py-2 min-w-full flex items-center">
              Ranking
              <span className="ml-2 bg-white dark:bg-white rounded-md px-3 py-1 min-w flex items-center">
                <GiCrown className="w-24 h-24 fill-yellow-400" />
              </span>
            </span>
          </div>
        </div>
      </header>
      <main className="max-w-[90rem] flex flex-wrap flex-col gap-6 overflow-x-auto place-self-center items-center justify-center w-full p-8">
        <RankingTable />
      </main>
      <footer className="self-end ml-auto p-4 text-white">
        <BackButton />
      </footer>
    </div>
  );
}
