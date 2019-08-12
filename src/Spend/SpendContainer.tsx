import {
    SpendComponent,
    SpendStateProps,
    SpendDispatchProps
} from "./SpendComponent";
import { connect } from "react-redux";
import { State } from '../reducer';
import { getWalletExtended } from "../App/selectors";
import { spendCreditsAction } from "../App";
import { DateTime } from "luxon";
import { SpendType } from "../model/types";


const mapStateToProps = (state: State): SpendStateProps => {
    return {
        wallet: getWalletExtended(state)
    };
}

const mapDispatchToProps = (dispatch): SpendDispatchProps => {

    return {
        submitSpend: ( value: number, date : DateTime, spendType: SpendType, description: string) => {
            dispatch(spendCreditsAction(value, date , spendType, description))
        }
    };
}

export const SpendContainer = connect(mapStateToProps, mapDispatchToProps)(SpendComponent);