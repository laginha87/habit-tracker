import {
    DashboardComponent,
    DashboardStateProps,
    DashboardDispatchProps
} from "./DashboardComponent";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { setDayActivityAction, AppState } from "../App/reducer";
import { State } from '../reducer';
import { getResultForDay } from "../App/selectors";


const mapStateToProps = (state: State): DashboardStateProps => {
    const date = DateTime.local();
    return {
        day: {
            date,
            result: getResultForDay(state, date),
            dateFormatted: date.toLocaleString(DateTime.DATE_HUGE)
        },
        wallet: {
            euros: 1,
            minutes: 10,
            total: 10
        }
    };
}

const mapDispatchToProps = (dispatch): DashboardDispatchProps => {
    const today = DateTime.local();
    return {
        setDayBad: () => dispatch(setDayActivityAction(today, "bad")),
        setDayGood: () => dispatch(setDayActivityAction(today, "good")),
    };
}

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);