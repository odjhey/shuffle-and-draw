import { types, Instance } from "mobx-state-tree";
import { UndoManager } from "mst-middlewares";
import { draw, makeShuffler } from "../deck/deck";
import * as Mundo from "./mundo";

const CardModel = types.model("Card", {
  value: types.string,
});

const DeckModel = types
  .model("Deck", {
    cards: types.array(CardModel),
    history: types.optional(UndoManager, {}),
    hand: types.array(CardModel),
    board: types.array(CardModel),
    graveyard: types.array(CardModel),
  })
  .actions((self) => {
    // you could create your undoManger anywhere but before your first needed action within the undoManager
    setUndoManager(self);
    const shuffler = makeShuffler("asdfkj");

    return {
      draw() {
        const c = draw(self.cards);
        if (c.ok) {
          self.hand.push({ ...(c.value[1] as any) });
          self.cards = c.value[0];
          return c.value[1];
        }
      },
      play(handIdx: number) {
        const cardCopy = { ...self.hand[handIdx] };
        self.hand.splice(handIdx, 1);
        self.board.push({ ...cardCopy });
      },
      discard(boardIdx: number) {
        const cardCopy = { ...self.board[boardIdx] };
        self.board.splice(boardIdx, 1);
        self.graveyard.push({ ...cardCopy });
      },
      shuffle() {
        const newCards = shuffler(self.cards);
        self.cards = newCards;
      },
    };
  });

export let undoManager: Instance<typeof UndoManager> = {} as any;
export const setUndoManager = (targetStore: any) => {
  undoManager = targetStore.history;
};

export const store = DeckModel.create({
  cards: Mundo.cards.map((c) => ({ value: c })),
  board: [],
  hand: [],
  graveyard: [],
});

/* @ts-ignore */
window.store = store;
/* @ts-ignore */
window.undoManager = undoManager;

export interface RootStore extends Instance<typeof DeckModel> {}
