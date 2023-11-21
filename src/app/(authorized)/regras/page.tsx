import React from "react";
import Image from "next/image";
import BackButton from "@/app/components/backButton";

export default function Rules() {
  return (
    <div className="container mx-auto my-8">
      <header className="flex justify-center pt-4 pl-4 pr-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <span className=" text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-4xl bg-purple-700 dark:bg-purple-700 rounded-md px-3 py-2 min-w-full flex items-center">
            Regras
          </span>
        </div>
        <div className="  fixed top-0 right-0 p-4 text-white">
          <BackButton />
        </div>
      </header>

      <main className="max-w-[90rem] flex flex-wrap gap-6 overflow-x-auto place-self-center items-center justify-center w-full p-8">
        <div className="flex-no-shrink fill-current">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-black bg-purple-300 dark:bg-purple-300 rounded-md px-4 py-4">
              <span className=" rounded-md items-center flex">
                <Image
                  src="/ajuda.png"
                  alt="imagem do tabuleiro"
                  className="mr-4 rounded-md"
                  width={400}
                  height={400}
                />
                O jogo de Trilha tem dois participantes, que usam um tabuleiro
                para jogar. Jogadores - 2 Peças - 18 peças sendo 9 brancas e 9
                pretas. Tabuleiro - tabuleiro com 24 casas interligadas
                horizontalmente e verticalmente. Objetivo - Deixar o adversário
                com 2 peças no tabuleiro ou deixá-lo sem movimentos.
              </span>
            </span>
          </div>
        </div>
        <div className="flex-no-shrink fill-current">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-black bg-fuchsia-300 dark:bg-fuchsia-300 rounded-md px-4 py-4">
              <span className=" rounded-md items-center flex">
                <div className="text-center">
                  <p className="font-bold mb-4"> Colocando as peças </p>
                  <br />
                  Esta é a fase inicial do jogo onde cada jogador coloca um peça
                  de cada vez alternando entre jogadores, caso um dos jogadores
                  forme uma linha horizontal ou vertical com três peças (um
                  moinho), ele terá o direito de remover uma peça de seu
                  adversário do tabuleiro.
                </div>
                <Image
                  src="/ajuda2.png"
                  alt="imagem do tabuleiro"
                  className="mr-4 rounded-md"
                  width={400}
                  height={400}
                />
              </span>
            </span>
          </div>
        </div>

        <div className="flex-no-shrink fill-current">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-black bg-purple-300 dark:bg-purple-300 rounded-md px-4 py-4">
              <span className=" rounded-md items-center flex">
                <Image
                  src="/ajuda3.png"
                  alt="imagem do tabuleiro"
                  className="mr-4 rounded-md"
                  width={400}
                  height={400}
                />
                <div className="text-center">
                  <p className="font-bold mb-4">Movendo as peças </p>
                  <br />
                  Esta fase se inicia quando ambos os jogadores colocarem suas
                  nove peças em jogo. Consiste em mover suas peças ao longo de
                  uma das linhas do tabuleiro para uma outra casa adjacente.
                  Caso um dos jogadores tenha somente 3 peças em jogo, ele pode
                  voar com suas peças, podendo mover para qualquer casa que não
                  esteja ocupada por uma peça do adversário.
                </div>
              </span>
            </span>
          </div>
        </div>
        <div className="flex-no-shrink fill-current">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-black bg-fuchsia-300 dark:bg-fuchsia-300 rounded-md px-4 py-4">
              <span className=" rounded-md items-center flex">
                <div className="text-center">
                  <p className="font-bold mb-4">Removendo peças adversárias </p>
                  <br />
                  Em qualquer uma das fases acima quando um jogador forma uma
                  linha horizontal ou vertical com 3 peças ele fará um moinho,
                  isso lhe dá o direito de remover uma peça de seu adversário,
                  contudo você não poderá remover uma peça do seu adversário que
                  faz parte de um moinho dele, a não ser que não exista outra
                  peça para remover.
                </div>
                <Image
                  src="/ajuda4.png"
                  alt="imagem do tabuleiro"
                  className="mr-4 rounded-md"
                  width={400}
                  height={400}
                />
              </span>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
