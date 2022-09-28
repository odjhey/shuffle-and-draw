import { observer } from "mobx-react";
import { useStores } from "../store/utils";
import CardInPlay from "./CardInPlay";

export const Board = observer(() => {
  const store = useStores();

  return (
    <div className="bg-primary p-1">
      <h4>Board</h4>
      <div className="flex gap-4">
        {store.board.cards.map((c) => {
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
