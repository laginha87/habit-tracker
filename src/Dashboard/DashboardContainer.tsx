import {
    DashboardComponent,
    DashboardStateProps,
    DashboardDispatchProps
} from "./DashboardComponent";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { setDayActivityAction, AppState, setDayAction, removeDayActivity } from "../App/reducer";
import { State } from '../reducer';
import { getResultForDay, getTotal, getChain, getDate, getDateFormatted } from "../App/selectors";
import { DayResult } from "../model/types";


const mapStateToProps = (state: State): DashboardStateProps => {
    return {
        day: {
            date: getDate(state),
            dateFormatted: getDateFormatted(state),
            result: getResultForDay(state)
        },
        chain: getChain(state),
        wallet: {
            euros: `${(getTotal(state) * 0.1).toFixed(2)} €`,
            minutes: `${getTotal(state)} min`,
            total: getTotal(state)
        }
    };
}

const mapDispatchToProps = (dispatch): DashboardDispatchProps => {

    return {
        setDayBad: (day: DateTime, currentStatus : DayResult) => {
            if(currentStatus == 'bad') {
                dispatch(removeDayActivity(day))
            } else {
                dispatch(setDayActivityAction(day, "bad"))
            }
        },
        setDayGood: (day: DateTime, currentStatus : DayResult) => {
            if(currentStatus == 'good') {
                dispatch(removeDayActivity(day))
            } else {
                dispatch(setDayActivityAction(day, "good"))
            }
        },
        changeDay: (day: DateTime) => dispatch(setDayAction(day))
    };
}

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);