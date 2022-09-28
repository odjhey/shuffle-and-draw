import CardControls from "./CardControls";

export const DeadCard = ({
  description,
  cardId,
}: {
  description: string;
  cardId: string;
}) => {
  return (
    <div className="border border-yellow-600 flex justify-between gap-2">
      <div>{description}</div>

      <CardControls cardId={cardId} actionList={"PHD"} />
    </div>
  );
};

export default DeadCard;
