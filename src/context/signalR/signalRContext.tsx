"use client";

import createHubConnection from "@/services/signalRClient";
import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

type SignalRContextType = {
  connection: HubConnection;
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
  const [connectionId, setConnectionId] = useState<string | null>(null);

  useEffect(() => {
    if (connection.state !== HubConnectionState.Connected && connection.state !== HubConnectionState.Connecting) {
      connection.start().then(() => {
        setConnectionId(connection.connectionId);
      });
    }
  }, [connection]);

  return (
    <SignalRContext.Provider value={{ connection: connection, connectionId: connection.connectionId }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
