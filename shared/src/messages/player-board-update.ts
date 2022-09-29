export type TMessage<T, P> = {
  toSubs: string; // TODO remove this
  type: T;
  player: TPayload; //TODO rename to payload
};

export type TPayload = {
  playerId: string;
  board: {
    cards: {
      value: string; // TODO: change to name
      longDescription: string;
    }[];
  };
};

type TPlayerBoardUpdateMessage = TMessage<"PLAYER_BOARD_UPDATE", TPayload>;
export const makeMessage = (payload: TPayload): TPlayerBoardUpdateMessage => {
  return {
    toSubs: "asdf",
    type: "PLAYER_BOARD_UPDATE",
    player: payload, //TODO rename to payload
  };
};

export const serialize = (message: TPlayerBoardUpdateMessage): string => {
  return JSON.stringify(message);
};
