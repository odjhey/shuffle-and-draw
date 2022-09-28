import { destroy, getSnapshot, types } from "mobx-state-tree";

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
    return {
      afterCreate() {
        self.players = [
          {
            playerId: "asldfkjaskdfj",
            board: {
              cards: [
                { value: "card1123" },
                { value: "card1123" },
                { value: "card1123" },
                { value: "card1123" },
              ] as any,
            },
          },
        ] as any;
      },

      updatePlayer({
        playerId,
        newPlayer,
      }: {
        playerId: string;
        newPlayer: any;
      }) {
        const match = self.players.find((p) => (p.playerId = playerId));
        if (match) {
          destroy(match);
        }

        if (newPlayer) {
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
