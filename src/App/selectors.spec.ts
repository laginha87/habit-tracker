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
        [goodTimes(1), 1],
        [goodTimes(2), 4],
        [goodTimes(3), 5],
        [goodTimes(4), 6],
        [goodTimes(5), 10],
        [goodTimes(6), 15],
        [goodTimes(7), 20],
        [goodTimes(8), 25],
        [goodTimes(9), 34],
        [goodTimes(10), 39],
        [goodTimes(11), 44],
        [goodTimes(12), 49],
        [goodTimes(13), 54],
        [goodTimes(14), 64],
        [goodTimes(15), 74],
        [goodTimes(16), 84],
        [goodTimes(17), 94],
        [goodTimes(18), 104],
        [goodTimes(19), 114],
        [goodTimes(20), 130],
        [goodTimes(21), 140],
        [goodTimes(22), 150],
        [goodTimes(23), 160],
        [goodTimes(24), 170],
        [goodTimes(25), 180],
        [goodTimes(26), 190],
        [goodTimes(27), 207],
        [goodTimes(28), 217],
        [goodTimes(29), 227],
        [goodTimes(30), 237],
        [goodTimes(31), 247],
        [goodTimes(32), 257],
        [goodTimes(33), 267],
        [goodTimes(34), 277],
        [goodTimes(35), 295],
        [goodTimes(36), 305],
        [goodTimes(37), 315],
        [goodTimes(38), 325],
        [goodTimes(39), 335],
        [goodTimes(40), 345],
        [goodTimes(41), 355],
        [goodTimes(42), 365],
        [goodTimes(43), 375],
        [goodTimes(44), 394],
        [goodTimes(45), 404],
        [goodTimes(46), 414],
        [goodTimes(47), 424],
        [goodTimes(48), 434],
        [goodTimes(49), 444],
        [goodTimes(50), 454],
        [goodTimes(51), 464],
        [goodTimes(52), 474],

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