import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store/utils";
import CardHand from "./CardHand";

export const Hand = observer(() => {
  const store = useStores();

  const [viz, setViz] = useState(true);

  return (
    <div className="hand">
      <h4>hand</h4>
      <div style={{ display: "flex" }}>
        {viz &&
          store.hand.map((c) => {
            return (
              <CardHand
                key={c.id}
                description={c.value}
                play={() => {
                  store.play(c.id);
                }}
              ></CardHand>
            );
          })}
      </div>
      <button onClick={() => setViz((prev) => !prev)}>
        {viz ? "hide" : "show"}
      </button>
    </div>
  );
});

export default Hand;
