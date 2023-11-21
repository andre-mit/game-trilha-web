"use client";
import { GiTakeMyMoney } from "react-icons/gi";
import React, { useState } from "react";
import Modal from "@/app/components/modal";
import PaymentButtons from "./paymentButtons";

export type MoneyType = {
  id: number;
  name: string;
  coinAmmount: string;
  price: number;
}; 

export type ItemProps = MoneyType & {
  selected?: boolean;
  onSelect: (id: number) => void;
};

const Item: React.FC<ItemProps> = ({ id, name, coinAmmount, price, selected, onSelect }) => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closePopup = () => {
    setShowModal(false);
  };

  return (
    <div className="money h-[160px] w-[175px] fill-current bg-purple-800 rounded-3xl flex flex-col items-center">
      <button onClick={() => { onSelect(id); handleButtonClick(); }} className={`flex flex-col items-center justify-center gap-1 bg-purple-800 rounded-3xl h-[160px] w-[175px] ${selected && "border-4 border-green-500"}`}>
      <span className="text-white font-bold text-lg ">{name}</span>
      <GiTakeMyMoney className="w-20 h-20 fill-green-500 dark:fill-white drop-shadow-xl shadow-slate-800 dark:drop-shadow-md dark:shadow-white" />
      <span className="text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-green-500 dark:bg-green-400 rounded-full px-3 py-1 min-w-half">
        R$ {price}
      </span>
    </button>

      <Modal isOpen={showModal}>
        <Modal.Header showCloseButton = {true} handleClose={closePopup}></Modal.Header>
          <div className="h-[95px] w-[175px] fill-current flex flex-col items-center">
            <PaymentButtons productName={name} coins={coinAmmount} amountValue={price.toString()} />
          </div>
      </Modal>
    </div>
  );
};

export default Item;