import { getTotal } from "./selectors";
import { List } from "immutable";
import { DateTime, Duration } from "luxon";

let TOTAL = 100

const d = (result: "good" | "bad") => ({ date: DateTime.local().minus(Duration.fromObject({ days: TOTAL-- })), result })
test('getTotal', () => {
    ([
        [List.of(d("good")), 1],
        [List.of(d("bad")), 0],
        [List.of(d("good"), d("good")), 2]
    ] as any).forEach(([days, expected]) => {
        const state = {
            app: {
                days
            }
        }
        expect(getTotal(state as any)).toEqual(expected)
    })

})