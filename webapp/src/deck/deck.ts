import seedrandom from "seedrandom";

type TResult<T, E> = { ok: true; value: T } | { ok: false; error: E };

export const draw = <T, C extends readonly T[]>(
  deck: C
): TResult<readonly [C, T], unknown> => {
  if (deck.length < 1) {
    return { ok: false, error: "Empty" };
  }

  const [c, ...deckRem] = deck;

  return { ok: true, value: [Object.freeze(deckRem) as any, c] as const };
};

export const makeShuffler = (seed: string) => {
  const generator = seedrandom(seed);
  // return <C extends readonly unknown[]>(deck: C): C => {
  return <C extends readonly unknown[]>(deck: C): C => {
    const deckWithSort = deck.map((c) => ({
      card: c,
      sort: Math.round(generator.quick() * 1000),
    }));

    return Object.freeze(
      deckWithSort.sort((a, b) => a.sort - b.sort).map((ds) => ds.card)
    ) as any;
  };
};
