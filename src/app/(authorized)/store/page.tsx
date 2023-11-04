"use client";
import React from "react";
import ItemsContainer from "@/app/components/items/ItemsContainer";

interface Item {
  nome: string;
  descricao: any;
}

const Loja: React.FC = () => {

  return (
    <ItemsContainer
      page="store"
      title="Loja"
    />
  );
};

export default Loja;
