import { describe, it } from "vitest";
import { makeShuffler, draw } from "./deck";
import inv from "tiny-invariant";

describe("suite", () => {
  it("serial test", async () => {
    const givenDeck = ["x", "a", "c", "d", "e", "r"];

    const shuffle = makeShuffler("908hlkdsjf9");
    const res = shuffle(givenDeck);
    const res2 = shuffle(givenDeck);

    shuffle(res);

    console.log(givenDeck, res, res2);

    const d1 = draw(res);
    console.log(d1);
    inv(d1.ok, "empty deck");
    const d2 = draw(d1.value[0]);
    console.log(d2);
  });
});
