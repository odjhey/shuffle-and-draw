import { observer } from "mobx-react";
import { store } from "../../store/store";
import { RootStoreProvider } from "../../store/utils";

const CardInPlayProj = ({
  description,
  longDescription,
}: {
  description: string;
  longDescription: string;
}) => {
  return (
    <div className="flex w-36 h-40 border border-black bg-gray-200 flex-col items-center justify-center text-center">
      <p className="text-2xl break-words font-black overflow-hidden text-blue-900">
        {description}
      </p>
      <p className="text-sm break-words overflow-hidden text-blue-900">
        {longDescription}
      </p>
    </div>
  );
};

export const ProjectorPage = observer(() => {
  return (
    <RootStoreProvider value={store}>
      <div className="container h-screen w-screen mx-auto border border-yellow-400">
        <h1>Board</h1>
        {store.projector.players.map((p, idx) => {
          return (
            <div key={idx}>
              <h2>{p.playerId}</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {p.board.cards.map((c, idx) => {
                  return (
                    <CardInPlayProj
                      key={idx}
                      description={c.value}
                      longDescription={c.longDescription}
                    ></CardInPlayProj>
                  );
                })}
              </div>
            </div>
          );
        })}
        <button className="btn" onClick={() => store.projector.clearBoard()}>
          Clear Board
        </button>
        <button className="btn" onClick={() => store.projector.clearMessages()}>
          Clear Logs
        </button>
        <div className="fixed border w-3/6 border-purple-500 bottom-0 overflow-auto h-1/6">
          <h2>messages</h2>
          {store.projector.vEventMessages().map((m, idx) => (
            <p key={idx}>{m}</p>
          ))}
        </div>
      </div>
    </RootStoreProvider>
  );
});
