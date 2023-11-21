import { GiCrown } from "react-icons/gi";
import BackButton from "@/app/components/backButton";

export default function Home() {
  const tabelaDados = [
    { lugar: 1, players: "Player 1", score: 100 },
    { lugar: 2, players: "Player 2", score: 90 },
    { lugar: 3, players: "Player 3", score: 80 },
    { lugar: 4, players: "Player 3", score: 80 },
    { lugar: 5, players: "Player 3", score: 80 },
  ];

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
        <div className="  fixed top-0 right-0 p-4 text-white">
          <BackButton />
        </div>
      </header>
      <main className="max-w-[90rem] flex flex-wrap gap-6 overflow-x-auto place-self-center items-center justify-center w-full p-8">
        <table className="table-auto min-w-full bg-white text-black rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-yellow-400 text-black">
              <th className="py-2 border border-black" style={{ width: "6ch" }}>
                Lugar
              </th>
              <th className="py-2 border border-black">Players</th>
              <th className="py-2 border border-black">Score</th>
            </tr>
          </thead>
          <tbody>
            {tabelaDados.map((item, index) => (
              <tr key={index}>
                <td className=" h-16 px-4 border border-black">{item.lugar}</td>
                <td className=" px-4 border border-black">{item.players}</td>
                <td className=" px-4 border border-black">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className="self-end ml-auto p-4 text-white"></footer>
    </div>
  );
}
