import { useEffect, useState } from "react";
import { PlayerPlay, Eye } from "tabler-icons-react";
import CardControls from "./CardControls";

export const CardHand = ({
  description,
  show = true,
  cardId,
}: {
  description: string;
  cardId: string;
  show: boolean;
}) => {
  const [peek, setPeek] = useState(show);

  useEffect(() => {
    setPeek(show);
  }, [show]);

  return (
    <div className="h-32 w-20 border border-red-600 flex flex-col justify-between ">
      {show || peek ? (
        <>
          <p className="text-ellipsis overflow-hidden ">{description}</p>
          <div className="relative bottom-0">
            <CardControls cardId={cardId} actionList="PDG"></CardControls>
          </div>
        </>
      ) : (
        <>
          ---
          <button onClick={() => setPeek(true)}>
            <Eye></Eye>
          </button>
        </>
      )}
    </div>
  );
};

export default CardHand;
