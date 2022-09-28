import { Pin, X } from "tabler-icons-react";

export const CardInPlay = ({
  description,
  discard,
  pinInBoard,
  pinned,
}: {
  description: string;
  discard: any;
  pinInBoard: any;
  pinned: boolean;
}) => {
  return (
    <div className="w-40 h-52 border border-black bg-gray-800 flex flex-col items-center justify-between text-center">
      <div>
        {pinned && <Pin></Pin>}
        <p className="text-2xl break-words overflow-hidden">{description}</p>
      </div>

      <div className="flex items-center justify-center">
        <button onClick={discard}>
          <X></X>
        </button>
        <button onClick={pinInBoard}>p</button>
      </div>
    </div>
  );
};

export default CardInPlay;
