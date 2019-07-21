import { State } from "../reducer";
import { DayResult } from "../model/types";
import { DateTime } from "luxon";

export const getResultForDay = ( state : State, date: DateTime) : DayResult => {
    const entry = state.app.days.find((e) => e.date.hasSame(date, 'day'));
    return entry ? entry.result : null;
}
