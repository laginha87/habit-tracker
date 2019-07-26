import { State } from "../reducer";
import { DayResult, DayData } from "../model/types";
import { DateTime } from "luxon";
import { createSelector } from "reselect";
import { List } from "immutable";

export const getDays = (state: State) => state.app.days;
export const getDate = (state: State) => state.app.day;

export const getResultForDay = createSelector(getDays, getDate, (days: List<DayData>, date: DateTime): DayResult => {
    const entry = days.find((e) => e.date.hasSame(date, 'day'));
    return entry ? entry.result : null;
});

const calculateTotal = createSelector(getDays, (res: List<DayData>) => {
    return res.sortBy(({ date }: DayData) => date).reduce(({ previous, chain, total }, el, key) => {
        if (previous === null) {
            return { previous: el, chain: el.result === 'good' ? 1 : 0, total: el.result === 'good' ? chainToValue(1) : 0 }
        }

        if (el.result === "bad") {
            return { previous: el, chain: 0, total };
        }
        const good = (el.date.startOf('day').diff(previous.date.startOf('day'), 'days').days) && el.result == "good";
        chain++;

        return {
            previous: el,
            chain: good ? chain : 0,
            total: total + (good ? chainToValue(chain) : 0)
        }
    }, { total: 0, chain: 0, previous: null });
})

export const getTotal = createSelector(calculateTotal, (totals) => {
    return totals.total;
})

export const getChain = createSelector(calculateTotal, (totals) => {
    return totals.chain;
})

export const chainToValue = (value: number): number => {
    if (value > 10) {
        return 10
    } else if (value > 5) {
        return 5
    } else {
        return 1
    }

}

export const getDateFormatted = createSelector(getDate, (date: DateTime): string => {
    if (date.hasSame(DateTime.local(), 'day')) {
        return 'Today';
    }

    if (date.startOf('day').diff(DateTime.local().startOf('day'), 'day').days === -1) {
        return 'Yesterday';
    }

    return date.toLocaleString(DateTime.DATE_HUGE);
})