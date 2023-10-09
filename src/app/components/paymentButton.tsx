"use client"
import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js';

const PaymentButton = (productPrice: number) => {
  const [cancelled, setCancelled] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState("");

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency: "BRL",
              value: productPrice
            }
          }
        ]
      })
      .then((orderID: string) => {
        return orderID;
      });
  };

  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    setLoading('Processando Pagamento');

    actions.order.get().then((orderDetails: any) => {

      actions.order.capture().then((data: any) => {
        setOrderDetails(data);
        setLoading("");
      });
    });
  };

  const onCancel = () => {
    setCancelled(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-1/4">
        {orderDetails && (
          <pre className="absolute top-0 right-0 w-1/3 h-64 text-xs bg-gray-200 border-2 border-gray-500 overflow-scroll">
            {JSON.stringify(orderDetails, null, 2)}
          </pre>
        )}

        <PayPalScriptProvider
          options = {{
            "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            "currency": "BRL",
            "buyerCountry": "BR"

          }}>
          <PayPalButtons
            fundingSource = {FUNDING.PAYPAL}
            createOrder = {createOrder}
            onApprove = {onApprove}
            onCancel = {onCancel}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default PaymentButton;