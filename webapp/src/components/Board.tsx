import { observer } from "mobx-react";
import { useStores } from "../store/utils";
import CardInPlay from "./CardInPlay";

export const Board = observer(() => {
  const store = useStores();

  return (
    <div className="board" style={{ height: "40vh" }}>
      <h4>Board</h4>
      <div style={{ display: "flex" }}>
        {store.board.map((c) => {
          return (
            <CardInPlay
              key={c.id}
              description={c.value}
              discard={() => {
                store.discard(c.id);
              }}
            ></CardInPlay>
          );
        })}
      </div>
    </div>
  );
});

export default Board;
