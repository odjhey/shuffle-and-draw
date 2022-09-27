import { useStores } from "./store/utils";
import { observer } from "mobx-react";
import { undoManager } from "./store/deck";
import DrawPile from "./components/DrawPile";
import Graveyard from "./components/Graveyard";
import Hand from "./components/Hand";
import Board from "./components/Board";
import Customs from "./components/Customs";

export const MainPage = observer(() => {
  const store = useStores();
  return (
    <>
      <Board></Board>

      <div
        style={{
          display: "flex",
          border: "1px white solid",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DrawPile></DrawPile>
        <Graveyard></Graveyard>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Hand></Hand>
        <Customs></Customs>
      </div>

      <div>
        <button
          onClick={() => {
            store.shuffle();
          }}
        >
          shuffle
        </button>
        <button
          onClick={() => {
            store.draw();
          }}
        >
          draw
        </button>
        <button
          onClick={() => {
            undoManager.canUndo && undoManager.undo();
          }}
        >
          undo
        </button>
        <button
          onClick={() => {
            store.reset();
          }}
        >
          reset
        </button>
        <button
          onClick={() => {
            store.setCards("MUNDO");
          }}
        >
          mundo
        </button>
        <button
          onClick={() => {
            store.setCards("SOUL_SUCKER");
          }}
        >
          soul sucker
        </button>
        <button
          onClick={() => {
            store.setCards("CHEF");
          }}
        >
          chef
        </button>
      </div>
    </>
  );
});

export default MainPage;
