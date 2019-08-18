import { State } from "../reducer";
import { DayResult, DayData } from "../model/types";
import { DateTime } from "luxon";
import { createSelector } from "reselect";
import { List } from "immutable";

export const getDays = (state: State) => state.app.days;
export const getDate = (state: State) => state.app.day;
export const getSpent = (state: State) => state.app.spent;

export const getResultForDay = createSelector(getDays, getDate, (days: List<DayData>, date: DateTime): DayResult => {
    const entry = days.find((e) => e.date.hasSame(date, 'day'));
    return entry ? entry.result : null;
});

const calculateTotal = createSelector(getDays, (res: List<DayData>) => {
    return res.sortBy(({ date }: DayData) => date).reduce(({ previous, chain, total, level, levelChain }, el, key) => {
        const good = (previous === null || el.date.startOf('day').diff(previous.date.startOf('day'), 'days').days) && el.result == "good";

        previous = el;
        chain++;
        levelChain++;

        if (!good) {
            chain = levelChain =  0
            level= Math.max(level - 1, 0)
        } else {
            total += level;

            if(levelChain >= level) {
                level++;
                levelChain = 0;
                total += levelToChain(level)
            }
        }

        return {
            previous,
            chain,
            total,
            level,
            levelChain
        }
    }, { total: 0, chain: 0, previous: null, level: 0, levelChain: 0 });
})

export const getTotal = createSelector(calculateTotal, getSpent, (totals, spent) => {
    return totals.total - spent.reduce((a, { value }) => a + value, 0);
})

export const getChain = createSelector(calculateTotal, (totals) => {
    return totals.chain;
})

export const getLevel = createSelector(calculateTotal, (totals) => {
    return totals.level;
})

export const getLevelChain = createSelector(calculateTotal, (totals) => {
    return totals.levelChain;
})

export const getDateFormatted = createSelector(getDate, (date: DateTime): string => {
    if (date.hasSame(DateTime.local(), 'day')) {
        return 'Today';
    }

    if (date.startOf('day').diff(DateTime.local().startOf('day'), 'day').days === -1) {
        return 'Yesterday';
    }

    if (date.hasSame(DateTime.local(), 'week')) {
        return date.toFormat('cccc')
    }

    return date.toFormat('dd/MM/yyyy');
})

export const convertToEuros = (credits: number) => parseFloat((credits * 0.1).toFixed(2))
export const convertToTime = (credits: number) => credits * 10

export const convertFromTime = (minutes: number) => minutes * 0.1
export const convertFromEuros = (euros: number) => euros * 10

export const getWalletExtended = createSelector(getTotal, (total) => ({
    euros: convertToEuros(total),
    minutes: convertToTime(total),
    total
}))


export const levelToChain = (level) => level <3 ? 1 : level < 5 ? 5 : level < 10 ? 10 : 15