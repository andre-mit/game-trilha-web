import BackButton from "../backButton";
import Image from "next/image";
import React, { FC, ReactElement, JSXElementConstructor } from "react";
import BalanceLink from "../BalanceLink";
import { BoardType, Inventory, SkinType } from "@/interfaces/inventory";

interface IProps<T> {
  list: T;
  children: ({
    skins,
    boards,
  }: {
    skins: SkinType[];
    boards: BoardType[];
  }) => ReactElement;
}

interface IHeaderProps {
  title: string;
}

interface IItemSkinProps {
  onUse?: (skin: SkinType) => void;
  onBuy?: (skin: SkinType) => void;
  title?: string;
  skins: SkinType[];
  type: "store" | "inventory";
}

interface IItemBoardProps {
  onUse?: (board: BoardType) => void;
  onBuy?: (board: BoardType) => void;
  title?: string;
  boards: BoardType[];
  type: "store" | "inventory";
}

const ItemSkin: FC<IItemSkinProps> = ({ onUse, onBuy, skins, title, type }) => {
  return (
    <div className="relative flex flex-wrap justify-around items-center gap-8 mt-32 container mx-auto">
      {title && (
        <span className="absolute top-[-6rem] text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md  bg-yellow-900 rounded-md items-center text-center text-4xl px-3 py-1">
          {title}
        </span>
      )}
      {skins.map((skin) => (
        <div key={skin.id} className="bg-green-300 shadow-md">
          <div className="bg-yellow-900 rounded-md text-white border-b-2 p-2">
            <h3 className="text-lg font-semibold text-center">{skin.name}</h3>
          </div>
          <Image
            src={skin.src}
            height={128}
            width={128}
            className="mx-auto w-32 h-40 object-contain py-4"
            alt={skin.description}
          />
          {type === "store" ? (
            <>
              <span className="inline-block text-xl w-2/4 bg-red-600 rounded-md p-2 shadow-xl text-center">
                {skin.price.toLocaleString("BRL", {
                  currency: "BRL",
                  style: "currency",
                })}
              </span>
              <button onClick={() => onBuy?.(skin)} className="bg-green-500 disabled:bg-green-700 disabled:opacity-70 text-xl w-2/4 text-white rounded-md p-2 shadow-xl">
                Comprar
              </button>
            </>
          ) : (
            <button
              className="bg-black rounded-md bottom-1 w-64 text-white p-2 shadow-xl"
              onClick={() => onUse?.(skin)}
            >
              Usar
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const ItemBoard: FC<IItemBoardProps> = ({
  onUse,
  onBuy,
  boards,
  title,
  type,
}) => {
  return (
    <div className="relative flex flex-wrap justify-around items-center gap-8 mt-32 container mx-auto">
      <span className="absolute top-[-6rem] text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md  bg-yellow-900 rounded-md items-center text-center text-4xl px-3 py-1">
        {title}
      </span>
      {boards.map((board) => (
        <div key={board.id} className="bg-green-300 shadow-md">
          <div className="bg-yellow-900 rounded-md text-white border-b-2 p-2">
            <h3 className="text-lg font-semibold text-center">{board.name}</h3>
          </div>
          <Image
            src={board.backgroundImageSrc}
            height={128}
            width={128}
            className="mx-auto w-32 h-40 object-contain py-4"
            alt={board.description}
          />
          {type === "store" ? (
            <>
              <span className="inline-block text-xl w-2/4 bg-red-600 rounded-md p-2 shadow-xl text-center">
                {board.price.toLocaleString("BRL", {
                  currency: "BRL",
                  style: "currency",
                })}
              </span>
              <button
                onClick={() => onBuy?.(board)}
                className="bg-green-500 disabled:bg-green-700 disabled:opacity-70 text-xl w-2/4 text-white rounded-md p-2 shadow-xl"
              >
                Comprar
              </button>
            </>
          ) : (
            <button
              className="bg-black rounded-md bottom-1 w-64 text-white p-2 shadow-xl"
              onClick={() => onUse?.(board)}
            >
              Usar
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const Header: FC<IHeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between pt-4 pl-4 pr-4">
      <div className="money fixed top-0 left-0 p-2 z-10">
        <BalanceLink />
      </div>

      <div className="fixed top-0 right-0 p-2 text-white z-10">
        <BackButton />
      </div>
    </header>
  );
};

const Container: FC<IProps<Inventory>> = ({ list, children }) => {
  return (
    <div className="min-h-screen bg-green-200 py-8">
      {children({
        skins: list.skins,
        boards: list.boards,
      })}
    </div>
  );
};

const Items = {
  Header,
  Container,
  ItemSkin,
  ItemBoard,
};

export default Items;
