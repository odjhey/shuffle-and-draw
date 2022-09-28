import { PlayCard, PlayerPlay } from "tabler-icons-react";
import { useStores } from "../store/utils";

export const CardControls = ({
  cardId,
  actionList = "PHGD",
}: {
  cardId: string;
  actionList?: string;
}) => {
  const store = useStores();

  const has = (action: string) => {
    return actionList.includes(action);
  };

  return (
    <div className="flex gap-1">
      {has("P") && (
        <button onClick={() => store.play(cardId)}>
          <PlayerPlay></PlayerPlay>
        </button>
      )}
      {has("H") && (
        <button onClick={() => store.addToHand(cardId)}>{"h"}</button>
      )}
      {has("G") && <button onClick={() => store.discard(cardId)}>{"g"}</button>}
      {has("D") && <button onClick={() => store.toPile(cardId)}>{"d"}</button>}
      {has("X") && (
        <button onClick={() => store.removeCustom(cardId)}>{"x"}</button>
      )}
    </div>
  );
};

export default CardControls;
