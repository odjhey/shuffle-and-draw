import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store/utils";

export const Graveyard = observer(() => {
  const store = useStores();

  const [viz, setViz] = useState(false);

  return (
    <div>
      <h3>Graveyard ({store.graveyard.cards.length})</h3>

      {viz &&
        store.graveyard.cards.map((c) => {
          return c.value;
        })}
      <button className="btn btn-sm" onClick={() => setViz((prev) => !prev)}>
        {viz ? "hide" : "show"}
      </button>
    </div>
  );
});

export default Graveyard;
