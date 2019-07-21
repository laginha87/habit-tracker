import { Wallet, DayData, DayResult } from "../model/types";
import { DateTime } from "luxon";

export type AppState = {
    days: Array<DayData>;
    wallet: Wallet;
}

const SET_DAY_ACTIVITY = "SET_DAY_ACTIVITY"

type SetDayActivityAction = {
    type: typeof SET_DAY_ACTIVITY;
    day: DateTime;
    result: DayResult;
}

export const setDayActivityAction = (day: DateTime, result: DayResult): SetDayActivityAction => (
    {
        day, result,
        type: SET_DAY_ACTIVITY
    }
)

type Action = SetDayActivityAction;

const INITIAL_STATE : AppState = {
    days: [],
    wallet: {
        total: 20
    }
}

export const reducer = (state: AppState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case SET_DAY_ACTIVITY:
            const index = state.days.findIndex((value) => value.date.hasSame(action.day, 'day'));
            const newEntry = { date: action.day, result: action.result };
            let days;
            if (index === - 1) {
                days = [...state.days, newEntry]
            } else {
                days = [
                    ...state.days.slice(0, index),
                    newEntry,
                    ...state.days.slice(index + 1, state.days.length)]
            }
            return {
                ...state,
                days
            };

        default:
            return state;
    }
}
