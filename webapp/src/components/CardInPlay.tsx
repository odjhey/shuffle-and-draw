import { X } from "tabler-icons-react";

export const CardInPlay = ({
  description,
  discard,
}: {
  description: string;
  discard: any;
}) => {
  return (
    <div className="w-20 h-32 border border-black bg-gray-800 flex flex-col justify-between">
      <p className="break-words overflow-hidden">{description}</p>

      <button onClick={discard}>
        <X></X>
      </button>
    </div>
  );
};

export default CardInPlay;
