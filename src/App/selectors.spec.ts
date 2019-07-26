import { getTotal } from "./selectors";
import { List } from "immutable";
import { DateTime, Duration } from "luxon";

let TOTAL = 100

const d = (result: "good" | "bad") => ({ date: DateTime.local().minus(Duration.fromObject({ days: TOTAL-- })), result })

const goodTimes = (n : number) => List.of(...(new Array(n).fill(0)).map(() => d("good")));

test('getTotal', () => {
    ([
        [List.of(d("good")), 1],
        [List.of(d("bad")), 0],
        [goodTimes(2), 2],
        [goodTimes(6), 10],
        [goodTimes(10), 30]

    ] as any).forEach(([days, expected]) => {
        const state = {
            app: {
                days
            }
        }

        expect(getTotal(state as any)).toEqual(expected)
    })

})