import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store/utils";

export const DrawPile = observer(() => {
  const store = useStores();

  const [viz, setViz] = useState(false);

  return (
    <div className="deck">
      <h3>Drawpile ({store.drawPile.length})</h3>

      {viz &&
        store.drawPile.map((c) => {
          return c.value;
        })}
      <button onClick={() => setViz((prev) => !prev)}>
        {viz ? "hide" : "show"}
      </button>
    </div>
  );
});

export default DrawPile;
