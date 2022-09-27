export const CardHand = ({
  description,
  play,
}: {
  description: string;
  play: any;
}) => {
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
      {description}

      <button onClick={play}>{">"}</button>
    </div>
  );
};

export default CardHand;
