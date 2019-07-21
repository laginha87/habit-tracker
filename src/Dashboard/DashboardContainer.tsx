import { DashboardComponent, DashboardProps } from "./DashboardComponent";
import { connect } from "react-redux";
import { DateTime } from "luxon";



const mapStateToProps = (): DashboardProps => {
    return {
        day: {
            date: DateTime.fromFormat('2019-02-03', 'yyyy-mm-dd'),
            result: "bad",
            dateFormatted: '2019-02-03'
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