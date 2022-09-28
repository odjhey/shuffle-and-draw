import { types, Instance, onSnapshot, destroy } from "mobx-state-tree";
import { UndoManager } from "mst-middlewares";
import { draw, makeShuffler } from "../deck-utils/deck-utils";
import * as Mundo from "./mundo";
import * as SoulSucker from "./soul-sucker";
import * as Chef from "./chef";
import * as EmoKid from "./emokid";
import cuid from "cuid";

const CardModel = types.model("Card", {
  id: types.identifier,
  value: types.string,
});

const BucketModel = types
  .model("Bucket", {
    cards: types.array(
      types.reference(CardModel, { onInvalidated: (ev) => ev.removeRef() })
    ),
  })
  .actions((self) => {
    const shuffler = makeShuffler("asdfkj");
    return {
      reset() {
        self.cards = [] as any;
      },
      shuffle() {
        const newCards = shuffler(self.cards);
        self.cards = newCards.map((n) => n.id) as any;
      },
      add(cardId: string) {
        self.cards.push(cardId);
      },
      remove(cardId: string) {
        const idx = self.cards.findIndex((v) => v.id === cardId);
        if (idx >= 0) {
          self.cards.splice(idx, 1);
        }
      },
    };
  });

const DeckModel = types
  .model("Deck", {
    cards: types.array(CardModel),
    customs: types.array(CardModel),
    history: types.optional(UndoManager, {}),

    drawPile: BucketModel,
    hand: BucketModel,
    board: BucketModel,
    playing: BucketModel,
    graveyard: BucketModel,
  })
  .actions((self) => {
    // you could create your undoManger anywhere but before your first needed action within the undoManager
    setUndoManager(self);

    return {
      reset() {
        destroy(self.cards);
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
        if (set === "EMOKID") {
          self.cards = EmoKid.cards.map((c) => ({
            id: cuid(),
            value: c,
          })) as any;
        }

        if (self.drawPile.cards.length < 1) {
          self.drawPile.cards = self.cards.map((c) => c.id) as any;
        }
      },
      afterCreate() {},

      draw() {
        const c = draw(self.drawPile.cards);
        if (c.ok) {
          self.hand.add((c.value[1] as any).id);
          self.drawPile = { cards: c.value[0].map((c) => c.id) } as any;
        }
      },
      shuffle() {
        self.drawPile.shuffle();
      },

      // add to board
      play(cardId: string) {
        self.hand.remove(cardId);
        self.drawPile.remove(cardId);

        const customIdx = self.customs.findIndex((v) => v.id === cardId);
        if (customIdx >= 0) {
          // self.customs.splice(customIdx, 1);
        }

        self.board.add(cardId);
      },

      addCustom(card: { id: string; value: string }) {
        self.customs.push(CardModel.create(card));
      },
      removeCustom(cardId: string) {
        const match = self.customs.find((c) => c.id === cardId);
        if (match) {
          destroy(match);
        }
      },

      addToHand(cardId: string) {
        const customIdx = self.customs.findIndex((v) => v.id === cardId);
        if (customIdx >= 0) {
          self.hand.add(cardId);
        }

        self.drawPile.remove(cardId);
        self.graveyard.remove(cardId);
        self.board.remove(cardId);
        self.playing.remove(cardId);
        // self.hand.remove(cardId);

        self.hand.add(cardId);
      },

      discard(cardId: string) {
        self.drawPile.remove(cardId);
        // self.graveyard.remove(cardId);
        self.board.remove(cardId);
        self.playing.remove(cardId);
        self.hand.remove(cardId);

        self.graveyard.add(cardId);
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
    customs: [],
    board: { cards: [] },
    hand: { cards: [] },
    graveyard: { cards: [] },
    drawPile: { cards: [] },
    playing: { cards: [] },
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
