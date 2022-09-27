import { useEffect, useState } from "react";
import { PlayerPlay, Eye } from "tabler-icons-react";

export const CardHand = ({
  description,
  play,
  show = true,
}: {
  description: string;
  play: any;
  show: boolean;
}) => {
  const [peek, setPeek] = useState(show);

  useEffect(() => {
    setPeek(show);
  }, [show]);

  return (
    <div
      style={{
        border: "solid 1px pink",
        height: "150px",
        width: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {show || peek ? (
        <>
          {description}
          <button onClick={play}>
            <PlayerPlay></PlayerPlay>
          </button>
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
