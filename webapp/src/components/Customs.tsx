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
    <div className="flex flex-col gap-1">
      <h4>Customs</h4>
      <div className="flex flex-col gap-1">
        {viz &&
          store.customs.map((c) => {
            return (
              <CustomCard
                key={c.id}
                description={c.value}
                cardId={c.id}
              ></CustomCard>
            );
          })}
      </div>

      {viz && (
        <div className="flex">
          <input
            type="text"
            value={customDesc}
            onChange={(e) => setCustomDesc(e.target.value)}
          />
          <button
            className="btn btn-xs"
            onClick={() => store.addCustom({ id: cuid(), value: customDesc })}
          >
            add
          </button>
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
