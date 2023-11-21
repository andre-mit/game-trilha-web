"use client";
import React, { useEffect, useState } from "react";
import Items from "@/app/components/items/ItemsContainer";
import { fetchWrapper } from "@/services/fetchWrapper";
import Cookie from "js-cookie";
import { Inventory } from "@/interfaces/inventory";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/useUser";
import BackButton from "@/app/components/backButton";
import BalanceLink from "@/app/components/BalanceLink";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Item from "@/app/components/items/item";
import ItemHeader from "@/app/components/items/item.header";
import ItemFooter from "@/app/components/items/item.footer";

const Loja = () => {
  const token = Cookie.get("auth_token");

  const [store, setStore] = useState<Inventory>({
    skins: [],
    boards: [],
  });

  const { toast } = useToast();
  const { decreaseBalance } = useUser();

  useEffect(() => {
    const listStore = async () => {
      const { data } = await fetchWrapper<Inventory>(
        "Users/skinRemaining", // inserir URL para API de consulta de itens na loja
        {
          method: "GET",
          cache: "no-cache",
        },
        token,
        "json"
      );

      if (typeof data === "object" && data) {
        setStore(data);
      }
    };

    listStore();
  }, [token]);

  const buySkin = async (id: string, price: number) => {
    const { data, statusCode, success } = await fetchWrapper<null>(
      `skins/buy/${id}`, // inserir URL para API de compra de itens na loja
      {
        method: "POST",
        cache: "no-cache",
      },
      token,
      "json"
    );

    if (success) {
      toast({ title: "Compra realizada com sucesso!" });
      decreaseBalance(price);
      const newSkins = store.skins.filter((skin) => skin.id !== id);
      setStore({ ...store, skins: newSkins });
    } else if (statusCode === 400) {
      toast({
        variant: "error",
        title: "Erro ao realizar compra",
        description: `Verifique seu saldo e tente novamente!\n${data}`,
      });
    } else {
      toast({
        variant: "error",
        title: "Erro ao realizar compra",
        description: `Tente novamente mais tarde!\n${data}`,
      });
    }
  };

  const buyBoard = async (id: string, price: number) => {
    const { data, statusCode, success } = await fetchWrapper<null>(
      `boards/buy/${id}`,
      {
        method: "POST",
        cache: "no-cache",
      },
      token,
      "json"
    );

    if (success) {
      toast({ title: "Compra realizada com sucesso!" });
      decreaseBalance(price);

      const newBoards = store.boards.filter((board) => board.id !== id);
      setStore({ ...store, boards: newBoards });
    } else if (statusCode === 400) {
      toast({
        variant: "error",
        title: "Erro ao realizar compra",
        description: `Verifique seu saldo e tente novamente!\n${data}`,
      });
    } else {
      toast({
        variant: "error",
        title: "Erro ao realizar compra",
        description: `Tente novamente mais tarde!\n${data}`,
      });
    }
  };

  const fakeCount = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-green-200 py-8">
      <header className="flex justify-between items-center pl-4 pr-4">
        <BalanceLink />

        <div className="bg-green-500 text-white rounded-xl flex px-12 py-4 text-5xl">
          Loja
        </div>

        <BackButton />
      </header>
      <main className="lg:max-w-[1100px] max-w-[600px] mx-auto my-2">
        <section className="skins">
          <h2 className="mt-4 text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-yellow-900 rounded-md items-center text-center text-4xl px-3 py-1 flex max-w-[300px] mx-auto justify-center">
            Skins de Peça
          </h2>
          <div className="flex justify-evenly my-8 gap-8 flex-shrink flex-wrap">
            {store.skins.length == 0 &&
              fakeCount.map((_) => (
                <Skeleton
                  key={"skins-" + _}
                  className="h-[260px] w-[260px] rounded-xl"
                />
              ))}
            {store.skins.map((skin) => (
              <Item key={skin.id}>
                <ItemHeader name={skin.name} />
                <Image
                  src={skin.src}
                  alt={skin.description}
                  width={128}
                  height={128}
                  className="rounded-full"
                />
                <ItemFooter>
                  <span className="inline-block text-xl w-2/4 bg-red-600 rounded-md p-2 shadow-xl text-center">
                    {skin.price}
                  </span>
                  <button
                    onClick={() => buySkin(skin.id, skin.price)}
                    title="Comprar"
                    className="bg-green-500 disabled:bg-green-700 disabled:opacity-70 text-xl w-2/4 text-white rounded-md p-2 shadow-xl"
                  >
                    Comprar
                  </button>
                </ItemFooter>
              </Item>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mt-4 text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-yellow-900 rounded-md items-center text-center text-4xl px-3 py-1 flex max-w-[300px] mx-auto justify-center">
            Tabuleiros
          </h2>
          <div className="flex justify-evenly my-8 gap-8 flex-shrink flex-wrap">
            {store.boards.length == 0 &&
              fakeCount.map((_) => (
                <Skeleton
                  key={"boards-" + _}
                  className="h-[260px] w-[260px] rounded-xl"
                />
              ))}
            {store.boards.map((board) => (
              <Item key={board.id}>
                <ItemHeader name={board.name} />
                <Image
                  src={board.backgroundImageSrc}
                  alt={board.description}
                  width={128}
                  height={128}
                  className="rounded-full"
                />
                <ItemFooter>
                  <span className="inline-block text-xl w-2/4 bg-red-600 rounded-md p-2 shadow-xl text-center">
                    {board.price}
                  </span>
                  <button
                    onClick={() => buyBoard(board.id, board.price)}
                    title="Comprar"
                    className="bg-green-500 disabled:bg-green-700 disabled:opacity-70 text-xl w-2/4 text-white rounded-md p-2 shadow-xl"
                  >
                    Comprar
                  </button>
                </ItemFooter>
              </Item>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Loja;
