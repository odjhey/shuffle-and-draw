import { Cross, HandStop, PlayCard, PlayerPlay } from "tabler-icons-react";
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
          <PlayerPlay size={35}></PlayerPlay>
        </button>
      )}
      {has("H") && (
        <button onClick={() => store.addToHand(cardId)}>
          <HandStop size={20}></HandStop>
        </button>
      )}
      {has("G") && (
        <button onClick={() => store.discard(cardId)}>
          <Cross size={20}></Cross>
        </button>
      )}
      {has("D") && (
        <button onClick={() => store.toPile(cardId)}>
          <PlayCard size={20}></PlayCard>
        </button>
      )}
      {has("X") && (
        <button onClick={() => store.deleteCustom(cardId)}>{"x"}</button>
      )}
    </div>
  );
};

export default CardControls;
