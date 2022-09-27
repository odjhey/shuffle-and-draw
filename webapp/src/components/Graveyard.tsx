import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store/utils";

export const Graveyard = observer(() => {
  const store = useStores();

  const [viz, setViz] = useState(false);

  return (
    <div className="graveyard">
      <h3>Graveyard ({store.graveyard.length})</h3>

      {viz &&
        store.graveyard.map((c) => {
          return c.value;
        })}
      <button onClick={() => setViz((prev) => !prev)}>
        {viz ? "hide" : "show"}
      </button>
    </div>
  );
});

export default Graveyard;
