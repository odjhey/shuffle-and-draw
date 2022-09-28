import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store/utils";
import CardHand from "./CardHand";

export const Hand = observer(() => {
  const store = useStores();

  const [viz, setViz] = useState(true);

  return (
    <div>
      <h4>hand</h4>
      <div className="flex gap-4 flex-wrap">
        {store.hand.cards.map((c) => {
          return (
            <CardHand
              key={c.id}
              description={c.value}
              cardId={c.id}
              show={viz}
            ></CardHand>
          );
        })}
      </div>
      <button className="btn btn-sm" onClick={() => setViz((prev) => !prev)}>
        {viz ? "hide" : "show"}
      </button>
    </div>
  );
});

export default Hand;
