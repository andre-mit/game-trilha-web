"use client";
import React, { useEffect, useState } from "react";
import Items from "@/app/components/items/ItemsContainer";
import { fetchWrapper } from "@/services/fetchWrapper";
import Cookie from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { Inventory } from "@/interfaces/inventory";
import BackButton from "@/app/components/backButton";
import BalanceLink from "@/app/components/BalanceLink";
import ItemFooter from "@/app/components/items/item.footer";
import ItemHeader from "@/app/components/items/item.header";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Item from "@/app/components/items/item";

const InventarioJogador = () => {
  const token = Cookie.get("auth_token");
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);

  const [inventory, setInventory] = useState<Inventory>({
    skins: [],
    boards: [],
  });
  useEffect(() => {
    const listInventory = async () => {
      const { data } = await fetchWrapper<Inventory>(
        "Users/inventory",
        {
          method: "GET",
          cache: "no-cache",
        },
        token,
        "json"
      );

      if (typeof data === "object" && data) {
        setInventory(data);
      }
      setLoading(false);
    };

    listInventory();
  }, [token]);

  const handleUseSkin = async (id: string) => {
    const { data, statusCode, success } = await fetchWrapper<null>(
      `skins/use/${id}`,
      {
        method: "POST",
        cache: "no-cache",
      },
      token,
      "json"
    );

    if (success) {
      toast({ title: "Skin selecionada alterada com sucesso!" });

      const newSkins = inventory.skins.map((skin) => {
        if (skin.id === id) {
          skin.selected = true;
        } else {
          skin.selected = false;
        }

        return skin;
      });

      setInventory({ ...inventory, skins: newSkins });
    } else if (statusCode === 400) {
      toast({
        variant: "error",
        title: "Erro ao alterar skin selecionada",
      });
    } else {
      toast({
        variant: "error",
        title: "Erro ao alterar skin selecionada",
        description: `Tente novamente mais tarde!\n${data}`,
      });
    }
  };

  const handleUseBoard = async (id: string) => {
    const { data, statusCode, success } = await fetchWrapper<null>(
      `boards/use/${id}`,
      {
        method: "POST",
        cache: "no-cache",
      },
      token,
      "json"
    );

    if (success) {
      toast({ title: "Tabuleiro selecionado alterado com sucesso!" });

      const newBoards = inventory.boards.map((board) => {
        if (board.id === id) {
          board.selected = true;
        } else {
          board.selected = false;
        }

        return board;
      });

      setInventory({ ...inventory, boards: newBoards });
    } else if (statusCode === 400) {
      toast({
        variant: "error",
        title: "Erro ao alterar tabuleiro selecionado",
      });
    } else {
      toast({
        variant: "error",
        title: "Erro ao alterar tabuleiro selecionado",
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
          Inventário
        </div>

        <BackButton />
      </header>
      <main className="lg:max-w-[1100px] max-w-[600px] mx-auto my-2">
        <section className="skins">
          <h2 className="mt-4 text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-yellow-900 rounded-md items-center text-center text-4xl px-3 py-1 flex max-w-[300px] mx-auto justify-center">
            Skins de Peça
          </h2>
          <div className="flex justify-evenly my-8 gap-8 flex-shrink flex-wrap">
            {loading &&
              fakeCount.map((_) => (
                <Skeleton
                  key={"skins-" + _}
                  className="h-[260px] w-[260px] rounded-xl"
                />
              ))}
            {inventory.skins.length == 0 ? (
              <h3 className="text-2xl text-black">Sem Skins adquiridas</h3>
            ) : (
              inventory.skins.map((skin) => (
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
                    <button
                      onClick={() => handleUseSkin(skin.id)}
                      title="Comprar"
                      className="bg-black rounded-md bottom-1 w-64 text-white p-2 shadow-xl"
                    >
                      Usar skin
                    </button>
                  </ItemFooter>
                </Item>
              ))
            )}
          </div>
        </section>
        <section>
          <h2 className="mt-4 text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-yellow-900 rounded-md items-center text-center text-4xl px-3 py-1 flex max-w-[300px] mx-auto justify-center">
            Tabuleiros
          </h2>
          <div className="flex justify-evenly my-8 gap-8 flex-shrink flex-wrap">
            {loading &&
              fakeCount.map((_) => (
                <Skeleton
                  key={"boards-" + _}
                  className="h-[260px] w-[260px] rounded-xl"
                />
              ))}
            {inventory.boards.length == 0 ? (
              <h3 className="text-2xl text-black">Sem Tabuleiros adquiridos</h3>
            ) : (
              inventory.boards.map((board) => (
                <Item key={board.id}>
                  <ItemHeader name={board.name} />
                  <Image
                    src={board.backgroundImageSrc}
                    alt={board.description}
                    width={128}
                    height={128}
                  />
                  <ItemFooter>
                    <button
                      onClick={() => handleUseBoard(board.id)}
                      title="Comprar"
                      className="bg-black rounded-md bottom-1 w-64 text-white p-2 shadow-xl"
                    >
                      Usar Tabuleiro
                    </button>
                  </ItemFooter>
                </Item>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default InventarioJogador;
