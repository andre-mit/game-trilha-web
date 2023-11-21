"use client";
import { GiTakeMyMoney } from "react-icons/gi";
import React, { useState } from "react";
import Modal from "@/app/components/modal";
import PaymentButtons from "./paymentButtons";

export type MoneyType = {
  name: string;
  coinAmmount: string;
  price: number;
};

const Item: React.FC<MoneyType> = (item) => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closePopup = () => {
    setShowModal(false);
  };

  return (
    <div className="money h-[160px] w-[175px] fill-current bg-purple-800 rounded-3xl flex flex-col items-center">
      <button
        className="flex flex-col items-center justify-center gap-1"
        onClick={handleButtonClick}
      >
        <span className="text-white font-bold text-lg ">{item.name}</span>
        <GiTakeMyMoney className="w-20 h-20 fill-green-500 dark:fill-white drop-shadow-xl shadow-slate-800 dark:drop-shadow-md dark:shadow-white" />
        <button
          className="text-white drop-shadow-xl shadow-white font-semibold text-md bg-green-500 rounded-full px-3 py-1 min-w-half"
          onClick={handleButtonClick}
        >
          {`R$ ${item.price}`}
        </button>
      </button>

      <Modal isOpen={showModal}>
        <Modal.Header showCloseButton = {true} handleClose={closePopup}></Modal.Header>
          <div className="h-[95px] w-[175px] fill-current flex flex-col items-center">
            <PaymentButtons productName={item.name} coins={item.coinAmmount} amountValue={item.price.toString()} />
          </div>
      </Modal>
    </div>
  );
};

export default Item;