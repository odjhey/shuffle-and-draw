type TRaw = {
  atk?: string;
  shield?: string;
  draw?: string;
  lightning?: string;
  heart?: string;
};

const buildStringFromRaws = (raws: TRaw) => {
  return (Object.keys(raws) as (keyof typeof raws)[]).reduce((accu, k) => {
    const icon = (text: string) => {
      switch (text) {
        case "lightning":
          return "⚡";
        case "shield":
          return "🛡️";
        case "draw":
          return "🃏️";
        case "heart":
          return "❤️️";
        default:
          return text;
      }
    };

    if (raws[k]) {
      return `${accu} ${raws[k]}${icon(k)}`;
    }
    return accu;
  }, "");
};

const rawCards: { name: string; raws: TRaw; info?: string }[] = [
  { name: "Ohh Yummy Soul, Chump! Chump!", raws: { atk: "3" } },
  { name: "Ohh Yummy Soul, Chump! Chump!", raws: { atk: "3" } },
  { name: "Soul Strike", raws: { atk: "2", lightning: "1" } },
  {
    name: "Soul Strike with Sacrifice",
    raws: { atk: "2", lightning: "1" },
    info: "Sacrifice: can exchange 1HP for an +1Atk",
  },
  { name: "Soul Snack", raws: { atk: "2" } },
  { name: "Soul Snack", raws: { atk: "2" } },
  {
    name: "Soul Snack with Sacrifice",
    raws: { atk: "2" },
    info: "Sacrifice: can exchange 1HP for an +1Atk",
  },
  { name: "A full soul is a lucky soul!", raws: { draw: "1", heart: "1" } },
  {
    name: "hunger",
    raws: { atk: "2", heart: "", lightning: "1", shield: "", draw: "" },
  },
  {
    name: "hunger",
    raws: { atk: "2", heart: "", lightning: "1", shield: "", draw: "" },
  },
  {
    name: "shed some soul!",
    raws: { atk: "", heart: "1", lightning: "1", shield: "", draw: "" },
  },
  {
    name: "shed some soul!",
    raws: { atk: "", heart: "1", lightning: "1", shield: "", draw: "" },
  },
  {
    name: "absorb dem Soullings around!",
    raws: { atk: "", heart: "1", lightning: "", shield: "1", draw: "" },
  },
  {
    name: "Extreme Hunger",
    raws: { atk: "", heart: "", lightning: "2", shield: "", draw: "" },
  },
  {
    name: "Extreme Hunger",
    raws: { atk: "", heart: "", lightning: "2", shield: "", draw: "" },
  },
  {
    name: "Summon Soullings with Sacrifice",
    raws: { atk: "", heart: "", lightning: "", shield: "2", draw: "" },
  },
  {
    name: "Summon Soullings with Sacrifice",
    raws: { atk: "", heart: "", lightning: "", shield: "2", draw: "" },
  },
  {
    name: "Summon Soullings",
    raws: { atk: "1", heart: "", lightning: "", shield: "1", draw: "" },
  },
  {
    name: "Summon Soullings",
    raws: { atk: "1", heart: "", lightning: "", shield: "1", draw: "" },
  },
  {
    name: "A full soul is a lucky soul!",
    raws: { atk: "", heart: "1", lightning: "", shield: "", draw: "1" },
  },
  {
    name: "Even souls gamble",
    raws: { atk: "", heart: "", lightning: "", shield: "", draw: "2" },
  },
  {
    name: "Suck dem Luck!",
    raws: { atk: "1", heart: "", lightning: "", shield: "", draw: "2" },
  },
  {
    name: "Where are my SOULS!",
    raws: { atk: "", heart: "", lightning: "", shield: "", draw: "" },
    info: "SP",
  },
  {
    name: "Where are my SOULS!",
    raws: { atk: "", heart: "", lightning: "", shield: "", draw: "" },
    info: "SP",
  },
  {
    name: "Am i hungry?",
    raws: { atk: "", heart: "", lightning: "", shield: "", draw: "" },
    info: "SP",
  },
  {
    name: "Lifesteal!",
    raws: { atk: "", heart: "", lightning: "", shield: "", draw: "" },
    info: "SP",
  },
  {
    name: "REQUIEM OF SOULS",
    raws: { atk: "", heart: "", lightning: "", shield: "", draw: "" },
    info: "SP",
  },
  {
    name: "Lez Syphon some Souls!",
    raws: { atk: "", heart: "", lightning: "", shield: "", draw: "" },
    info: "SP",
  },
];

export const cards = rawCards.map((c) => {
  return {
    name: c.name,
    description: [buildStringFromRaws(c.raws), c.info]
      .filter((v) => v)
      .join("\n"),
    __meta: {
      deck: "Soul-Sucker",
    },
  };
});
