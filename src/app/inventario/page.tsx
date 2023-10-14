"use client";
import React from "react";
import ItemsContainer from "../components/items/ItemsContainer";

interface Item {
  nome: string;
  descricao: any;
}

const InventarioJogador: React.FC = () => {
  const [money, setMoney] = React.useState(300);
  return (
    <ItemsContainer
      page="inventory"
      title="Inventário"
      money={money} 
      onUseSkin={(id) => {
        console.log("Using id: ", id);
      }}
    />
  );
};

export default InventarioJogador;
