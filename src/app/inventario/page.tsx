"use client";

import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import Image from "next/image";
import BackButton from "../components/backButton";
import img3 from "../caminho/para/skin/3.png";
import img4 from "../caminho/para/skin/4.png";
import img5 from "../caminho/para/skin/5.png";
import img6 from "../caminho/para/skin/6.png";
import img7 from "../caminho/para/skin/7.png";
import img8 from "../caminho/para/skin/8.png";
import img9 from "../caminho/para/skin/9.png";
import img10 from "../caminho/para/skin/10.png";
import img11 from "../caminho/para/skin/11.png";
import img12 from "../caminho/para/skin/12.png";
import img13 from "../caminho/para/skin/13.png";
import img14 from "../caminho/para/skin/14.png";
import img15 from "../caminho/para/skin/15.png";
import img16 from "../caminho/para/skin/16.png";
import img17 from "../caminho/para/skin/17.png";
import img18 from "../caminho/para/skin/18.png";
import img19 from "../caminho/para/skin/19.png";
import img20 from "../caminho/para/skin/20.png";

interface Item {
  nome: string;
  descricao: any;
}

const InventarioJogador: React.FC = () => {
  // Lógica para criar itens automaticamente de 3.png a 20.png
  const itens: Item[] = [];
  for (let i = 3; i <= 20; i++) {
    const nome = `Item ${i}`;
    const descricao = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          width={150}
          height={150}
          src={require(`./skin/${i}.png`).default}
          alt={nome}
        />
      </div>
    );

    itens.push({ nome, descricao });
  }

  const containerWidth = 256; // Largura fixa dos containers em pixels

  const calculateContainersPerRow = () => {
    const screenWidth = window.innerWidth;
    return Math.floor(screenWidth / containerWidth);
  };

  const containersPerRow = calculateContainersPerRow();

  return (
    <div className="min-h-screen bg-amber-100 py-8">
      <header className="flex justify-between pt-4 pl-4 pr-4">
        <div className="money fixed top-0 left-0 p-2">
          <button className="flex flex-col items-center justify-center gap-1">
            <GiTakeMyMoney className="w-24 h-24 fill-green-500 dark:fill-green-400 drop-shadow-xl shadow-slate-800 dark:drop-shadow-md dark:shadow-white" />
            <span className="text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-green-500 dark:bg-green-400 rounded-full px-3 py-1 min-w-full">
              300 +
            </span>
          </button>
        </div>
        <div className="flex flex-col flex-grow items-center justify-center gap-1" >
          <span className="text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md  bg-yellow-900 rounded-md items-center text-center text-4xl px-3 py-1">
            Inventario
          </span>
        </div>
        <div className="fixed top-0 right-0 p-2 text-white">
          <BackButton />
        </div>
      </header>

      <div className="container  mx-auto  mt-28">
        <div className="flex flex-wrap mx-4">
          {itens.map((item, index) => (
            <div
              key={index}
              className={`w-${100 / containersPerRow}% px-4 mb-8`}
            >
              <div className="bg-yellow-200 shadow-md w-64 h-48">
                <div className="bg-yellow-900 rounded-md text-white border-b-2   p-2 ">
                  <h3 className="text-lg font-semibold text-center">
                    {item.nome}
                  </h3>
                </div>

                <p className="text-brown">{item.descricao}</p>
              </div>
              <button className="bg-black rounded-md bottom-1 w-64 text-white p-2 shadow-xl">
                Use
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventarioJogador;
