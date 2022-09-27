import { useStores } from "./store/utils";
import { observer } from "mobx-react";
import { undoManager } from "./store/deck";

export const MainPage = observer(() => {
  const store = useStores();
  return (
    <>
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
        <div className="deck">
          <h3>deck</h3>
          {store.cards.map((c) => {
            return c.value;
          })}
        </div>
        <div className="graveyard">
          <h3>graveyard</h3>
          {store.graveyard.map((c) => {
            return c.value;
          })}
        </div>
      </div>
      <div className="board">
        <h4>board</h4>
        {store.board.map((c, idx) => {
          return (
            <div key={idx} style={{ border: "1px blue solid" }}>
              {c.value}
              <button
                onClick={() => {
                  store.discard(idx);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>

      <div className="hand">
        <h4>hand</h4>
        {store.hand.map((c, idx) => {
          return (
            <div key={idx} style={{ border: "1px blue solid" }}>
              {c.value}
              <button
                onClick={() => {
                  store.play(idx);
                }}
              >
                play
              </button>
            </div>
          );
        })}
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
      </div>
    </>
  );
});

export default MainPage;
