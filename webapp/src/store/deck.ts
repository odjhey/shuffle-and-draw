import { types, Instance, onSnapshot } from "mobx-state-tree";
import { UndoManager } from "mst-middlewares";
import { draw, makeShuffler } from "../deck/deck";
import * as Mundo from "./mundo";
import * as SoulSucker from "./soul-sucker";
import * as Chef from "./chef";
import cuid from "cuid";

const CardModel = types.model("Card", {
  id: types.identifier,
  value: types.string,
});

const DeckModel = types
  .model("Deck", {
    cards: types.array(CardModel),
    history: types.optional(UndoManager, {}),

    drawPile: types.array(types.reference(CardModel)),
    hand: types.array(types.reference(CardModel)),
    board: types.array(types.reference(CardModel)),
    graveyard: types.array(types.reference(CardModel)),
  })
  .actions((self) => {
    // you could create your undoManger anywhere but before your first needed action within the undoManager
    setUndoManager(self);
    const shuffler = makeShuffler("asdfkj");

    return {
      reset() {
        self.drawPile = [] as any;
        self.hand = [] as any;
        self.board = [] as any;
        self.graveyard = [] as any;
        self.cards = [] as any;
      },
      setCards(set: string) {
        if (set === "MUNDO") {
          self.cards = Mundo.cards.map((c) => ({
            id: cuid(),
            value: c,
          })) as any;
        }
        if (set === "SOUL_SUCKER") {
          self.cards = SoulSucker.cards.map((c) => ({
            id: cuid(),
            value: c,
          })) as any;
        }
        if (set === "CHEF") {
          self.cards = Chef.cards.map((c) => ({
            id: cuid(),
            value: c,
          })) as any;
        }

        if (self.drawPile.length < 1) {
          self.drawPile = self.cards.map((c) => c.id) as any;
        }
      },
      afterCreate() {},
      draw() {
        const c = draw(self.drawPile);
        if (c.ok) {
          self.hand.push((c.value[1] as any).id);
          self.drawPile = c.value[0].map((c) => c.id) as any;
        }
      },
      shuffle() {
        const newCards = shuffler(self.drawPile);
        self.drawPile = newCards.map((n) => n.id) as any;
      },

      play(cardId: string) {
        const idx = self.hand.findIndex((v) => v.id === cardId);

        self.hand.splice(idx, 1);
        self.board.push(cardId);
      },
      discard(cardId: string) {
        const handIdx = self.hand.findIndex((v) => v.id === cardId);
        if (handIdx >= 0) {
          self.hand.splice(handIdx, 1);
        }

        const boardIdx = self.board.findIndex((v) => v.id === cardId);
        console.log("bidx", boardIdx);
        if (boardIdx >= 0) {
          self.board.splice(boardIdx, 1);
        }

        self.graveyard.push(cardId);
      },
    };
  });

export let undoManager: Instance<typeof UndoManager> = {} as any;
export const setUndoManager = (targetStore: any) => {
  undoManager = targetStore.history;
};

export let store: RootStore;

if (localStorage.getItem("asdf")) {
  const storedValue = localStorage.getItem("asdf") as string;
  store = DeckModel.create(JSON.parse(storedValue));
} else {
  store = DeckModel.create({
    cards: Mundo.cards.map((c) => ({ id: cuid(), value: c })),
    board: [],
    hand: [],
    graveyard: [],
  });
}

/* @ts-ignore */
window.store = store;
/* @ts-ignore */
window.undoManager = undoManager;

export interface RootStore extends Instance<typeof DeckModel> {}

onSnapshot(store, (snapshot) => {
  console.log({ snapshot });
  localStorage.setItem("asdf", JSON.stringify(snapshot));
});
