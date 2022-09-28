import { types } from "mobx-state-tree";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export const SyncerModel = types.model("Syncer", {}).actions((self) => {
  const client = new W3CWebSocket("ws://192.168.1.46:8000");
  client.onopen = () => {
    console.log("WebSocket Client Connected");
  };
  client.onmessage = (message) => {
    console.log(message);
  };

  return {
    sendUpdate(jsonStr: string) {
      try {
        console.log(jsonStr);
        client.send(jsonStr);
      } catch (e) {}
    },
  };
});
