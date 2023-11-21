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
import Cookie from "js-cookie";

type SignalRContextType = {
  connection: HubConnection;
  connectionId: string | null | undefined;
};

export const SignalRContext = createContext<SignalRContextType | null>(null);

export const SignalRProvider = ({
  children,
  connectionUrl,
}: {
  children: ReactNode;
  connectionUrl: string;
}) => {
  const token = Cookie.get("auth_token");
  const [connection, setConnection] = useState<HubConnection>(
    createHubConnection(connectionUrl, token!)
  );

  useEffect(() => {
    if (
      connection.state !== HubConnectionState.Connected &&
      connection.state !== HubConnectionState.Connecting
    ) {
      connection.start().then(() => {
        console.log("Connected to SignalR");
      });
    }

    return () => {
      connection.stop();
    };
  }, [connection]);

  return (
    <SignalRContext.Provider
      value={{ connection: connection, connectionId: connection?.connectionId }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
