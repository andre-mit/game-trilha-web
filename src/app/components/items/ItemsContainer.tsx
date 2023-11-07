import BackButton from "../backButton";
import Image from "next/image";
import React from "react";
import BalanceLink from "../BalanceLink";

interface IProps {
  title: string;
  page: "store" | "inventory";
}

const ItemsContainer = ({ title, page }: IProps) => {
  const [imagesNumbers] = React.useState({ start: 3, end: 20 });

  return (
    <div className="min-h-screen bg-green-200 py-8">
      <header className="flex justify-between pt-4 pl-4 pr-4">
        <div className="money fixed top-0 left-0 p-2">
          <BalanceLink />
        </div>
        <div className="flex flex-col flex-grow items-center justify-center gap-1">
          <span className="text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md  bg-yellow-900 rounded-md items-center text-center text-4xl px-3 py-1">
            {title}
          </span>
        </div>
        <div className="  fixed top-0 right-0 p-2 text-white">
          <BackButton />
        </div>
      </header>
      <div className="container mx-auto mt-28">
        <div className="flex flex-wrap justify-around items-center gap-8">
          {Array.from({ length: imagesNumbers.end - imagesNumbers.start }).map(
            (image, index) => {
              const value = 60;
              return (
                <div key={index} className={`w-64`}>
                  <div className="bg-green-300 shadow-md">
                    <div className="bg-yellow-900 rounded-md text-white border-b-2 p-2">
                      <h3 className="text-lg font-semibold text-center">
                        Item {index + 3}
                      </h3>
                    </div>
                    <Image
                      src={`/Skin/${index + 3}.png`}
                      height={128}
                      width={128}
                      className="mx-auto py-4"
                      alt={`Item ${index + 3}`}
                    />
                  </div>
                  {page === "store" && (
                    <>
                      <span className="inline-block text-xl w-2/4 bg-red-600 rounded-md p-2 shadow-xl text-center">
                        {value}
                      </span>
                      <button className="bg-green-500 disabled:bg-green-700 disabled:opacity-70 text-xl w-2/4 text-white rounded-md p-2 shadow-xl">
                        Comprar
                      </button>
                    </>
                  )}
                  {page === "inventory" && (
                    <button className="bg-black rounded-md bottom-1 w-64 text-white p-2 shadow-xl">
                      Usar
                    </button>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsContainer;
