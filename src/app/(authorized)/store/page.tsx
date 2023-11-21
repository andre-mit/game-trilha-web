"use client";
import React, { useEffect, useState } from "react";
import Items from "@/app/components/items/ItemsContainer";
import { fetchWrapper } from "@/services/fetchWrapper";
import Cookie from "js-cookie";
import { Inventory } from "@/interfaces/inventory";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/useUser";

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

  return (
    <Items.Container list={store}>
      {({ skins, boards }) => (
        <>
          <Items.Header title="Skins de Peça" />
          <Items.ItemSkin
            skins={skins}
            title="Skins de peça"
            type="store"
            onBuy={(skin) => buySkin(skin.id, skin.price)}
          />

          <Items.ItemBoard
            boards={boards}
            title="Tabuleiro"
            type="store"
            onBuy={(board) => buyBoard(board.id, board.price)}
          />
        </>
      )}
    </Items.Container>
  );
};

export default Loja;
