import { observer } from "mobx-react";
import { store } from "../../store/store";
import { RootStoreProvider } from "../../store/utils";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect } from "react";

const client = new W3CWebSocket("ws://192.168.1.46:8000");

export const ProjectorPage = observer(() => {
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      client.send(
        JSON.stringify({ m: "I would like to subscribe to Board events" })
      );
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }, []);

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
      <button
        className="btn btn-info"
        onClick={() => client.send(JSON.stringify(store.projector.vSnap()))}
      >
        Send
      </button>
      <button
        className="btn btn-info"
        onClick={() => client.send(JSON.stringify({ toAll: true }))}
      >
        Nudge All
      </button>
    </RootStoreProvider>
  );
});
