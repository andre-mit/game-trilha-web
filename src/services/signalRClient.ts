import { HubConnectionBuilder } from "@microsoft/signalr";

const createHubConnection = (hubUrl: string, token: string) => {
  return new HubConnectionBuilder()
    .withUrl(hubUrl, { accessTokenFactory: () => token })
    .withAutomaticReconnect()
    .build();
};

export default createHubConnection;
