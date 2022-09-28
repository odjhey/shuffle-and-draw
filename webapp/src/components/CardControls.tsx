import { PlayCard, PlayerPlay } from "tabler-icons-react";
import { useStores } from "../store/utils";

export const CardControls = ({
  cardId,
  showObliterate = false,
}: {
  cardId: string;
  showObliterate?: boolean;
}) => {
  const store = useStores();

  return (
    <div className="flex gap-1">
      <button onClick={() => store.play(cardId)}>
        <PlayerPlay></PlayerPlay>
      </button>
      <button onClick={() => store.addToHand(cardId)}>{"h"}</button>
      <button onClick={() => store.discard(cardId)}>{"g"}</button>
      {showObliterate && (
        <button onClick={() => store.removeCustom(cardId)}>{"d"}</button>
      )}
    </div>
  );
};

export default CardControls;
