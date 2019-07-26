import {
    DashboardComponent,
    DashboardStateProps,
    DashboardDispatchProps
} from "./DashboardComponent";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { setDayActivityAction, AppState, setDayAction } from "../App/reducer";
import { State } from '../reducer';
import { getResultForDay, getTotal, getChain, getDate, getDateFormatted } from "../App/selectors";


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
        setDayBad: (day: DateTime) => dispatch(setDayActivityAction(day, "bad")),
        setDayGood: (day: DateTime) => dispatch(setDayActivityAction(day, "good")),
        changeDay: (day: DateTime) => dispatch(setDayAction(day))
    };
}

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);