import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store/utils";
import DeadCard from "./DeadCard";

export const Graveyard = observer(() => {
  const store = useStores();

  const [viz, setViz] = useState(false);

  return (
    <div>
      <h3>Graveyard ({store.graveyard.cards.length})</h3>

      {viz &&
        store.graveyard.cards.map((c) => {
          return (
            <DeadCard key={c.id} cardId={c.id} description={c.value}></DeadCard>
          );
        })}
      <button className="btn btn-sm" onClick={() => setViz((prev) => !prev)}>
        {viz ? "hide" : "show"}
      </button>
      <button className="btn btn-sm" onClick={() => store.graveyard.clear()}>
        clear
      </button>
      <button className="btn btn-sm" onClick={() => store.resuAllToPile()}>
        to Pile
      </button>
    </div>
  );
});

export default Graveyard;
