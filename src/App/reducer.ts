import { Wallet, DayData, DayResult } from "../model/types";
import { DateTime } from "luxon";
import { List } from 'immutable';

export type AppState = {
    days: List<DayData>;
    day: DateTime;
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

const INITIAL_STATE: AppState = {
    days: List.of(),
    day: DateTime.local()
}

export const reducer = (state: AppState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case SET_DAY_ACTIVITY:
            const index = state.days.findIndex((value) => value.date.hasSame(action.day, 'day'));
            const newEntry = { date: action.day, result: action.result };
            return {
                ...state,
                days: state.days.set(index, newEntry)
            };

        default:
            return state;
    }
}
