"use client";

import { useState } from "react";
import BalanceLink from "@/app/components/BalanceLink";
import BackButton from "@/app/components/backButton";
import PaymentButton from "@/app/components/paymentButton";
import Item, { MoneyType } from "@/app/components/store/item";

export default function Money() {
  const moneyItems: MoneyType[] = [
    {
      id: 1,
      name: "30",
      price: 5.99,
    },
    {
      id: 2,
      name: "150",
      price: 10.99,
    },
    {
      id: 3,
      name: "300",
      price: 25.99,
    },
    {
      id: 4,
      name: "500",
      price: 30.99,
    },
    {
      id: 5,
      name: "15.000",
      price: 105.99,
    },
    {
      id: 6,
      name: "30.000",
      price: 250.99,
    },
  ];

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const selectedItem = moneyItems.find((item) => item.id === selectedItemId);

  function handleSelectItem(id: number) {
    if (selectedItemId === id) {
      setSelectedItemId(null);
      console.log("Deselecionado", id);
    } else {
      setSelectedItemId(id);
      console.log("Selecionado", id);
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
        {selectedItemId && (
          <section>
            <h3 className="text-2xl font-bold">Pagamento</h3>
            <div className="flex p-8 text-xl">
              <span>
                Pagar R$ {selectedItem!.price} com
                <PaymentButton
                  amountValue={selectedItem!.price.toLocaleString()}
                />
              </span>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
