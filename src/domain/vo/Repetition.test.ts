import { describe, expect, test } from "@jest/globals";
import { Repetition } from "./Repetition";

const p = (nDay: number) => ({ type: "period", period: nDay });
const s = (days: number[]) => ({ type: "specific", values: days });

describe("from", () => {
  describe.each<{
    value: string;
    day: Repetition["day"];
    dayOfWeek: Repetition["dayOfWeek"];
    week: Repetition["week"];
    month: Repetition["month"];
  }>`
    value                    | day            | dayOfWeek          | week    | month
    ${"every day"}           | ${p(1)}        | ${null}            | ${p(1)} | ${p(1)}
    ${"weekday"}             | ${p(1)}        | ${[1, 2, 3, 4, 5]} | ${p(1)} | ${p(1)}
    ${"holiday"}             | ${p(1)}        | ${[0, 6]}          | ${p(1)} | ${p(1)}
    ${"sun"}                 | ${p(1)}        | ${[0]}             | ${p(1)} | ${p(1)}
    ${"sun/mon"}             | ${p(1)}        | ${[0, 1]}          | ${p(1)} | ${p(1)}
    ${"tue/wed/thu/fri/sat"} | ${p(1)}        | ${[2, 3, 4, 5, 6]} | ${p(1)} | ${p(1)}
    ${"10d"}                 | ${s([10])}     | ${null}            | ${p(1)} | ${p(1)}
    ${"10d/20d"}             | ${s([10, 20])} | ${null}            | ${p(1)} | ${p(1)}
    ${"every 3 day"}         | ${p(3)}        | ${null}            | ${p(1)} | ${p(1)}
  `("Repetition.from", ({ value, day, dayOfWeek, week, month }) => {
    test(`Repetition.from(${value}) = day=${day}, dayOfWeek=${dayOfWeek}, week=${week}, month=${month}`, () => {
      const actual = Repetition.from(value);
      expect(actual?.day).toStrictEqual(day);
      expect(actual?.dayOfWeek).toStrictEqual(dayOfWeek);
      expect(actual?.week).toStrictEqual(week);
      expect(actual?.month).toStrictEqual(month);
    });
  });
});
