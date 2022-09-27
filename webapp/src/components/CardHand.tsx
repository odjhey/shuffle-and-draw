import { useState } from "react";

export const CardHand = ({
  description,
  play,
  show = true,
}: {
  description: string;
  play: any;
  show: boolean;
}) => {
  const [viz, setViz] = useState(show);

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
      {viz ? (
        <>
          {description}
          <button onClick={play}>{">"}</button>
        </>
      ) : (
        "---"
      )}
    </div>
  );
};

export default CardHand;
