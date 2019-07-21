import { DashboardComponent, DashboardProps } from "./DashboardComponent";
import { connect } from "react-redux";
import { DateTime } from "luxon";



const mapStateToProps = (): DashboardProps => {
    const date = DateTime.fromFormat('2019-02-03', 'yyyy-mm-dd');
    return {
        day: {
            date,
            result: "bad",
            dateFormatted: date.toLocaleString(DateTime.DATE_HUGE)
        },
        wallet: {
            euros: 1,
            minutes: 10,
            total: 10
        }
    };
}

const mapDispatchToProps = () => {
 return {

 };
}
export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);