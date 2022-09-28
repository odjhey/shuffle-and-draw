import { useStores } from "./store/utils";
import { observer } from "mobx-react";
import { undoManager } from "./store/store";
import DrawPile from "./components/DrawPile";
import Graveyard from "./components/Graveyard";
import Hand from "./components/Hand";
import Board from "./components/Board";
import Customs from "./components/Customs";

export const MainPage = observer(() => {
  const store = useStores();
  return (
    <div className="container mx-auto h-screen flex flex-col justify-between">
      <div>
        <div className="">
          <Board></Board>
        </div>

        <div className="flex gap-10">
          <DrawPile></DrawPile>
          <Graveyard></Graveyard>
          <Customs></Customs>
        </div>
      </div>

      <div>
        <div className="flex gap-10">
          <Hand></Hand>
        </div>
        <div className="w-full pb-24">
          <div className="flex justify-between">
            <div>
              <button
                className="btn btn-sm"
                onClick={() => {
                  store.shuffle();
                }}
              >
                shuffle
              </button>
              <button
                className="btn btn-lg btn-primary"
                onClick={() => {
                  store.draw();
                }}
              >
                draw
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  undoManager.canUndo && undoManager.undo();
                }}
              >
                undo
              </button>
            </div>
            <div>
              <button
                className="btn btn-sm btn-error"
                onClick={() => {
                  store.reset();
                }}
              >
                reset
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  store.setCards("MUNDO");
                }}
              >
                mundo
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  store.setCards("SOUL_SUCKER");
                }}
              >
                soul sucker
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  store.setCards("CHEF");
                }}
              >
                chef
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  store.setCards("EMOKID");
                }}
              >
                emo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MainPage;
