"use client";
import React, { useEffect, useState } from "react";
import Items from "@/app/components/items/ItemsContainer";
import { fetchWrapper } from "@/services/fetchWrapper";
import Cookie from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { Inventory } from "@/interfaces/inventory";
const InventarioJogador = () => {
  const token = Cookie.get("auth_token");
  const { toast } = useToast();

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

  return (
    <Items.Container list={inventory}>
      {({ skins, boards }) => (
        <>
          <Items.Header title="Skins de Peça" />
          <Items.ItemSkin
            skins={skins}
            title="Skins de peça"
            type="inventory"
            onUse={(skin) => handleUseSkin(skin.id)}
          />

          <Items.ItemBoard
            boards={boards}
            title="Tabuleiro"
            type="inventory"
            onUse={(board) => handleUseBoard(board.id)}
          />
        </>
      )}
    </Items.Container>
  );
};

export default InventarioJogador;
