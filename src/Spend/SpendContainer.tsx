import {
    SpendComponent,
    SpendStateProps,
    SpendDispatchProps
} from "./SpendComponent";
import { connect } from "react-redux";
import { State } from '../reducer';
import { getWalletExtended } from "../App/selectors";


const mapStateToProps = (state: State): SpendStateProps => {
    return {
        wallet: getWalletExtended(state)
    };
}

const mapDispatchToProps = (dispatch): SpendDispatchProps => {

    return {
    };
}

export const SpendContainer = connect(mapStateToProps, mapDispatchToProps)(SpendComponent);