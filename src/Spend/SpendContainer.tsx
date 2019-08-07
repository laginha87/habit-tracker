import {
    SpendComponent,
    SpendStateProps,
    SpendDispatchProps
} from "./SpendComponent";
import { connect } from "react-redux";
import { State } from '../reducer';
import { getWalletExtended } from "../App/selectors";
import { spendCreditsAction } from "../App";
import { routerActions } from "connected-react-router";


const mapStateToProps = (state: State): SpendStateProps => {
    return {
        wallet: getWalletExtended(state)
    };
}

const mapDispatchToProps = (dispatch): SpendDispatchProps => {

    return {
        submitSpend: ( number : number) => {
            dispatch(spendCreditsAction(number))
            dispatch(routerActions.push('/'))
        }
    };
}

export const SpendContainer = connect(mapStateToProps, mapDispatchToProps)(SpendComponent);