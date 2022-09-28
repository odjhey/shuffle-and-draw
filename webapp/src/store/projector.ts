import { destroy, getSnapshot, types } from "mobx-state-tree";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const ProjectedCard = types.model("ProjectedCards", {
  value: types.string,
});

const PlayerBoard = types.model("PlayerBoard", {
  cards: types.array(ProjectedCard),
});

const PlayerModel = types.model("Player", {
  playerId: types.identifier,
  board: PlayerBoard,
});

export const ProjectorModel = types
  .model("Projector", {
    players: types.array(PlayerModel),
  })
  .actions((self) => {
    const client = new W3CWebSocket("ws://192.168.1.46:8000");

    client.onopen = () => {
      console.log("WebSocket Client Connected");
      client.send(
        JSON.stringify({ subs: "I would like to subscribe to Board events" })
      );
    };
    client.onmessage = (message) => {
      console.log(message.data);
      if (typeof message.data === "string") {
        try {
          const d = JSON.parse(message.data);
          if (d.player) {
            console.log(d.player);
            (self as any).updatePlayer({
              playerId: d.player.playerId,
              newPlayer: d.player,
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    return {
      afterCreate() {},

      clearAll() {
        self.players.forEach((p) => destroy(p));
      },

      updatePlayer({
        playerId,
        newPlayer,
      }: {
        playerId: string;
        newPlayer: any;
      }) {
        const match = self.players.find((p) => p.playerId === playerId);
        if (match) {
          destroy(match);
        }
        if (newPlayer) {
          console.log("push", newPlayer);
          self.players.push(newPlayer);
        }
      },
    };
  })
  .views((self) => {
    return {
      vSnap() {
        return getSnapshot(self.players);
      },
    };
  });
