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

type SignalRContextType = {
  connection: HubConnection;
  isConnected: boolean;
  connectionId: string | null;
};

export const SignalRContext = createContext<SignalRContextType | null>(null);

export const SignalRProvider = ({
  children,
  connectionUrl,
}: {
  children: ReactNode;
  connectionUrl: string;
}) => {
  const [connection, setConnection] = useState(
    createHubConnection(connectionUrl)
  );
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected) {
      connection.start().then(() => {
        setIsConnected(true);
        setConnectionId(connection.connectionId);
      });
    }
    return () => {
      connection.stop();
    };
  }, [connection]);

  return (
    <SignalRContext.Provider
      value={{ connection: connection, isConnected, connectionId }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
