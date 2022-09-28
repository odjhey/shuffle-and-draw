import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store/utils";
import HoriCard from "./HoriCard";

export const DrawPile = observer(() => {
  const store = useStores();

  const [viz, setViz] = useState(false);

  return (
    <div>
      <h3>Drawpile ({store.drawPile.cards.length})</h3>

      {viz &&
        store.drawPile.cards.map((c) => {
          return (
            <HoriCard key={c.id} description={c.value} cardId={c.id}></HoriCard>
          );
        })}
      <button className="btn btn-sm" onClick={() => setViz((prev) => !prev)}>
        {viz ? "hide" : "show"}
      </button>
    </div>
  );
});

export default DrawPile;
