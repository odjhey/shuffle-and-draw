import { observer } from "mobx-react";
import { store } from "../../store/store";
import { RootStoreProvider } from "../../store/utils";

const CardInPlay = ({ description }: { description: string }) => {
  return (
    <div className="flex w-36 h-40 border border-black bg-gray-200 flex-col items-center justify-center text-center">
      <p className="text-2xl break-words font-black overflow-hidden text-blue-900">
        {description}
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
                    <CardInPlay key={idx} description={c.value}></CardInPlay>
                  );
                })}
              </div>
            </div>
          );
        })}
        <button className="btn" onClick={() => store.projector.clearAll()}>
          Clear All
        </button>
      </div>
    </RootStoreProvider>
  );
});
