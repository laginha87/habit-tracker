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

const REMOVE_DAY_ACTIVITY = "REMOVE_DAY_ACTIVITY"

type RemoveDayActivity = {
    type: typeof REMOVE_DAY_ACTIVITY;
    day: DateTime;
}

export const removeDayActivity = (day: DateTime): RemoveDayActivity => (
    {
        day,
        type: REMOVE_DAY_ACTIVITY
    }
)

const SET_DAY = "SET_DAY"

type SetDayAction = {
    type: typeof SET_DAY;
    day: DateTime;
}

export const setDayAction = (day: DateTime): SetDayAction => (
    {
        day,
        type: SET_DAY
    }
)

type Action = SetDayActivityAction | SetDayAction | RemoveDayActivity;

const INITIAL_STATE: AppState = {
    days: List.of(),
    day: DateTime.local()
}

export const reducer = (state: AppState = INITIAL_STATE, action: Action) => {
    let index;
    switch (action.type) {
        case SET_DAY_ACTIVITY:
            index = state.days.findIndex((value) => value.date.hasSame(action.day, 'day'));
            const newEntry = { date: action.day, result: action.result };
            let days;
            if (index == -1) {
                days = state.days.push(newEntry);
            } else {
                days = state.days.set(index, newEntry)
            }

            return {
                ...state,
                days
            };

        case REMOVE_DAY_ACTIVITY:
            index = state.days.findIndex((value) => value.date.hasSame(action.day, 'day'));
            return {
                ...state,
                days: state.days.remove(index)
            }

        case SET_DAY:
            return {
                ...state,
                day: action.day
            };
        default:
            return state;
    }
}
