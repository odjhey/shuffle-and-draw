export const CardInPlay = ({
  description,
  discard,
}: {
  description: string;
  discard: any;
}) => {
  return (
    <div
      style={{
        border: "solid 1px orange",
        height: "150px",
        width: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {description}

      <button onClick={discard}>{"x"}</button>
    </div>
  );
};

export default CardInPlay;
