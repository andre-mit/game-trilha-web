"use client";

import { useState } from "react";
import BalanceLink from "@/app/components/BalanceLink";
import BackButton from "@/app/components/backButton";
import PaymentButtons from "../../components/store/paymentButtons";
import Item, { MoneyType } from "@/app/components/store/item";

export default function Money() {
  const moneyItems: MoneyType[] = [
    {
      id: 1,
      name: "300 Moedas",
      coinAmmount: "300",
      price: 4.99,
    },
    {
      id: 2,
      name: "1500 Moedas",
      coinAmmount: "1500",
      price: 9.99,
    },
    {
      id: 3,
      name: "3000 Moedas",
      coinAmmount: "3000",
      price: 20.99,
    },
    {
      id: 4,
      name: "5000 Moedas",
      coinAmmount: "5000",
      price: 29.99,
    },
    {
      id: 5,
      name: "150.000 Moedas",
      coinAmmount: "150000",
      price: 99.00,
    },
    {
      id: 6,
      name: "300.000 Moedas",
      coinAmmount: "300000",
      price: 149.99,
    },
  ];

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const selectedItem = moneyItems.find((item) => item.id === selectedItemId);

  function handleSelectItem(id: number) {
    if (selectedItemId === id) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(id);
    }
  }

  return (
    <>
      <header className="flex items-center">
        <div className="flex-none justify-start">
          <BackButton />
        </div>
        <div className="flex-auto w-50 ">
          <h1 className="drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-4xl rounded-md px-3 py-2 text-center">
            Compras
          </h1>
        </div>
        <div className="flex-none rounded-2xl m-3 p-3 justify-center items-center">
          <h2 className="dark:text-black">
            <BalanceLink />
          </h2>
        </div>
      </header>
      <div className="flex justify-center items-center flex-col mt-16 gap-24">
        <main className="flex flex-wrap gap-12 justify-center place-self-center">
          {moneyItems.map((item) => (
            <Item
              key={item.id}
              {...item}
              selected={selectedItemId === item.id}
              onSelect={handleSelectItem}
            />
          ))}
        </main>
      </div>
    </>
  );
}
