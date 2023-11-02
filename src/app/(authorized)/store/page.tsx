"use client";
import React from "react";
import ItemsContainer from "@/app/components/items/ItemsContainer";

interface Item {
  nome: string;
  descricao: any;
}

const monetize = (number: number) => {
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const Loja: React.FC = () => {
  const [money, setMoney] = React.useState(300);

  return (
    <ItemsContainer
      page="store"
      title="Loja"
      money={money}
      onBuySkin={(id) => {
        setMoney((prevMoney) => prevMoney - 30);
      }}
    />
  );
};

export default Loja;
