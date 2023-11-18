"use client";
import React, { useEffect, useState } from "react";
import Items from "@/app/components/items/ItemsContainer";
import ItemsContainer from "@/app/components/items/ItemsContainer";
import { fetchWrapper } from "@/services/fetchWrapper";
import Cookie from "js-cookie";
import Image from "next/image";
import { Inventory } from "@/interfaces/inventory";

const Loja = () => {
 const token = Cookie.get("auth_token");

 const [store, setStore] = useState<Inventory>({
   skins: [],
   boards: [],
 });
 useEffect(() => {
   const listStore = async () => {
     const { data } = await fetchWrapper<Inventory>(
       "Users/inventory", // inserir URL para API de consulta de itens na loja
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

 return (
   <Items.Container list={store}>
     {({ skins, boards }) => (
       <>
         <Items.Header title="Skins de Peça" />
         <Items.ItemSkin
           skins={skins}
           title="Skins de peça"
           type="store"
           onBuy={(skin) => {
             console.log({skin});
            }}
            />

         <Items.ItemBoard
           boards={boards}
           title="Tabuleiro"
           type="store"
           onBuy={(board) => {
             console.log({board});
           }}
         />
       </>
     )}
   </Items.Container>
 );
};

export default Loja;
