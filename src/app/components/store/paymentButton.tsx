"use client";
import { useState } from "react";
import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import type {
  CreateOrderData,
  CreateOrderActions,
  OrderResponseBody,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";

interface PaymentButtonProps {
  amountValue: string;
  buttonText: string;
  buttonClassName: string;
}

const PaymentButton = ({amountValue, buttonText, buttonClassName}: PaymentButtonProps) => {
  const [cancelled, setCancelled] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState("");

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const orderID = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amountValue,
          },
        },
      ],
    });
    return orderID;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    setLoading("Processando Pagamento");
  
    actions.order!.get().then((orderDetails: OrderResponseBody) => {
      actions.order!.capture().then(async (captureData: any) => {
        setOrderDetails(captureData);
        setLoading("");
  
        try {
          const response = await fetch("./RegisterPurchase", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderDetails,
            }),
              })
          } catch (error) {
            console.error("Erro ao enviar dados da transação:", error);
          }
        
        console.log("Dados da transação enviados com sucesso para o banco de dados.");
        
      });
    });
  };

  

  return (
    <>
      {orderDetails && (
        <pre className="absolute top-0 right-0 w-1/3 h-64 text-xs bg-gray-200 border-2 border-gray-500 overflow-scroll">
          {JSON.stringify(orderDetails, null, 2)}
        </pre>
      )}

      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          currency: "BRL",
          buyerCountry: "BR",
        }}
      >
        <PayPalButtons
          fundingSource={FUNDING.CREDIT}
          createOrder={createOrder}
          onApprove={onApprove}
        />
        <div className={buttonClassName}>{buttonText}</div>
      </PayPalScriptProvider>
    </>
  );
};

export default PaymentButton;
