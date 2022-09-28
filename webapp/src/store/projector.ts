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

const EventModel = types.model("Event", {
  message: types.string,
});

export const ProjectorModel = types
  .model("Projector", {
    players: types.array(PlayerModel),
    events: types.array(EventModel),
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
          if (d.type === "PLAYER_BOARD_UPDATE") {
            (self as any).updatePlayer({
              playerId: d.player.playerId,
              newPlayer: d.player,
            });
          }
          if (d.type === "EVENT_UPDATE") {
            (self as any).addMessage(`${d.event.actor}: ${d.event.message}`);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    return {
      afterCreate() {},

      clearBoard() {
        self.players.forEach((p) => destroy(p));
      },
      clearMessages() {
        self.events.forEach((p) => destroy(p));
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

      addMessage(message: string) {
        self.events.unshift({ message });
      },
    };
  })
  .views((self) => {
    return {
      vSnap() {
        return getSnapshot(self.players);
      },
      vEventMessages() {
        return self.events.map((e) => e.message);
      },
    };
  });
