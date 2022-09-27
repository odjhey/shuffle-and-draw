export const CustomCard = ({
  description,
  play,
  remove,
  addToHand,
}: {
  description: string;
  play: any;
  remove: any;
  addToHand: any;
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
      <button onClick={addToHand}>{"h"}</button>
      <button onClick={remove}>{"x"}</button>
    </div>
  );
};

export default CustomCard;
