import { getTotal, getLevel } from "./selectors";
import { List } from "immutable";
import { DateTime, Duration } from "luxon";
import { AppState } from "./reducer";
import { DayData } from "../model/types";

let TOTAL = 100

const d = (result: "good" | "bad") : DayData => ({ date: DateTime.local().minus(Duration.fromObject({ days: TOTAL-- })), result })

const goodTimes = (n : number) : List<DayData> => List.of(...(new Array(n).fill(0)).map(() => d("good")));

test('getTotal', () => {
    ([
        [List.of(d("good")), 1],
        [List.of(d("bad")), 0],
        [goodTimes(1), 1],
        [goodTimes(2), 4],
        [goodTimes(3), 6],
        [goodTimes(6), 17],
        [goodTimes(10), 36],
        [goodTimes(15), 65]

    ] as Array<[List<DayData>, number]>).forEach(([days, expected]) => {
        const app : AppState = {
            days,
            day: DateTime.local(),
            spent: List()
        }

        expect(getTotal({app})).toEqual(expected)
    })

})



test('getLevel', () => {
    ([
        [List.of(d("good")), 1],
        [List.of(d("bad")), 0],
        [goodTimes(1), 1],
        [goodTimes(2), 2],
        [goodTimes(4), 3],
        [goodTimes(7), 4],
        [goodTimes(11), 5],
        [goodTimes(16), 6]

    ] as Array<[List<DayData>, number]>).forEach(([days, expected]) => {
        const app : AppState = {
            days,
            day: DateTime.local(),
            spent: List()
        }

        expect(getLevel({app})).toEqual(expected)
    })

})