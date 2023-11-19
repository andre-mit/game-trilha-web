"use client";
import React, { useEffect, useState } from "react";
import Items from "@/app/components/items/ItemsContainer";
import { fetchWrapper } from "@/services/fetchWrapper";
import Cookie from "js-cookie";
import Image from "next/image";
import { Inventory } from "@/interfaces/inventory";
const InventarioJogador = () => {
  const token = Cookie.get("auth_token");

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

  return (
    <Items.Container list={inventory}>
      {({ skins, boards }) => (
        <>
          <Items.Header title="Skins de Peça" />
          <Items.ItemSkin
            skins={skins}
            title="Skins de peça"
            type="inventory"
            onUse={(skin) => {
              console.log(skin.id);
            }}
            />

          <Items.ItemBoard
            boards={boards}
            title="Tabuleiro"
            type="inventory"
            onUse={(board) => {
              console.log(board.id);
            }}
          />
        </>
      )}
    </Items.Container>
  );
};

export default InventarioJogador;
