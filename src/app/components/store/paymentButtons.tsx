"use client";
import React, { useState } from "react";
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
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/components/ui/use-toast";

interface PaymentButtonProps {
  productName: string;
  coins: string;
  amountValue: string;
}

const PaymentButtons = ({
  productName,
  coins,
  amountValue,
}: PaymentButtonProps) => {
  const [cancelled, setCancelled] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState("");
  const {toast} = useToast();
  const user = useUser();

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const orderID = await actions.order.create({
      purchase_units: [
        {
          description: coins,
          amount: {
            value: amountValue,
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
    return orderID;
  };

  async function onApprove(data: OnApproveData, actions: OnApproveActions) {
    setLoading("Processando Pagamento");

    actions.order!.get().then((orderDetails: OrderResponseBody) => {
      actions.order!.capture().then(async (captureData: any) => {
        setOrderDetails(captureData);
        setLoading("");
        const email = user.email;

        try {
          const response = await fetch(
            `${process.env
              .NEXT_PUBLIC_API_URL!}/api/Transaction/RegisterPurchase`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Mail: email,
                Price: orderDetails.purchase_units[0].amount.value,
                Coins: orderDetails.purchase_units[0].description,
              }),
            }
          );
        } catch (error) {
          console.error("Erro ao enviar dados da transação:", error);
          toast({title: "Erro ao enviar dados da transação", variant: "error"});
        }
        console.log(
          "Dados da transação enviados com sucesso para o banco de dados."
        );

        console.log(
          "Dados enviados:",
          email,
          orderDetails.purchase_units[0].amount.value,
          orderDetails.purchase_units[0].description
        );

        toast({title: "Compra realizada com sucesso!", variant: "success"});
        user.increaseBalance(parseInt(coins));
      });
    });
  }

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          currency: "BRL",
          buyerCountry: "BR",
        }}
      >
        <PayPalButtons
          fundingSource={FUNDING.PAYPAL}
          createOrder={createOrder}
          onApprove={onApprove}
        />

        <PayPalButtons
          fundingSource={FUNDING.CARD}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PaymentButtons;
