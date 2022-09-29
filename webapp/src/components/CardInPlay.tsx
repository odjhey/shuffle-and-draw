import { Pin, X } from "tabler-icons-react";

export const CardInPlay = ({
  description,
  info,
  discard,
  pinInBoard,
  pinned,
}: {
  description: string;
  info: string;
  discard: any;
  pinInBoard: any;
  pinned: boolean;
}) => {
  return (
    <div className="w-40 h-52 border border-black bg-white flex flex-col items-center justify-between text-center">
      <div className="flex justify-center items-center h-full flex-col">
        {pinned && <Pin></Pin>}
        <p className="text-xl break-words overflow-hidden text-blue-900">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-center gap-9">
        <button onClick={discard}>
          <X></X>
        </button>
        <button onClick={pinInBoard}>p</button>
      </div>
    </div>
  );
};

export default CardInPlay;
