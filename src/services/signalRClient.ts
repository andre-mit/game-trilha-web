import { HubConnectionBuilder } from "@microsoft/signalr";

const createHubConnection = (hubUrl: string) => {
  return new HubConnectionBuilder()
    .withUrl(hubUrl)
    .withAutomaticReconnect()
    .build();
};

export default createHubConnection;