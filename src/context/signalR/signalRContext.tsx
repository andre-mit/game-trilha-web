"use client";

import createHubConnection from "@/services/signalRClient";
import { HubConnection } from "@microsoft/signalr";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

export const SignalRContext = createContext<HubConnection | null>(null);

export const SignalRProvider = ({
  children,
  connectionUrl,
}: {
  children: ReactNode;
  connectionUrl: string;
}) => {
  const [connection, setConnection] = useState(createHubConnection(connectionUrl));

  useEffect(() => {
    connection.start();

    return () => {
      connection.stop();
    };
  });

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
