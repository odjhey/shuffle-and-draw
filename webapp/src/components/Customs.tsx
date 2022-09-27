import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store/utils";
import CustomCard from "./CustomCard";
import cuid from "cuid";

export const Customs = observer(() => {
  const store = useStores();

  const [viz, setViz] = useState(true);
  const [customDesc, setCustomDesc] = useState("");

  return (
    <div className="hand">
      <h4>Customs</h4>
      <div style={{ display: "flex" }}>
        {viz &&
          store.customs.map((c) => {
            return (
              <CustomCard
                key={c.id}
                description={c.value}
                play={() => {
                  store.play(c.id);
                }}
                addToHand={() => {
                  store.addToHand(c.id);
                }}
                remove={() => {
                  store.removeCustom(c.id);
                }}
              ></CustomCard>
            );
          })}
      </div>

      {viz && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            onClick={() => store.addCustom({ id: cuid(), value: customDesc })}
          >
            add
          </button>
          <input
            type="text"
            value={customDesc}
            onChange={(e) => setCustomDesc(e.target.value)}
          />
        </div>
      )}

      <div style={{ display: "flex" }}>
        <button onClick={() => setViz((prev) => !prev)}>
          {viz ? "hide" : "show"}
        </button>
      </div>
    </div>
  );
});

export default Customs;
