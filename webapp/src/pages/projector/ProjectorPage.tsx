import { observer } from "mobx-react";
import { store } from "../../store/store";
import { RootStoreProvider } from "../../store/utils";

export const ProjectorPage = observer(() => {
  return (
    <RootStoreProvider value={store}>
      <h1>Board</h1>
      {store.projector.players.map((p, idx) => {
        return (
          <div key={idx}>
            <h2>{p.playerId}</h2>
            {p.board.cards.map((c, idx) => {
              return <div key={idx}>{c.value}</div>;
            })}
          </div>
        );
      })}

      <button
        className="btn btn-error"
        onClick={() =>
          store.projector.updatePlayer({
            playerId: "asldfkjaskdfj",
            newPlayer: {
              playerId: "asldfkjaskdfj",
              board: {
                cards: [
                  { value: "card1123" },
                  { value: "99" },
                  { value: "casdrd1123" },
                ] as any,
              },
            },
          })
        }
      >
        Destroy
      </button>
    </RootStoreProvider>
  );
});
